import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import '../../../assets/css/IntroContents.css'
import ArchitectureContents from './ArchitectureContents'
import FunctionContents from './FunctionContents'
import PeopleIntroContents from './PeopleIntroContents'

export default function IntroContents() {

    const [subcontents, setSubcontents] = useState(<ArchitectureContents />);

    const onClickSubTitle = (e) => {
        e.preventDefault();
        let group = document.getElementsByClassName('introsubtitle');
        for (let k = 0; k < group.length; k++) {
            group[k].className = 'introsubtitle'
            document.getElementById(group[k].id + '-section').className = 'introsubsection col'
        }
        e.target.className = 'introsubtitle introsubtitle-click'
        document.getElementById(e.target.id + '-section').className = 'introsubsection-click col'

        switch (e.target.id) {
            case "architecture":
                setSubcontents(<ArchitectureContents />);
                break;
            case "function":
                setSubcontents(<FunctionContents />);
                break;
            case "people":
                setSubcontents(<PeopleIntroContents />);
                break;
            default:
                setSubcontents(<ArchitectureContents />);
        }
    }

    return (
        <div className="inner-box">
            <div className="introcontainer">
                <Row>
                    <Col className="introsubsection introsubsection-click" id="architecture-section">
                        <a href='' className="introsubtitle introsubtitle-click" id="architecture" onClick={onClickSubTitle}>System Architecture</a>
                    </Col>
                    <Col className="introsubsection" id="function-section">
                        <a href='' className="introsubtitle" id="function" onClick={onClickSubTitle}>Main Function</a>
                    </Col>
                    <Col className="introsubsection" id="people-section">
                        <a href='' className="introsubtitle" id="people" onClick={onClickSubTitle}>People</a>
                    </Col>
                </Row>
                {subcontents}
            </div>
        </div>
    );
}