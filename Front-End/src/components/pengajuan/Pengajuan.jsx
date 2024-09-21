import React from "react";
import './Pengajuan.css';
import { NavLink } from "react-router-dom";

const Pengajuan = () => {
    return (
        <>
            <div className='title'>
                <h1 className='welcome-text'>Pilih tipe pengajuan</h1>
            </div>
            <div className='bottom-section'>
                <div className='penggantian'>
                    <NavLink to="/penggantian">
                    <img 
                        src={`Pengajuan Perbaikan KTM (1).png`} 
                        alt="Penggantian" 
                        className='penggantian-img' 
                    />
                    </NavLink>
                </div>
                <div className='perbaikan'>
                    <NavLink to="/perbaikan">
                    <img 
                        src={'Pengajuan Perbaikan KTM (2).png'} 
                        alt="Perbaikan" 
                        className='perbaikan-img' 
                    />
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Pengajuan;
