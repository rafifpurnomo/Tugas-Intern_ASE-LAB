import React, { useState, useEffect } from 'react'; 
import './AFinalisasi.css';
import ANotif from './ANotif';

const AFinalisasi = () => {
  const [finalisasi, setFinalisasi] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [selectedSubmission, setSelectedSubmission] = useState(null); 
  const [accMode, setAccMode] = useState(false); 

  useEffect(() => {
    const fetchFinalisasi = async () => {
      try {
        const response = await fetch(`http://localhost:4000/pengajuanKTM/getAllPengajuanKTM`);

        if (!response.ok) {
          throw new Error('Gagal memuat data finalisasi.');
        }

        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setFinalisasi(data.data.filter(item => item.status === 'diterima' || item.status === 'ditolak'));
        } else {
          throw new Error('Data tidak valid.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinalisasi();
  }, []);

  const handleDoneClick = (submission) => {
    setSelectedSubmission(submission); 
    setAccMode(true); 
  };

  const handleCancelClick = () => {
    setAccMode(false); 
  };

  const handleConfirmDone = async () => {
    if (!selectedSubmission) return;

    try {
      const response = await fetch(`http://localhost:4000/pengajuanKTM/UpdatePengajuanKTM/${selectedSubmission.id_pengajuan_ktm}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: "siap diambil" }),
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update submission status.');
      }

      setFinalisasi((prevFinalisasi) => 
        prevFinalisasi.map((item) => 
          item.id_pengajuan_ktm === selectedSubmission.id_pengajuan_ktm 
            ? { ...item, status: 'siap diambil' } 
            : item
        )
      );
      
      setAccMode(false);
      setSelectedSubmission(null);

    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='title-info'>
        <h1>Finalisasi KTM</h1>
      </div>
      <div className={`wrapper-container-hasil ${accMode ? 'blur' : ''}`}>
        <div className='wrapper-hasil'>
          <div className='table'>
            <div className='top-hasil'>
              <div className='cell'>ID KTM</div>
              <div className='cell'>Tanggal Pengajuan</div>
              <div className='cell'>Jenis Pengajuan</div>
              <div className='cell'>Progress</div>
            </div>
            {finalisasi.map((submission) => (
              <div className='bottom-hasil' key={submission.id_pengajuan_ktm}>
                <div className='cell'>{submission.id_pengajuan_ktm}</div>
                <div className='cell'>{new Date(submission.tanggal_pengajuan).toLocaleDateString()}</div>
                <div className='cell'>{submission.note}</div>
                <div className='cell'>
                  <button
                    type="button"
                    className="button-cell"
                    onClick={() => handleDoneClick(submission)}
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {accMode && <ANotif onCancel={handleCancelClick} onConfirm={handleConfirmDone} />} {/* Pass onConfirm to handle confirmation */}
    </>
  );
}

export default AFinalisasi;
