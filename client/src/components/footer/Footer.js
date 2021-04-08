import React from 'react'
import 'assets/css/Footer.css'

export default function Footer() {
    return (
        <div className="copyright">
            <p>Copyright © <span>{new Date().getFullYear()}</span> <span className="transition">DEAL Lab</span> @ KNU</p>
        </div>
    );
}