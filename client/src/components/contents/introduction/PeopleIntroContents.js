import React from 'react'
import 'assets/css/PeopleIntroContents.css'
import { FaReact } from "react-icons/fa"
import { BsPeopleCircle, BsPersonLinesFill } from "react-icons/bs";
import { BiNetworkChart } from "react-icons/bi";

export default function PeopleIntroContents() {
    return (
        <div className="py-5">
            <div id="peoplecard-section">
                <div className="people-card">
                    <div className='person-icon'>
                        <BsPeopleCircle style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "100%",
                            padding: "20px",
                            boxShadow: "0 0 50px #F49F5B"
                        }} />
                    </div>
                    <div className='person-name'>YoungKyoon Suh</div>
                    <div className='person-info'>
                        <li>Principal Invesigator</li>
                        <li><a href="https://sites.google.com/view/yksuh" target="blank">&#10153;View Biography</a></li>
                    </div>
                </div>
                <div className="people-card">
                    <div className='person-icon'>
                        <BsPersonLinesFill style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "100%",
                            padding: "20px",
                            boxShadow: "0 0 50px #B4B4FF"
                        }} />
                    </div>
                    <div className='person-name'>Jeeyoung Kim</div>
                    <div className='person-info'>
                        <li>Collaborator</li>
                        <li>Research Professor</li>
                    </div>
                </div>
                <div className="people-card">
                    <div className='person-icon'>
                        <BiNetworkChart style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "100%",
                            padding: "20px",
                            boxShadow: "0 0 50px #FFBE0A"
                        }} />
                    </div>
                    <div className='person-name'>SeoungHyeon Kim</div>
                    <div className='person-info'>
                        <li>ML Code Developer</li>
                        <li>MS Graduate</li>
                    </div>
                </div>
                <div className="people-card">
                    <div className='person-icon'>
                        <FaReact style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "100%",
                            padding: "20px",
                            boxShadow: "0 0 50px cadetblue"
                        }} />
                    </div>
                    <div className='person-name'>Jeong Seok Oh</div>
                    <div className='person-info'>
                        <li>Web Developer</li>
                        <li>Senior</li>
                    </div>
                </div>
            </div>
        </div>
    );
}