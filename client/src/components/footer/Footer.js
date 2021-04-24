import React from 'react'
import 'assets/css/Footer.css'
import SchoolLabLogo from 'assets/image/school-lab-logo.png'

export default function Footer() {
    return (
        <div className="copyright">
            <p>Copyright © <span>{new Date().getFullYear()}</span> <span className="transition">DEAL Lab</span> @ KNU</p>
            <img id='logo-img' src={SchoolLabLogo}></img>
        </div>
    );
}