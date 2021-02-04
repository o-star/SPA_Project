import React from 'react'
import '../../../assets/css/HomeContents.css'

import MovingButton from './MovingButton'

export default function HomeContents() {
    return (
        <div className="inner-box">
            <div>
                <div>
                    <h2 style={{ textAlign: 'center' }}> Welcome SPA Framework Page </h2>
                </div>
                <div className="row">
                    <MovingButton
                        link='/intro' title='INTRODUCE'
                        contents='You can read this project description'
                    />
                    <MovingButton
                        link='/estimate' title='TIME ESTIMATION'
                        contents='You can estimate the simulation time through this framework.'
                    />
                    <MovingButton
                        link='/statistics' title='PARAM STATISTICS'
                        contents='You can check the most used parameter set for each category'
                    />
                </div>
            </div>
        </div>
    );
}