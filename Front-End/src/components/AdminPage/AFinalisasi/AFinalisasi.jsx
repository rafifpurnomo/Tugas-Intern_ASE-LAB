import React, { useState } from 'react';
import './AFinalisasi.css';
import ANotif from './ANotif';

const AFinalisasi = () => {
  const [accMode, setAccMode] = useState(false);

  const handleDoneClick = () => {
    setAccMode(true); // Show the notification
  };

  const handleCancelClick = () => {
    setAccMode(false); 
  };

  return (
    <>
      <div className='title-info'>
          <h1>Finalisasi KTM</h1>
      </div>
      <div className={`wrapper-container-hasil ${accMode ? 'blur' : ''}`}>
        <div className='wrapper-hasil'>
          <div className='table'>
            <div className='top-hasil'>
              <div className='cell'>Nama Mahasiswa</div>
              <div className='cell'>Tanggal Pengajuan</div>
              <div className='cell'>Jenis Pengajuan</div>
              <div className='cell'>Progress</div>
            </div>
            <div className='bottom-hasil'>
              <div className='cell'>Regy Renanda Rahman</div>
              <div className='cell'>01-12-2025</div>
              <div className='cell'>Penggantian</div>
              <div className='cell'>
                <button
                  type="button"
                  className="button-cell"
                  onClick={handleDoneClick}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {accMode && <ANotif onCancel={handleCancelClick} />} {/* Pass onCancel to handle cancel button click */}
    </>
  );
}

export default AFinalisasi;
