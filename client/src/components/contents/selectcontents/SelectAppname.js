import React from 'react'
import { Button } from 'react-bootstrap'
import '../../../assets/css/SelectContents.css'

export default function SelectAppname() {
    return (
        <div>
            <h4 style={{ margin: '50px 0 0 30px' }}>Please Choose App Name Type</h4>
            <div className="clustercontainer py-5">
                <div className="row">
                    <div className="col-lg-6">
                        <ul className="listStyle">
                            <li className="listStyle">
                                <input type="radio" id="app1" value="appname 1" name="ProjectType" />
                                <label for="app1">appname 1</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="app2" value="appname 2" name="ProjectType" />
                                <label for="app2">appname 2</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="app3" value="appname 3" name="ProjectType" />
                                <label for="app3">appname 3</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="app4" value="appname 4" name="ProjectType" />
                                <label for="app4">appname 4</label>
                                <div class="check" />
                            </li>
                            <li className="listStyle">
                                <input type="radio" id="app5" value="appname 5" name="ProjectType" />
                                <label for="app5">appname 5</label>
                                <div class="check" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="buttonsection">
                <Button className="btn-lg btn-danger buttonstyle"> back </Button>
                <Button className="btn-lg buttonstyle"> next </Button>
            </div>
        </div>
    );
}