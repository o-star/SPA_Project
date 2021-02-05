import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import '../../../assets/css/SelectContents.css'
import LoadingView from '../../LoadingView'

export default function SelectCluster(props) {

    const [clusterlist, setClusterlist] = useState(null);

    let clickvalue = null;
    let loading = (clusterlist === null) ? true : false;
    let radiobuttons = [];

    useEffect(() => {
        if (loading)
            fetch('/api/clusters')
                .then((res) => res.json())
                .then((res) => {
                    setTimeout(() => setClusterlist(res.clusters), 500);
                })
    })

    const onnRadioClick = (e) => {
        clickvalue = e.target.value;
    }

    const onNextClick = (e) => {
        e.preventDefault();
        if (clickvalue !== null) props.onClusterNext(clickvalue);
    }

    if (loading) return (<LoadingView />);

    for (let k = 0; k < clusterlist.length; k++)
        radiobuttons.push(
            <li className="listStyle">
                <input type="radio" id={clusterlist[k]} value={clusterlist[k]} name="ClusterType" onChange={onnRadioClick} />
                <label for={clusterlist[k]}>{clusterlist[k]}</label>
                <div class="check" />
            </li>)
    /* server로부터 받아온 cluster list 화면요소 추가 */

    return (
        <div>
            <h4 className="subtitle">Choose a computational science and enginerring area</h4>
            <div className="clustercontainer">
                <div className="row">
                    <div className="subcontainer">
                        <ul className="ulStyle">
                            {radiobuttons}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="onebuttonsection center-block">
                <Button className="btn-lg buttonstyle" onClick={onNextClick}> NEXT </Button>
            </div>
        </div>
    );
}