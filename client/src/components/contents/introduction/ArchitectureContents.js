import React from 'react'


import '../../../assets/css/ArchitectureContents.css'
import architectureimg from '../../../assets/image/spa_architecture_update.png'

export default function ArchitectureContents(props) {
    return (
        <div id="sectionid" className={(props.isfirst) ? "py-5 rowcontents" : "py-5"}>
            <h4>System Architecture</h4>
            <div className="imgsection">
                <img src={architectureimg} alt='ARCHITECTURE' width='80%' />
            </div>
        </div>
    );
}