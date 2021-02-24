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
                <div>
                    <div className="maintitle">
                        SPA: Design and Implementation of Simulation-Provenance Data Service Analytics Framework
                    </div>
                    <div className="summarycontents">
                        최근에 하드웨어의 성능의 상향, 데이터 수집 기술의 발달, 공공데이터의 개방 등의 요인으로 계산과학 분야에서 대량의 데이터가 축적되었으며, 이를 바탕으로 다양한 데이터 분석 활동을 진행한다. 하지만 대부분 분석 활동의 결과물들이 띄는 형태는 실제 사용자들이 이용하기에는 불편함을 초래한다. SPA (Simulation Provenance data service Analytics framework) 시스템은 이러한 불편함을 해소하기 위해 사용자에게 시뮬레이션 작업을 보조하는 환경을 제공하려 한다. SPA 시스템은 REST API 를 이용하여 유연한 결합성과 다양한 시뮬레이션 보조 기능의 제공을 통하여 사용자에게 편의성과 다양성을 제공할 수 있는 프레임워크를 제공한다.
                    </div>
                </div>
                <Row>
                    <Col className="introsubsection introsubsection-click" id="architecture-section">
                        <a href='#' className="introsubtitle introsubtitle-click" id="architecture" onClick={onClickSubTitle}>System Architecture</a>
                    </Col>
                    <Col className="introsubsection" id="function-section">
                        <a href='#' className="introsubtitle" id="function" onClick={onClickSubTitle}>Main Function</a>
                    </Col>
                    <Col className="introsubsection" id="people-section">
                        <a href='#' className="introsubtitle" id="people" onClick={onClickSubTitle}>People</a>
                    </Col>
                </Row>
                {subcontents}
            </div>
        </div>
    );
}