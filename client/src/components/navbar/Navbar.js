import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { home, introduction, estimation, statistics } from 'redux/action/ActionCreater'
import 'assets/css/Navbar.css'

export default function Navbar() {

    const dispatch = useDispatch();

    const curpage = useSelector(state => state.curpage);

    const onClickLink = (e) => {
        switch (e.target.id) {
            case 'introduction':
                dispatch(introduction());
                break;
            case 'estimation':
                dispatch(estimation());
                break;
            case 'statistics':
                dispatch(statistics());
                break;
            default:
                dispatch(home());
        }
    }

    return (
        <nav className="navbar navbar-expand-md fixed-top top-nav">
            <span id='dot-motion'></span>
            <div className="container">
                <Link id='home' className="navbar-brand" to="/" onClick={onClickLink}><strong>SantaFe Framework</strong></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i className="fa fa-bars" aria-hidden="true"></i></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link id='home' className={(curpage === 'home') ? 'select-nav nav-link' : 'nav-link'} to="/" onClick={onClickLink}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='introduction' className={(curpage === 'introduction') ? 'select-nav nav-link' : 'nav-link'} to="/intro" onClick={onClickLink}>Introduction</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='estimation' className={(curpage === 'estimation') ? 'select-nav nav-link' : 'nav-link'} to="/estimate" onClick={onClickLink}>Time Estimation</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='statistics' className={(curpage === 'statistics') ? 'select-nav nav-link' : 'nav-link'} to="/statistics" onClick={onClickLink}>Param Statistics</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}