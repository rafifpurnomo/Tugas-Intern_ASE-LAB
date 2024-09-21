import React from 'react'
import './Hasil.css'

const Hasil = () => {
  return (
    <>
    <div className='title-info'>
        <h1>Informasi Hasil</h1>
    </div>
    <div className='wrapper-container-hasil'>
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
              <div className='cell'>Menunggu permintaan diterima</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hasil;