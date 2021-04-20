import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import 'assets/css/SelectContents.css'
import LoadingView from 'components/LoadingView'

export default function SelectAppname(props) {

    const [applist, setApplist] = useState(null);
    const [appimg, setAppimg] = useState(null);
    const [clickvalue, setClickvalue] = useState(null);
    const [comment, setComment] = useState(null);

    let loading = (applist === null) ? true : false;
    let radiobuttons = [];

    useEffect(() => {
        if (loading)
            fetch(`/api/appnames/${props.cluster}`)
                .then((res) => res.json())
                .then((res) => {
                    setTimeout(() => setApplist(res), 500);
                })
    })

    const onnRadioClick = (e) => {
        if (document.getElementsByClassName('unselectimg').length)
            document.getElementsByClassName('unselectimg')[0].className = 'selectimg';
        else
            document.getElementsByClassName('selectimg')[0].className = 'selectimg';

        setClickvalue(e.target.value);
        setAppimg(`./appimages/${e.target.value}.png`)

    }

    const onBackClick = () => {
        props.onClusterBack(null);
    }

    const onNextClick = (e) => {
        e.preventDefault();
        if (clickvalue === null)
            setComment(
                <div className="commentstyle">
                    Please press 'next' button after selection
            </div>);
        else props.onAppnameNext(clickvalue);
    }

    if (loading) return (<LoadingView />);

    for (let k = 0; k < applist.length; k++)
        radiobuttons.push(
            <li className="listStyle">
                <input type="radio" id={applist[k]} value={applist[k]} name="ClusterType" onChange={onnRadioClick} />
                <label for={applist[k]}>{applist[k]}</label>
                <div className="check" />
            </li>)
    /* server로부터 받아온 app list 화면요소 추가 */

    return (
        <div>
            <h4 className="selectcontents">CSE Type : <strong style={{ color: 'red' }}>{props.cluster}</strong></h4>
            <h4 className="subtitle">Choose App Name Type</h4>
            <div className="clustercontainer">
                <Row>
                    <Col>
                        <div className="selectimgsection">
                            <img src={`/clusterimages/${props.cluster}.png`} alt='' className="visibleimg" onError={(e) => { e.target.src = '/clusterimages/noimage.png' }} />
                        </div>
                    </Col>
                    <Col>
                        <div className="subcontainer">
                            <ul className="ulStyle">
                                {radiobuttons}
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div className="selectimgsection">
                            <img src={appimg} alt='' className="unselectimg" onError={(e) => { e.target.src = '/clusterimages/noimage.png' }} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="twobuttonsection">
                <Button className="btn-lg btn-danger buttonstyle" onClick={onBackClick}> BACK </Button>
                <Button className="btn-lg buttonstyle" onClick={onNextClick}> NEXT </Button>
            </div>
            {comment}
        </div >
    );
}