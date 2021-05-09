import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'

import 'assets/css/EstimationResult.css'
import LoadingView from 'components/LoadingView'

export default function EstimateResult(props) {

    const [loading, setLoading] = useState(true);

    setTimeout(() => setLoading(false), 500)

    let paramtable = [], paramsize = props.params.length - 1;
    for (let i = 0; i < paramsize - 1; i++) {
        paramtable.push(<Col xs="6" sm="4"><h6>{props.params[i][0]} : {props.params[i][1]}</h6></Col>)
    }

    if (loading) return <LoadingView />
    return (
        <div>
            <section className="divided clearfix">
                <div className="container">
                    <div className="row py-3">
                        <div className="col col-12 col-sm-12 col-md-6 p-lg-5">
                            <div className="textcontainer">
                                <div className="p-5 infosection">
                                    <div className="clusteranimate">
                                        <h5 className="text-muted">CSE Type </h5>
                                        <h4 className="mb-5">{props.cluster} </h4>
                                    </div>
                                    <div className="appanimate">
                                        <h5 className="text-muted">Appname </h5>
                                        <h4 className="mb-5">{props.appname} </h4>
                                    </div>
                                    <div className="paramanimate">
                                        <h5 className="text-muted">Parameters </h5>
                                        <Row>
                                            {paramtable}
                                        </Row>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-6 p-lg-5">
                            <div className="p-5 resultsection resultanimate">
                                <h5 className="text-muted">Estimation Time</h5>
                                <h1 className="mb-5"> {props.params[props.params.length - 2][1]}
                                    <span className="h5" style={{ marginLeft: '10px' }}>sec(s)</span>
                                </h1>

                                {(props.params[props.params.length - 1][1] !== -1) ?
                                    <div>
                                        <h5 className="text-muted">Actual Runtime Median Value</h5>
                                        <h1 className="mb-5"> {props.params[props.params.length - 1][1]}
                                            <span className="h5" style={{ marginLeft: '10px' }}>sec(s)</span>
                                        </h1>
                                    </div>
                                    : <div></div>
                                }   {/* Actual runtime 값이 존재할 경우 출력해주고, 없을 경우 estimation Result만 출력 */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="buttonsection">
                <button className="btn btn-primary btn-lg" onClick={props.onResetAllTypes}>RESET</button>
            </div>
        </div>
    );
}