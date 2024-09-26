import React, { useState, useEffect } from "react";
import './AHome.css';
import SimpleImageSlider from "react-simple-image-slider";
import { NavLink } from "react-router-dom";


const images = [
  { url: "slider0.png" },
  { url: "Slider1.png" },
  { url: "slider2.png" },
];

const AHome = () => {
    const [dimensions, setDimensions] = useState({ width: 896, height: 504 });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth * 0.8;
            const height = (width * 504) / 896; 
            setDimensions({ width: Math.round(width), height: Math.round(height) });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className="slider-container">
                <SimpleImageSlider
                    width={dimensions.width}
                    height={dimensions.height}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    navStyle={2}
                    bgColor="white"
                    autoPlay={true}
                    slideDuration={2}

                />
            </div>
            <div className='top-section'>
                <div className='pengajuan'>
                <NavLink to="/Apengajuan">
                    <img 
                        src={`Request.png`} 
                        alt="request" 
                        className='penggantian-img' 
                    />
                    </NavLink>
                </div>
                <div className='informasi'>
                <NavLink to="/AFinalisasi">
                    <img 
                        src={'Finalisasi.png'} 
                        alt="finalisasi" 
                        className='perbaikan-img' 
                    />
                    </NavLink>
                </div>
            </div>
            <div className='title'>
                <h1 className='about'>About</h1>
                <p className='desc-text'>
                Website ini menyediakan pelayanan untuk segala kendala terhadap KTM, mulai dari perbaikan, 
                penggantian, dan kendala lainnya.  Proses yang telah disebutkan yang sebelumnya hanya bisa 
                dilakukan dengan secara langsung mendatangi staff sekarang sudah bisa dilakukan secara online 
                melalui website ini. Diharapkan website ini dapat membantu mahasiswa sekalian untuk menggunakan 
                waktu yang dimiliki secara baik.
                    </p>
            </div>
        </>
    );
}

export default AHome;
