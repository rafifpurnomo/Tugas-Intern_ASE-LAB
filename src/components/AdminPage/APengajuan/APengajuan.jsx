import React, { useEffect, useState } from 'react';
import './APengajuan.css';
import { NavLink } from 'react-router-dom';

const APengajuan = () => {
  const [pengajuan, setPengajuan] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPengajuan = async () => {
      try {
        const response = await fetch(`http://localhost:4000/pengajuanKTM/getAllPengajuanKTM`);
    
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error('Gagal memuat data pengajuan.');
        }
        
        const data = await response.json();
        console.log("Fetched data:", JSON.stringify(data, null, 2)); // Log the entire response
    
        // Check if data has a 'success' property and if 'data' is an array
        if (data && Array.isArray(data.data)) {
          setPengajuan(data.data.filter(item => item.status === 'diproses'));
        } else {
          console.error('Invalid data structure:', data);
          throw new Error('Data tidak valid.');
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    
    fetchPengajuan();
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='title-info'>
        <h1>Informasi Pengajuan KTM</h1>
      </div>
      <div className='wrapper-container-hasil'>
        <div className='wrapper-hasil'>
          <div className='table'>
            <div className='top-hasil'>
              <div className='cell'>ID KTM</div>
              <div className='cell'>Tanggal Pengajuan</div>
              <div className='cell'>Jenis Pengajuan</div>
              <div className='cell'>Progress</div>
            </div>
            {pengajuan.length > 0 ? (
  pengajuan.map((item) => (
    <div className='bottom-hasil' key={item.id_pengajuan_ktm}>
      <div className='cell'>{item.id_pengajuan_ktm || 'N/A'}</div>
      <div className='cell'>
        {new Date(item.tanggal_pengajuan).toLocaleDateString() || 'N/A'}
      </div>
      <div className='cell'>{item.note || 'N/A'}</div>
      <div className='cell'>
        <NavLink to={`/AVerifikasi/${item.id_pengajuan_ktm}`}>
          <button className="button-cell">Verifikasi</button>
        </NavLink>
      </div>
    </div>
  ))
) : (
  <div className='bottom-hasil'>
    <div className='cell' colSpan={4}>Tidak ada data pengajuan.</div>
  </div>
)}
          </div>
        </div>
      </div>
    </>
  );
}

export default APengajuan;
