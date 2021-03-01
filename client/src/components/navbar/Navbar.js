import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { home, introduction, estimation, statistics } from '../../redux/action/ActionCreater'
import '../../assets/css/Navbar.css'

export default function Navbar() {

    const dispatch = useDispatch();

    const curpage = useSelector(state => state.curpage);
    let ary = window.location.href.split('/')
    switch (ary[ary.length - 1]) {
        case 'intro':
            dispatch(introduction());
            break;
        case 'estimate':
            dispatch(estimation());
            break;
        case 'statistics':
            dispatch(statistics());
            break;
        default:
            dispatch(home());
            break;
    }

    return (
        <nav className="navbar navbar-expand-md fixed-top top-nav">
            <div className="container">
                <a id="home" className="navbar-brand" href="/"><strong>SPA Framework</strong></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i class="fa fa-bars" aria-hidden="true"></i></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a id="home" className={(curpage === 'home') ? 'select-nav nav-link' : 'nav-link'} href="/">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a id="introduction" className={(curpage === 'introduction') ? 'select-nav nav-link' : 'nav-link'} href="/intro">Introduction</a>
                        </li>
                        <li className="nav-item">
                            <a id="estimation" className={(curpage === 'estimation') ? 'select-nav nav-link' : 'nav-link'} href="/estimate">Time Estimation</a>
                        </li>
                        <li className="nav-item">
                            <a id="statistics" className={(curpage === 'statistics') ? 'select-nav nav-link' : 'nav-link'} href="/statistics">Param Statistics</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}