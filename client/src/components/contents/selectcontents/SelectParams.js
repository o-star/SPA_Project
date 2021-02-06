import React, { useState, useEffect } from 'react'
import LoadingView from '../../LoadingView'

export default function SelectParams(props) {

    const [paramlist, setParamlist] = useState(null);
    let loading = (paramlist === null) ? true : false;
    let paramtexts = [];
    let paramvalues = null;

    useEffect(() => {
        if (loading)
            fetch('/api/params')
                .then((res) => res.json())
                .then((res) => {
                    setTimeout(() => setParamlist(res.params), 500);
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
            .then((res) => res.text())
            .then((res) => console.log(res));
        alert("submit");
    }

    if (loading) return (<LoadingView />);

    paramvalues = new Array(paramlist.length);
    for (let k = 0; k < paramlist.length; k++)
        paramtexts.push(
            <li className="paramitem">
                <h5>{paramlist[k]} : <input className='paramtextbox' id={k} type={Text} onChange={onChangeParam} /></h5>
            </li>)
    /* server로부터 받아온 parameter list 화면요소 추가 */

    return (
        <div>
            <form method="POST" action="/api/estimate-result" onSubmit={onSubmitClick} >
                <h4 className="selectcontents">Cluster Type : <input type="text" name="cluster" className="staticinputstyle" value={props.cluster} readOnly disabled /></h4>
                <h4 className="selectcontents">App Name : <input type="text" name="appname" className="staticinputstyle" value={props.appname} readOnly disabled /></h4>
                <h4 className="subtitle">Fill In Parameter Table</h4>
                <div className="clustercontainer">
                    <div className="row">
                        <div className="paramcontainer">
                            <ul className="ulStyle">
                                {paramtexts}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="twobuttonsection">
                    <input type='submit' className="btn-lg btn-danger noline threebuttonstyle" onClick={onBackClick} value='BACK' />
                    <input type='reset' className="btn-lg btn-success noline threebuttonstyle" value="RESET" />
                    <input type='submit' className="btn-lg btn-primary noline threebuttonstyle" value="ESTIMATE TIME" />
                </div>
            </form>
        </div >
    );
}