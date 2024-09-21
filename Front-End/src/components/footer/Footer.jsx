import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-content'>
            <h1 className='alamat'>Alamat</h1>
            <p className='footer-text'>
                Gedung Kuliah Umum Lantai 2,<br />
                Jl. Telekomunikasi Terusan Buah Batu,<br />
                Bandung, Jawa Barat, 40257
            </p>

            <h1 className='kontak'>kontak</h1>
                <p className='footer-text'>
                    WhatsApp: 0812-3456-7890 
                </p>
        </div>
    </footer>
  )
}

export default Footer