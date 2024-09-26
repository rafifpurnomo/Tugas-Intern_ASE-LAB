import React from 'react';
import './ANotif.css';

const ANotif = ({ onCancel, onConfirm }) => {
  return (
    <div className='wrapper-final'>
      <div className='perbaikan'>
        <div className='top-final'>
          <p className='text'>VERIFIKASI SUBMITION</p>
        </div>
        <div className='bottom'>
          <h3>
            Dengan menekan Tombol Done, Request akan dilaporkan kepada pemilik,
            untuk diambil KTM-nya dan atau memberitahu bahwa KTM sudah dapat digunakan
          </h3>
          <div className="button-group">
            <button className="button cancel-button" onClick={onCancel}>Cancel</button>
            <button className="button done-button" onClick={onConfirm}>Done</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ANotif;
