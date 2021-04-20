import React, { useState, useEffect } from 'react'
import LoadingView from 'components/LoadingView'
import { Col, Row } from 'react-bootstrap'

export default function SelectParams(props) {

    const [paramlist, setParamlist] = useState(null);
    const [submitvalues, setSubmitvalues] = useState(null);
    const comment = <div className="commentstyle">Please press 'estimation' button after entering all the values</div>

    let loading = (paramlist === null) ? true : false;
    let paramtexts = [];
    let paramvalues = null;

    useEffect(() => {
        if (loading)
            fetch(`/api/params/${props.cluster}/${props.appname}`)
                .then((res) => res.json())
                .then((res) => {
                    setTimeout(() => setParamlist(res), 500);
                })
    })

    const onChangeParam = (e) => {
        paramvalues[e.target.id] = e.target.value;
    }

    const onBackClick = () => {
        props.onAppnameBack(null);
    }

    const onSubmitClick = (e) => {
        e.preventDefault();

        let paramsize = paramvalues.length, subpossible = true;
        for (let k = 0; k < paramsize; k++)
            if (paramvalues[k] === undefined || paramvalues[k] === "") {
                setSubmitvalues([...paramvalues]);
                subpossible = false;
                break;
            }

        if (subpossible) {
            fetch('/api/estimate-result', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    cluster: e.target.cluster.value,
                    appname: e.target.appname.value,
                    params: paramvalues
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    let valary = paramlist.map((v, idx) => {
                        return [v, paramvalues[idx]];
                    })
                    valary.push(['runtime', res[0]]) // estimation runtime
                    valary.push(['median', res[1]])  // actual runtime median value
                    props.onEstimateSubmit(valary)
                })
        }
    }

    if (loading) return (<LoadingView />);

    if (submitvalues === null) {
        paramvalues = new Array(paramlist.length);
        for (let k = 0; k < paramlist.length; k++) {
            paramtexts.push(
                <Col xs="6" sm="4" className="paramitem" >
                    <span className="paramspan">
                        {paramlist[k]}
                    </span>
                    <span className="paramspan">
                        <input className='paramtextbox' id={k} type={Text} onChange={onChangeParam} />
                    </span>
                </Col>)
        }
    }

    else {
        paramvalues = [...submitvalues];
        for (let k = 0; k < paramlist.length; k++) {
            paramtexts.push(
                <Col xs="6" sm="4" className="paramitem" >
                    <span className="paramspan">
                        {paramlist[k]}
                    </span>
                    <span className="paramspan">
                        <input className={(paramvalues[k] === undefined || paramvalues[k] === "") ? 'empty-paramtextbox' : 'paramtextbox'}
                            id={k} type={Text} onChange={onChangeParam} />
                    </span>
                </Col>)
        }
    }
    /* server로부터 받아온 parameter list 화면요소 추가 */

    return (
        <div>
            <form method="POST" action="/api/estimate-result" onSubmit={onSubmitClick} >
                <h4 className="selectcontents">CSE Type : <input type="text" name="cluster" className="staticinputstyle" value={props.cluster} readOnly disabled /></h4>
                <h4 className="selectcontents">App Name : <input type="text" name="appname" className="staticinputstyle" value={props.appname} readOnly disabled /></h4>
                <h4 className="subtitle">Fill In Parameter Table</h4>
                <div className="clustercontainer">
                    <div className="row">
                        <Row className="paramcontainer">
                            {paramtexts}
                        </Row>
                    </div>
                </div>
                <div className="twobuttonsection">
                    <input type='submit' className="btn-lg btn-danger noline threebuttonstyle" onClick={onBackClick} value='BACK' />
                    <input type='reset' className="btn-lg btn-success noline threebuttonstyle" value="RESET" />
                    <input type='submit' className="btn-lg btn-primary noline threebuttonstyle" value="ESTIMATE TIME" />
                </div>
            </form>
            {(submitvalues === null) ? <div></div> : comment}
        </div >
    );
}