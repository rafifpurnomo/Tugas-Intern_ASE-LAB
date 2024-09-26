import React, { useState, useEffect } from 'react';
import './AVerifikasi.css'; // Your custom CSS file
import { useParams, useNavigate } from 'react-router-dom';

const AVerifikasi = () => {
  const { id_pengajuan_ktm } = useParams(); 
  const [submissionData, setSubmissionData] = useState(null); =
  const [text, setText] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/pengajuanKTM/UpdatePengajuanByIDKTM/${id_pengajuan_ktm}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setSubmissionData(data.data[0][0]); // Assuming the first array contains the submission details
        } else {
          throw new Error('Invalid data format.');
        }
      } catch (error) {
        console.error('Error fetching submission data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id_pengajuan_ktm) {
      fetchSubmissionData();
    }
  }, [id_pengajuan_ktm]);

  const handleChange = (e) => {
    setText(e.target.value); // Update text state
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/pengajuanKTM/UpdatePengajuanKTM/${id_pengajuan_ktm}`, {
        method: 'PUT', // Use PATCH to update specific fields
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: text, status: "diterima" }),
      });
  
      const result = await response.json(); // Parse the response
      console.log('Response from backend (approved):', result);
  
      // Check if the response indicates success
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update submission status.');
      }
  
      // Navigate back to the APengajuan page after updating
      navigate('/APengajuan');
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };
  
  
  const onCancel = async () => {
    try {
      const response = await fetch(`http://localhost:4000/pengajuanKTM/UpdatePengajuanKTM/${id_pengajuan_ktm}`, {
        method: 'PUT', // Use PATCH to update specific fields
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: text, status: "ditolak" }),
      });
  
      const result = await response.json(); // Parse the response
      console.log('Response from backend (disapproved):', result);
  
      if (!response.ok || !result.success) {
        throw new Error('Failed to disapprove submission.');
      }
  
      // Navigate back to the APengajuan page after updating
      navigate('/APengajuan');
    } catch (error) {
      console.error('Error disapproving submission:', error);
    }
  };

  return (
    <div>
      <div className='title-info'>
        <h1>Verifikasi Pengajuan KTM</h1>
      </div>
      <div className='wrapper-verifikasi'>
        <div className='verifikasi'>
          <div className='top-verif'>
            <p className='text'>
              KSM - {submissionData ? submissionData.id_akun : 'N/A'}
            </p>
          </div>
          <div className='bottom-verif'>
          <div className='bottom-left-verif'>
            {submissionData && submissionData.filepath ? (
              <div className="pdf-container">
                <iframe
                  src={submissionData.filepath}
                  title="PDF Viewer"
                />
              </div>
            ) : (
              <p>No PDF available.</p>
            )}
          </div>

            <div className='bottom-right-verif'>
              <h3>{submissionData ? submissionData.status : 'N/A'}</h3>
              <div>
                <input
                  id="text-input"
                  type="text"
                  value={text}
                  onChange={handleChange}
                  placeholder="Write your note here..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                  }}
                />
              </div>
              <h3>Persetujuan Pengajuan</h3>
              <div className='button-container'>
                <button className="button tidaksetuju-button" onClick={onCancel}>Tidak disetujui</button>
                <button className="button setuju-button" onClick={handleSubmit}>Disetujui</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AVerifikasi;
