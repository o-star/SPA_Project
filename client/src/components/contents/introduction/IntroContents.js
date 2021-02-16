import React from 'react'
import { Row, Col } from 'react-bootstrap'

import '../../../assets/css/IntroContents.css'

export default function IntroContents() {

    return (
        <div className="inner-box">
            <div className="introcontainer">
                <Row>
                    <Col className="subsection-title">
                        <a href=''>System Architecture</a>
                    </Col>
                    <Col className="subsection-title">
                        Main Function
                    </Col>
                    <Col className="subsection-title">
                        People
                    </Col>
                </Row>
            </div>
        </div>
    );
}