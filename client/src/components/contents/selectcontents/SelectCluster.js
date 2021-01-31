import React from 'react'

import '../../../assets/css/SelectContents.css'

export default function SelectCluster(props) {

    let clickvalue;

    const radioOnclick = (e) => {
        clickvalue = e.target.value;
    }

    const submitOnclick = (e) => {
        e.preventDefault();
        props.onClusterNext(clickvalue);
    }

    return (
        <div>
            <h4 style={{ margin: '50px 0 0 30px' }}>Please Choose Cluster Type</h4>
            <form onSubmit={submitOnclick}>
                <div className="clustercontainer py-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <ul className="listStyle">
                                <li className="listStyle">
                                    <input type="radio" id="new-Website" value="cluster 1" name="ProjectType" onChange={radioOnclick} />
                                    <label for="new-Website">cluster 1</label>
                                    <div class="check" />
                                </li>
                                <li className="listStyle">
                                    <input type="radio" id="wr-wcs" value="cluster 2" name="ProjectType" onChange={radioOnclick} />
                                    <label for="wr-wcs">cluster 2</label>
                                    <div class="check" />
                                </li>
                                <li className="listStyle">
                                    <input type="radio" id="g-wcs" value="cluster 3" name="ProjectType" onChange={radioOnclick} />
                                    <label for="g-wcs">cluster 3</label>
                                    <div class="check" />
                                </li>
                                <li className="listStyle">
                                    <input type="radio" id="e-wcs" value="cluster 4" name="ProjectType" onChange={radioOnclick} />
                                    <label for="e-wcs">cluster 4</label>
                                    <div class="check" />
                                </li>
                                <li className="listStyle">
                                    <input type="radio" id="wm-wcs" value="cluster 5" name="ProjectType" onChange={radioOnclick} />
                                    <label for="wm-wcs">cluster 5</label>
                                    <div class="check" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="buttonsection">
                    <input type="submit" value="back" className="btn-lg btn-danger buttonstyle" />
                    <input type="submit" value="next" className="btn-lg btn-primary buttonstyle" />
                </div>
            </form>
        </div>
    );
}