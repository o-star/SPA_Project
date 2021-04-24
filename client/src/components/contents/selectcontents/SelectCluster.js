import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

import 'assets/css/SelectContents.css'
import LoadingView from 'components/LoadingView'

export default function SelectCluster(props) {

    const [clusterlist, setClusterlist] = useState(null);
    const [clusterimg, setClusterimg] = useState(null);
    const [clickvalue, setClickvalue] = useState(null);
    const [comment, setComment] = useState(null);

    let loading = (clusterlist === null) ? true : false;
    let radiobuttons = [];

    useEffect(() => {
        fetch('/api/clusters')
            .then((res) => res.json())
            .then((res) => {
                setTimeout(() => setClusterlist(res), 500);
            })
    }, [])

    const onnRadioClick = (e) => {
        if (document.getElementsByClassName('unselectimg').length)
            document.getElementsByClassName('unselectimg')[0].className = 'selectimg';
        else
            document.getElementsByClassName('selectimg')[0].className = 'selectimg';

        setClickvalue(e.target.value);
        setClusterimg(`./clusterimages/${e.target.value}.png`)
    }

    const onNextClick = (e) => {
        e.preventDefault();
        if (clickvalue === null)
            setComment(
                <div className="commentstyle">
                    Please press 'next' button after selection
                </div>);

        else props.onClusterNext(clickvalue);
    }

    if (loading) return (<LoadingView />);

    for (let k = 0; k < clusterlist.length; k++)
        radiobuttons.push(
            <li className="listStyle">
                <input type="radio" id={clusterlist[k]} value={clusterlist[k]} name="ClusterType" onChange={onnRadioClick} />
                <label for={clusterlist[k]}>{clusterlist[k]}</label>
                <div className="check" />
            </li>)
    /* server로부터 받아온 cluster list 화면요소 추가 */

    return (
        <div>
            <h4 className="subtitle">Choose a Computational Science and Engineering(CSE) Area</h4>
            <div className="clustercontainer">
                <Row>
                    <Col >
                        <div className="selectimgsection">
                            <img src={clusterimg} alt='' className="unselectimg" onError={(e) => { e.target.src = '/clusterimages/noimage.png' }} />
                        </div>
                    </Col>
                    <Col id='cols'>
                        <div className="subcontainer">
                            <ul className="ulStyle">
                                {radiobuttons}
                            </ul>
                        </div>
                    </Col>
                    <Col >
                    </Col>
                </Row>
            </div>
            <div className="onebuttonsection center-block">
                <Button className="btn-lg buttonstyle" onClick={onNextClick}> NEXT </Button>
            </div>
            {comment}
        </div>
    );
}