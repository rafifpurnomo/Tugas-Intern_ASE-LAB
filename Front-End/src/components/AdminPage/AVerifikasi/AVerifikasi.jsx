import React, { useState } from 'react';
import './AVerifikasi.css'; // Your custom CSS file

const AVerifikasi = ({ onCancel }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className='title-info'>
        <h1>Verifikasi Pengajuan KTM</h1>
      </div>
      <div className='wrapper-verifikasi'>
        <div className='verifikasi'>
          <div className='top-verif'>
            <p className='text'>
              KSM - Nama pemilik request
            </p>
          </div>
          <div className='bottom-verif'>
            <div className='bottom-left-verif'>
              {/* Content PDF*/}
            </div>
            <div className='bottom-right-verif'>
              <h3>Status</h3>
              <div>
                <label htmlFor="text-input"></label>
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
                <button className="button setuju-button">Disetujui</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='wrapper-verifikasi'>
        <div className='verifikasi'>
          <div className='top-verif'>
            <p className='text'>
              KSM - Nama pemilik request
            </p>
          </div>
          <div className='bottom-verif'>
            <div className='bottom-left-verif'>
              {/* Content PDF*/}
            </div>
            <div className='bottom-right-verif'>
              <h3>Status</h3>
              <div>
                <label htmlFor="text-input"></label>
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
                <button className="button setuju-button">Disetujui</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='wrapper-verifikasi'>
        <div className='verifikasi'>
          <div className='top-verif'>
            <p className='text'>
              KSM - Nama pemilik request
            </p>
          </div>
          <div className='bottom-verif'>
            <div className='bottom-left-verif'>
              {/* Content PDF*/}
            </div>
            <div className='bottom-right-verif'>
              <h3>Status</h3>
              <div>
                <label htmlFor="text-input"></label>
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
                <button className="button setuju-button">Disetujui</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bot-submit'>
        <h2>Dengan menekan submit request akan diupdate</h2>
        <button className='button submit'>Submit</button>
      </div>
    </>
  );
};

export default AVerifikasi;
