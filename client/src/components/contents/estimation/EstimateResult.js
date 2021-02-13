import React from 'react'
import { Row, Col } from 'react-bootstrap'

import '../../../assets/css/EstimationResult.css'

export default function EstimateResult(props) {

    console.log(props.params[0])
    let paramtable = [], paramsize = props.params.length;
    for (let i = 0; i < paramsize; i++) {
        paramtable.push(<Col xs="6" sm="4"><h6>{props.params[i][0]} : {props.params[i][1]}</h6></Col>)
    }

    return (
        <div>
            <section class="divided clearfix">
                <div class="container">
                    <div class="row py-5">
                        <div class="col col-12 col-sm-12 col-md-6 p-lg-5">
                            <div className="textcontainer">
                                <div class="p-5 infosection">
                                    <div className="clusteranimate">
                                        <h5 class="text-muted">Science & Enginerring Type </h5>
                                        <h4 class="mb-5">{props.cluster} </h4>
                                    </div>
                                    <div className="appanimate">
                                        <h5 class="text-muted">Appname </h5>
                                        <h4 class="mb-5">{props.appname} </h4>
                                    </div>
                                    <div className="paramanimate">
                                        <h5 class="text-muted">Parameters </h5>
                                        <Row>
                                            {paramtable}
                                        </Row>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col col-12 col-sm-12 col-md-6 p-lg-5">
                            <div class="p-5 resultsection resultanimate">
                                <h5 class="text-muted">Estimation Time</h5>
                                <h1 class="mb-5"> example Time </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}