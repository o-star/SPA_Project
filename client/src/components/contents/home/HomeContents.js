import React from 'react'
import 'assets/css/HomeContents.css'

import MovingButton from './MovingButton'

export default function HomeContents() {
    return (
        <div className="border-box">
            <div id="contents-box">
                <h2 id="title-animation" style={{ textAlign: 'center' }}> Welcome SPA Framework Page </h2>
                <div className="buttonsection" id="button-animation">
                    <MovingButton
                        link='/intro' title='INTRODUCTION'
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