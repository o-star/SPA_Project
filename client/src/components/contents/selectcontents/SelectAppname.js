import React from 'react'
import { Button } from 'react-bootstrap'
import '../../../assets/css/SelectContents.css'

export default function SelectAppname(props) {

    let clickvalue = null;

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

    return (
        <div>
            <h4 className="subtitle">Cluster Type : <strong style={{ color: 'red' }}>{props.cluster}</strong></h4>
            <h4 className="subtitle">Please Choose App Name Type</h4>
            <div className="clustercontainer">
                <div className="row">
                    <div className="subcontainer">
                        <ul className="listStyle">
                            <li className="listStyle">
                                <input type="radio" id="app1" value="appname 1" name="ProjectType" onChange={onnRadioClick} />
                                <label for="app1">appname 1</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="app2" value="appname 2" name="ProjectType" onChange={onnRadioClick} />
                                <label for="app2">appname 2</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="app3" value="appname 3" name="ProjectType" onChange={onnRadioClick} />
                                <label for="app3">appname 3</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="app4" value="appname 4" name="ProjectType" onChange={onnRadioClick} />
                                <label for="app4">appname 4</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="app5" value="appname 5" name="ProjectType" onChange={onnRadioClick} />
                                <label for="app5">appname 5</label>
                                <div class="check" />
                            </li>
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