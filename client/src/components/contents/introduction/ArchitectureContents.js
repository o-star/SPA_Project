import React from 'react'

import '../../../assets/css/ArchitectureContents.css'
import architectureimg from '../../../assets/image/spa_architecture_update.png'

export default function ArchitectureContents() {
    return (
        <div className="py-5">
            <h4>System Architecture</h4>
            <div className="imgsection">
                <img src={architectureimg} width='80%' />
            </div>
        </div>
    );
}