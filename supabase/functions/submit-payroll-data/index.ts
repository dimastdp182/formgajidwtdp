/*
  # Submit Payroll Data to Google Sheets

  1. Fungsi Edge
    - Menerima data formulir dari frontend
    - Melakukan otentikasi dengan Google Sheets API
    - Menulis data ke Google Sheet yang ditentukan

  2. Keamanan
    - Menggunakan CORS headers untuk akses frontend
    - Validasi data yang masuk
    - Error handling yang komprehensif
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface PayrollData {
  opsId: string;
  nama: string;
  nik: string;
  noHp: string;
  alamatKtp: string;
  alamatDomisili: string;
  rtRw: string;
  noRumah: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  kodePos: string;
  tempatLahir: string;
  tanggalLahir: string;
  umur: string;
  jenisKelamin: string;
  npwp: string;
  namaAyah: string;
  namaIbu: string;
  noWaKontakDarurat: string;
  namaKontakDarurat: string;
  hubunganKontakDarurat: string;
  noRekening: string;
  namaPenerima: string;
  jenisBank: string;
  posisi: string;
  contractType: string;
  departement: string;
  lokasi: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request body
    const payrollData: PayrollData = await req.json()
    
    // Validate required fields
    const requiredFields = [
      'opsId', 'nama', 'nik', 'noHp', 'alamatKtp', 'alamatDomisili',
      'kelurahan', 'kecamatan', 'kota', 'tempatLahir', 'tanggalLahir',
      'jenisKelamin', 'namaAyah', 'namaIbu', 'noWaKontakDarurat',
      'namaKontakDarurat', 'hubunganKontakDarurat', 'noRekening',
      'namaPenerima', 'jenisBank', 'posisi', 'contractType', 'departement', 'lokasi'
    ];

    for (const field of requiredFields) {
      if (!payrollData[field as keyof PayrollData]) {
        return new Response(
          JSON.stringify({ error: `Field ${field} is required` }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    // Get Google Service Account credentials from environment
    const serviceAccountKey = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY')
    if (!serviceAccountKey) {
      return new Response(
        JSON.stringify({ error: 'Google Service Account key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse the service account key
    const credentials = JSON.parse(serviceAccountKey)
    
    // Create JWT for Google API authentication
    const now = Math.floor(Date.now() / 1000)
    const payload = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }

    // Create JWT header and payload
    const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
    const payloadEncoded = btoa(JSON.stringify(payload))
    
    // Import private key for signing
    const privateKey = await crypto.subtle.importKey(
      'pkcs8',
      new TextEncoder().encode(credentials.private_key),
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    )

    // Sign the JWT
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      privateKey,
      new TextEncoder().encode(`${header}.${payloadEncoded}`)
    )

    const jwt = `${header}.${payloadEncoded}.${btoa(String.fromCharCode(...new Uint8Array(signature)))}`

    // Get access token from Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token from Google')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Prepare data for Google Sheets
    const currentDate = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    const rowData = [
      currentDate, // Timestamp
      payrollData.opsId,
      payrollData.nama,
      payrollData.nik,
      payrollData.noHp,
      payrollData.alamatKtp,
      payrollData.alamatDomisili,
      payrollData.rtRw,
      payrollData.noRumah,
      payrollData.kelurahan,
      payrollData.kecamatan,
      payrollData.kota,
      payrollData.kodePos,
      payrollData.tempatLahir,
      payrollData.tanggalLahir,
      payrollData.umur,
      payrollData.jenisKelamin,
      payrollData.npwp,
      payrollData.namaAyah,
      payrollData.namaIbu,
      payrollData.noWaKontakDarurat,
      payrollData.namaKontakDarurat,
      payrollData.hubunganKontakDarurat,
      payrollData.noRekening,
      payrollData.namaPenerima,
      payrollData.jenisBank,
      payrollData.posisi,
      payrollData.contractType,
      payrollData.departement,
      payrollData.lokasi
    ]

    // Google Sheets API endpoint
    const spreadsheetId = '1BNhyJfE2ejqAAXes1gz6HaBd2KijtG86xkGA1AbxXDY'
    const range = 'Sheet1!A:AD' // Adjust range as needed
    
    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowData],
        }),
      }
    )

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text()
      console.error('Google Sheets API error:', errorText)
      throw new Error(`Failed to write to Google Sheets: ${sheetsResponse.status}`)
    }

    const sheetsData = await sheetsResponse.json()
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Data berhasil disimpan ke Google Sheets',
        updatedRange: sheetsData.updates?.updatedRange 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in submit-payroll-data function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Terjadi kesalahan saat menyimpan data',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})