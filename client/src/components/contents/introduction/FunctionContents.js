import React from 'react'
import { Row, Col } from 'react-bootstrap'
import 'assets/css/FunctionContents.css'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImLab } from 'react-icons/im'

export default function FunctionContents() {
    return (
        <div className="py-5">
            <Row>
                <Col>
                    <div className="single-service">
                        <i className="fa"><ImLab /></i>
                        <h4> Simulation Time Estimation Service </h4>
                        <p> EDISON 플랫폼으로부터 수집한 데이터를 기반으로 사용자에게 시뮬레이션 추정 시간을 제공하는 서비스이다.
                        사용자가 "Science and Engineering area", "App Type"을 각각 선택하고, 이에 상응하는 파라미터 값을 입력하게 되면
                            해당하는 Estimation Time Value를 본 웹페이지에서 확인해볼 수 있다.</p>
                    </div>
                </Col>
                <Col>
                    <div className="single-service">
                        <i className="fa"><FaSortAmountDown /></i>
                        <h4> Parameter Ranking Service </h4>
                        <p> 사용자들이 입력한 Parameter Set 중에서 가장 많이 검색한 데이터들을 확인해볼 수 있는 서비스이다.
                        사용자가 Ranking을 알아보고 싶은 "Science and Engineering area", "App Type"을 각각 선택하게 되면
                        해당하는 Type data 중 가장 많이 입력된 Parameter Set들을 확인해볼 수 있다.
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}