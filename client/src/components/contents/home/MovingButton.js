import React from 'react'
import { Link } from 'react-router-dom'
import 'assets/css/HomeContents.css'
import { useDispatch } from 'react-redux'
import { home, introduction, estimation, statistics } from 'redux/action/ActionCreater'


export default function MovingButton(props) {

    const dispatch = useDispatch();
    const onLinkClick = () => {
        switch (props.link) {
            case '/intro':
                dispatch(introduction());
                break;
            case '/estimate':
                dispatch(estimation());
                break;
            case '/statistics':
                dispatch(statistics());
                break;
            default:
                dispatch(home());
        }
    }

    return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <Link to={props.link} className="link-text" onClick={onLinkClick}>
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