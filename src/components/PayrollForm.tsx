import React, { useState } from 'react';
import { User, Phone, MapPin, Calendar, CreditCard, Upload, Building2, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface FormData {
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
  fotoKtp: File | null;
  fotoKk: File | null;
  bukuTabungan: File | null;
  foto: File | null;
  posisi: string;
  contractType: string;
  departement: string;
  lokasi: string;
}

const PayrollForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    opsId: '',
    nama: '',
    nik: '',
    noHp: '',
    alamatKtp: '',
    alamatDomisili: '',
    rtRw: '',
    noRumah: '',
    kelurahan: '',
    kecamatan: '',
    kota: '',
    kodePos: '',
    tempatLahir: '',
    tanggalLahir: '',
    umur: '',
    jenisKelamin: '',
    npwp: '',
    namaAyah: '',
    namaIbu: '',
    noWaKontakDarurat: '',
    namaKontakDarurat: '',
    hubunganKontakDarurat: '',
    noRekening: '',
    namaPenerima: '',
    jenisBank: '',
    fotoKtp: null,
    fotoKk: null,
    bukuTabungan: null,
    foto: null,
    posisi: '',
    contractType: '',
    departement: '',
    lokasi: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Auto calculate age when birth date changes
    if (name === 'tanggalLahir' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setFormData(prev => ({ ...prev, umur: (age - 1).toString() }));
      } else {
        setFormData(prev => ({ ...prev, umur: age.toString() }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Check for duplicate NIK
    if (submittedData.includes(formData.nik)) {
      newErrors.nik = 'NIK sudah terdaftar sebelumnya';
    }

    // Required field validation
    const requiredFields = [
      'opsId', 'nama', 'nik', 'noHp', 'alamatKtp', 'alamatDomisili',
      'kelurahan', 'kecamatan', 'kota', 'tempatLahir', 'tanggalLahir',
      'jenisKelamin', 'namaAyah', 'namaIbu', 'noWaKontakDarurat',
      'namaKontakDarurat', 'hubunganKontakDarurat', 'noRekening',
      'namaPenerima', 'jenisBank', 'posisi', 'contractType', 'departement'
      , 'lokasi'
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = 'Field ini wajib diisi';
      }
    });

    // File validation
    if (!formData.fotoKtp) newErrors.fotoKtp = 'Foto KTP wajib diupload';
    if (!formData.fotoKk) newErrors.fotoKk = 'Foto KK wajib diupload';
    if (!formData.foto) newErrors.foto = 'Foto diri wajib diupload';

    // NIK validation (16 digits)
    if (formData.nik && !/^\d{16}$/.test(formData.nik)) {
      newErrors.nik = 'NIK harus 16 digit angka';
    }

    // Phone number validation
    if (formData.noHp && !/^(\+62|62|0)[0-9]{9,13}$/.test(formData.noHp)) {
      newErrors.noHp = 'Format nomor HP tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add NIK to submitted data to prevent duplicates
      setSubmittedData(prev => [...prev, formData.nik]);
      setIsSubmitted(true);
      
      // Here you would typically send data to your backend
      console.log('Form submitted:', formData);
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          opsId: '',
          nama: '',
          nik: '',
          noHp: '',
          alamatKtp: '',
          alamatDomisili: '',
          rtRw: '',
          noRumah: '',
          kelurahan: '',
          kecamatan: '',
          kota: '',
          kodePos: '',
          tempatLahir: '',
          tanggalLahir: '',
          umur: '',
          jenisKelamin: '',
          npwp: '',
          namaAyah: '',
          namaIbu: '',
          noWaKontakDarurat: '',
          namaKontakDarurat: '',
          hubunganKontakDarurat: '',
          noRekening: '',
          namaPenerima: '',
          jenisBank: '',
          fotoKtp: null,
          fotoKk: null,
          bukuTabungan: null,
          foto: null,
          posisi: '',
          contractType: '',
          departement: '',
          lokasi: ''
        });
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Berhasil Dikirim!</h2>
          <p className="text-gray-600">Data penggajian Anda telah berhasil dikirim dan akan diproses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl mb-8 p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/download.jpeg" alt="Logo TDP" className="w-12 h-12 mr-3 object-contain" />
            <h1 className="text-3xl font-bold text-gray-800">LINK PENGGAJIAN DW TDP</h1>
          </div>
          <p className="text-gray-600">Form Pendaftaran Daily Worker - Sistem Penggajian</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Informasi Personal</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OPS ID *</label>
                <input
                  type="text"
                  name="opsId"
                  value={formData.opsId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.opsId ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Masukkan OPS ID"
                />
                {errors.opsId && <p className="text-red-500 text-sm mt-1">{errors.opsId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.nama ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NIK *</label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  maxLength={16}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.nik ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="16 digit NIK"
                />
                {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir *</label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.tempatLahir ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Tempat lahir"
                />
                {errors.tempatLahir && <p className="text-red-500 text-sm mt-1">{errors.tempatLahir}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir *</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.tanggalLahir ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.tanggalLahir && <p className="text-red-500 text-sm mt-1">{errors.tanggalLahir}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Umur</label>
                <input
                  type="text"
                  name="umur"
                  value={formData.umur}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Otomatis terisi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin *</label>
                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.jenisKelamin ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jenisKelamin && <p className="text-red-500 text-sm mt-1">{errors.jenisKelamin}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NPWP</label>
                <input
                  type="text"
                  name="npwp"
                  value={formData.npwp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Nomor NPWP (opsional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Ayah *</label>
                <input
                  type="text"
                  name="namaAyah"
                  value={formData.namaAyah}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.namaAyah ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Nama ayah"
                />
                {errors.namaAyah && <p className="text-red-500 text-sm mt-1">{errors.namaAyah}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Ibu *</label>
                <input
                  type="text"
                  name="namaIbu"
                  value={formData.namaIbu}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.namaIbu ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Nama ibu"
                />
                {errors.namaIbu && <p className="text-red-500 text-sm mt-1">{errors.namaIbu}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Phone className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Informasi Kontak</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No HP/WhatsApp Aktif *</label>
                <input
                  type="tel"
                  name="noHp"
                  value={formData.noHp}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.noHp ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="08xxxxxxxxxx"
                />
                {errors.noHp && <p className="text-red-500 text-sm mt-1">{errors.noHp}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No WhatsApp Kontak Darurat *</label>
                <input
                  type="tel"
                  name="noWaKontakDarurat"
                  value={formData.noWaKontakDarurat}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.noWaKontakDarurat ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="08xxxxxxxxxx"
                />
                {errors.noWaKontakDarurat && <p className="text-red-500 text-sm mt-1">{errors.noWaKontakDarurat}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kontak Darurat *</label>
                <input
                  type="text"
                  name="namaKontakDarurat"
                  value={formData.namaKontakDarurat}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.namaKontakDarurat ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Nama kontak darurat"
                />
                {errors.namaKontakDarurat && <p className="text-red-500 text-sm mt-1">{errors.namaKontakDarurat}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hubungan Dengan Kontak Darurat *</label>
                <select
                  name="hubunganKontakDarurat"
                  value={formData.hubunganKontakDarurat}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.hubunganKontakDarurat ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih hubungan</option>
                  <option value="Orang Tua">Orang Tua</option>
                  <option value="Saudara">Saudara</option>
                  <option value="Suami/Istri">Suami/Istri</option>
                  <option value="Anak">Anak</option>
                  <option value="Teman">Teman</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.hubunganKontakDarurat && <p className="text-red-500 text-sm mt-1">{errors.hubunganKontakDarurat}</p>}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Informasi Alamat</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat KTP Lengkap *</label>
                <textarea
                  name="alamatKtp"
                  value={formData.alamatKtp}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.alamatKtp ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Alamat sesuai KTP"
                />
                {errors.alamatKtp && <p className="text-red-500 text-sm mt-1">{errors.alamatKtp}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Domisili (Tempat tinggal sekarang) *</label>
                <textarea
                  name="alamatDomisili"
                  value={formData.alamatDomisili}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.alamatDomisili ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Alamat tempat tinggal saat ini"
                />
                {errors.alamatDomisili && <p className="text-red-500 text-sm mt-1">{errors.alamatDomisili}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">RT/RW</label>
                  <input
                    type="text"
                    name="rtRw"
                    value={formData.rtRw}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="001/002"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">No Rumah</label>
                  <input
                    type="text"
                    name="noRumah"
                    value={formData.noRumah}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Nomor rumah"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kelurahan *</label>
                  <input
                    type="text"
                    name="kelurahan"
                    value={formData.kelurahan}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.kelurahan ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Kelurahan"
                  />
                  {errors.kelurahan && <p className="text-red-500 text-sm mt-1">{errors.kelurahan}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan *</label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.kecamatan ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Kecamatan"
                  />
                  {errors.kecamatan && <p className="text-red-500 text-sm mt-1">{errors.kecamatan}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kota *</label>
                  <input
                    type="text"
                    name="kota"
                    value={formData.kota}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.kota ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Kota"
                  />
                  {errors.kota && <p className="text-red-500 text-sm mt-1">{errors.kota}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                  <input
                    type="text"
                    name="kodePos"
                    value={formData.kodePos}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Informasi Rekening</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No Rekening *</label>
                <input
                  type="text"
                  name="noRekening"
                  value={formData.noRekening}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.noRekening ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Nomor rekening"
                />
                {errors.noRekening && <p className="text-red-500 text-sm mt-1">{errors.noRekening}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Penerima *</label>
                <input
                  type="text"
                  name="namaPenerima"
                  value={formData.namaPenerima}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.namaPenerima ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Nama pemilik rekening"
                />
                {errors.namaPenerima && <p className="text-red-500 text-sm mt-1">{errors.namaPenerima}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Bank *</label>
                <select
                  name="jenisBank"
                  value={formData.jenisBank}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.jenisBank ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih bank</option>
                  <option value="BCA">BCA</option>
                  <option value="BRI">BRI</option>
                  <option value="BNI">BNI</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="CIMB Niaga">CIMB Niaga</option>
                  <option value="Danamon">Danamon</option>
                  <option value="Permata">Permata</option>
                  <option value="BTN">BTN</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                {errors.jenisBank && <p className="text-red-500 text-sm mt-1">{errors.jenisBank}</p>}
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Informasi Pekerjaan</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posisi *</label>
                <select
                  name="posisi"
                  value={formData.posisi}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.posisi ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih posisi</option>
                  <option value="Daily Worker">Daily Worker</option>
                </select>
                {errors.posisi && <p className="text-red-500 text-sm mt-1">{errors.posisi}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contract Type *</label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.contractType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih tipe kontrak</option>
                  <option value="Daily - Worker TDP">Daily - Worker TDP</option>
                </select>
                {errors.contractType && <p className="text-red-500 text-sm mt-1">{errors.contractType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departement *</label>
                <select
                  name="departement"
                  value={formData.departement}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.departement ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih departemen</option>
                  <option value="SOC Operator">SOC Operator</option>
                </select>
                {errors.departement && <p className="text-red-500 text-sm mt-1">{errors.departement}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi *</label>
                <select
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.lokasi ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih lokasi</option>
                  <option value="CAKUNG 2">CAKUNG 2</option>
                </select>
                {errors.lokasi && <p className="text-red-500 text-sm mt-1">{errors.lokasi}</p>}
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Upload className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Upload Dokumen</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto KTP *</label>
                <input
                  type="file"
                  name="fotoKtp"
                  onChange={handleFileChange}
                  accept="image/*"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.fotoKtp ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fotoKtp && <p className="text-red-500 text-sm mt-1">{errors.fotoKtp}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto KK *</label>
                <input
                  type="file"
                  name="fotoKk"
                  onChange={handleFileChange}
                  accept="image/*"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.fotoKk ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fotoKk && <p className="text-red-500 text-sm mt-1">{errors.fotoKk}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Buku Tabungan / SS M-Banking</label>
                <input
                  type="file"
                  name="bukuTabungan"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <p className="text-sm text-gray-500 mt-1">Jika tidak ada buku tabungan, upload screenshot mobile banking</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto Diri *</label>
                <input
                  type="file"
                  name="foto"
                  onChange={handleFileChange}
                  accept="image/*"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.foto ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.foto && <p className="text-red-500 text-sm mt-1">{errors.foto}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-4 px-12 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Kirim Data Penggajian
              </button>
            </div>
            
            {Object.keys(errors).length > 0 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-red-700 font-medium">Mohon lengkapi semua field yang wajib diisi</p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayrollForm;