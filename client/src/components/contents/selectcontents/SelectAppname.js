import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import '../../../assets/css/SelectContents.css'
import LoadingView from '../../LoadingView'

export default function SelectAppname(props) {

    const [applist, setApplist] = useState(null);

    let clickvalue = null;
    let loading = (applist === null) ? true : false;
    let radiobuttons = [];

    useEffect(() => {
        if (loading)
            fetch('/api/appnames')
                .then((res) => res.json())
                .then((res) => {
                    setTimeout(() => setApplist(res.appnames), 500);
                })
    })

    const onnRadioClick = (e) => {
        clickvalue = e.target.value;
    }

    const onBackClick = () => {
        props.onClusterBack(null);
    }

    const onNextClick = (e) => {
        e.preventDefault();
        if (clickvalue !== null) props.onAppnameNext(clickvalue);
    }

    if (loading) return (<LoadingView />);

    for (let k = 0; k < applist.length; k++)
        radiobuttons.push(
            <li className="listStyle">
                <input type="radio" id={applist[k]} value={applist[k]} name="ClusterType" onChange={onnRadioClick} />
                <label for={applist[k]}>{applist[k]}</label>
                <div class="check" />
            </li>)
    /* server로부터 받아온 app list 화면요소 추가 */

    return (
        <div>
            <h4 className="selectcontents">Cluster Type : <strong style={{ color: 'red' }}>{props.cluster}</strong></h4>
            <h4 className="subtitle">Choose App Name Type</h4>
            <div className="clustercontainer">
                <div className="row">
                    <div className="subcontainer">
                        <ul className="ulStyle">
                            {radiobuttons}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="twobuttonsection">
                <Button className="btn-lg btn-danger buttonstyle" onClick={onBackClick}> BACK </Button>
                <Button className="btn-lg buttonstyle" onClick={onNextClick}> NEXT </Button>
            </div>
        </div >
    );
}