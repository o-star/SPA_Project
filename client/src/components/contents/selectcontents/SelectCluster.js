import React from 'react'
import { Button } from 'react-bootstrap'

import '../../../assets/css/SelectContents.css'

export default function SelectCluster(props) {

    let clickvalue = null;

    const onnRadioClick = (e) => {
        clickvalue = e.target.value;
    }

    const onNextClick = (e) => {
        e.preventDefault();
        if (clickvalue !== null) props.onClusterNext(clickvalue);
    }

    return (
        <div>
            <h4 className="subtitle">Choose a computational science and enginerring area</h4>
            <div className="clustercontainer">
                <div className="row">
                    <div className="subcontainer">
                        <ul className="listStyle">
                            <li className="listStyle">
                                <input type="radio" id="new-Website" value="cluster 1" name="ProjectType" onChange={onnRadioClick} />
                                <label for="new-Website">cluster 1</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="wr-wcs" value="cluster 2" name="ProjectType" onChange={onnRadioClick} />
                                <label for="wr-wcs">cluster 2</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="g-wcs" value="cluster 3" name="ProjectType" onChange={onnRadioClick} />
                                <label for="g-wcs">cluster 3</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="e-wcs" value="cluster 4" name="ProjectType" onChange={onnRadioClick} />
                                <label for="e-wcs">cluster 4</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="wm-wcs" value="cluster 5" name="ProjectType" onChange={onnRadioClick} />
                                <label for="wm-wcs">cluster 5</label>
                                <div class="check" />
                            </li>
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