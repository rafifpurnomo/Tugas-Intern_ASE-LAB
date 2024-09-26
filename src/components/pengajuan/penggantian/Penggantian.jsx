import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Penggantian.css';
import { RiInformationLine } from "react-icons/ri";

const Penggantian = ({ user, addPengajuan }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Check if the file is a PDF
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_akun', user.id);
    formData.append('note', 'Penggantian');
  
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
        setError('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className='title-info'>
        <h1 className='title-info'>
          <span className='bold-text'>Pengajuan Perbaikan KTM Baru | </span>
          <span className='italic-text'>Informasi dan Syarat pengajuan penggantian KTM</span>
        </h1>
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
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
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

export default Penggantian;
