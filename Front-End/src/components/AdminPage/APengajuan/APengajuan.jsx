import React from 'react'
import './APengajuan.css'
import { NavLink } from "react-router-dom";


const APengajuan = () => {
  return (
    <>
      <div className='title-info'>
        <h1>Verifikasi Pengajuan KTM</h1>
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
              <div className='cell'>
              <NavLink to="/AVerifikasi">
                <button type="submit" className="button-cell">Process</button>
              </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default APengajuan;
