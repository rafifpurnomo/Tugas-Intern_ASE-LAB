import React, { useEffect, useState } from 'react';
import './Hasil.css';

const Hasil = ({ user }) => {
  const [pengajuan, setPengajuan] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = user.id;

  useEffect(() => {
    const fetchPengajuan = async () => {
      try {
        const response = await fetch(`http://localhost:4000/pengajuanKTM/getAllPengajuanByIDAKUN/${userId}`);
        if (!response.ok) {
          throw new Error('Gagal memuat data pengajuan.');
        }
        
        const data = await response.json();
        console.log("Fetched data:", JSON.stringify(data, null, 2));
        
        if (data.success && Array.isArray(data.data)) {
          const flatPengajuan = data.data.flat();
          console.log("Data after flattening:", flatPengajuan);
    
          // Filtering unique entries
          const uniquePengajuan = Array.from(new Map(flatPengajuan.map(item => [item.id_pengajuan_ktm, item])).values());
          console.log("Unique data:", uniquePengajuan);
    
          setPengajuan(uniquePengajuan.filter(item => item)); // Filter out any falsy values
        } else {
          throw new Error('Data tidak valid.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchPengajuan();
  }, [userId]);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='title-info'>
        <h1>Informasi Hasil</h1>
      </div>
      <div className='wrapper-container-hasil'>
        <div className='wrapper-hasil'>
          <div className='table'>
            <div className='top-hasil'>
              <div className='cell'>Id_User</div>
              <div className='cell'>Tanggal Pengajuan</div>
              <div className='cell'>Jenis Pengajuan</div>
              <div className='cell'>Progress</div>
            </div>
            {pengajuan.length > 0 ? (
              pengajuan.map((item) => (
                <div className='bottom-hasil' key={item.id_pengajuan_ktm}>
                  <div className='cell'>{item.id_akun || 'N/A'}</div> 
                  <div className='cell'>{new Date(item.tanggal_pengajuan).toLocaleDateString() || 'N/A'}</div>
                  <div className='cell'>{item.note || 'N/A'}</div>
                  <div className='cell'>{item.status || 'N/A'}</div>
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

export default Hasil;
