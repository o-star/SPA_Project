import React from 'react'
import { Link } from 'react-router-dom'
import '../../../assets/css/HomeContents.css'

export default function MovingButton(props) {
    return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <Link to={props.link} className="link-text">
                <div className="our-services-wrapper mb-60">
                    <div className="services-inner">
                        <div className="our-services-text">
                            <h4>{props.title}</h4>
                            <p>{props.contents}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}