import React from 'react'

import architectureimg from 'assets/image/SPA_Architecture.png'

export default function ArchitectureContents(props) {
    return (
        <div id="sectionid" className={(props.isfirst) ? "py-5 rowcontents" : "py-5"}>
            <h4>System Architecture</h4>
            <div className="imgsection">
                <img src={architectureimg} alt='ARCHITECTURE' width='90%' />
            </div>
        </div>
    );
}