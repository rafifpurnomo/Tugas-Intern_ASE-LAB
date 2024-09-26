import React, { useState } from 'react';
import './Perbaikan.css';
import { RiInformationLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Perbaikan = ({user, addPengajuan}) => {

  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_akun', user.id);
    formData.append('note', 'Perbaikan');
    formData.append('status', 'Proses');

    try {
      const response = await fetch('http://localhost:4000/pengajuanKTM/AddPengajuanKTM', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        addPengajuan(data.newPengajuan); // Assuming the API returns the new pengajuan data
        navigate('/hasil'); // Redirect to the Hasil page
      } else {
        console.error('Upload failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>

      <div className='title-info'>
        <h1 className='title-info'>
          <span className='bold-text'>Pengajuan Perbaikan KTM | </span> 
          <span className='italic-text'>Form pengajuan perbaikan</span>
        </h1>
      </div>

      <div className='wrapper-perbaikan'>
        <div className='perbaikan'>
          <div className='top'>
            <p className='text'>
              <RiInformationLine className='icon' /> Information
            </p>
          </div>
          <div className='bottom'>
            <h1 className='list-info'>Ketentuan dapat mengajukan permasalahan KTM</h1>
            <ul className="custom-list">
              <li>Terdaftar sebagai mahasiswa yang masih menempuh pendidikan di Telkom University.</li>
              <li>KTM yang ingin diperbaiki masih ada secara fisik.</li>
            </ul>
            <h1 className='list-info'>Persyaratan lampiran</h1>
            <ul className="custom-list">
              <li>KSM (Kartu Studi Mahasiswa)</li>
              <li>Foto dari KTM</li>
              <li>Bukti Pembayaran</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='wrapper-perbaikan'>
        <div className='perbaikan'>
          <div className='top'>
            <p className='text'>Filling Form</p>
          </div>
          <div className='bottom'>
            <ul className='lis'>
              <li><b>Nama Mahasiswa</b>: {user.nama}</li>
              <li><b>NIM</b>: {user.nim}</li>
              <li><span className='normal-text'>Tahun Ajar</span>: {user.angkatan}</li>
              <li><span className='normal-text'>Program Studi</span>: {user.jurusan}</li>
            </ul>
            <div className="form-container">
              <form className="form" onSubmit={handleSubmit}>
                <span className="form-title">Upload KSM, KTM, dan Bukti Pembayaran</span>
                <p className="form-paragraph">File Must Be PDF</p>
                <label htmlFor="file-input" className="drop-container">
                  <span className="drop-title">Drop files here</span>
                  or
                  <input
                    type="file"
                    required
                    id="file-input"
                    className="file-input"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <div className='submit-container'>
                  <button className="btn" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Perbaikan;

