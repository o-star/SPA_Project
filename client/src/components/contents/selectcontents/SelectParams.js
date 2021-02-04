import React, { useState, useEffect } from 'react'
import LoadingView from '../../LoadingView'

export default function SelectParams(props) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/paramlist')
            .then((res) => {
                console.log(res[0]);
                setLoading(false);
            })
    })

    const onBackClick = () => {
        props.onAppnameBack(null);
    }

    if (loading) return (<LoadingView />);
    return (
        <div>
            <form>
                <h4 className="selectcontents">Cluster Type : <input type="text" id="app1" className="staticinputstyle" value={props.cluster} readOnly disabled /></h4>
                <h4 className="selectcontents">App Name : <input type="text" id="app1" className="staticinputstyle" value={props.appname} readOnly disabled /></h4>
                <h4 className="subtitle">Fill In Parameter Table</h4>
                <div className="clustercontainer">
                    <div className="row">
                        <div className="paramcontainer">
                            <ul className="listStyle">
                                <li className="paramitem">
                                    <h5>Param 1 : <input className='paramtextbox' type={Text} /></h5>
                                </li>
                                <li className="paramitem">
                                    <h5>Param 2 : <input className='paramtextbox' type={Text} /></h5>
                                </li>
                                <li className="paramitem">
                                    <h5>Param 3 : <input className='paramtextbox' type={Text} /></h5>
                                </li>
                                <li className="paramitem">
                                    <h5>Param 4 : <input className='paramtextbox' type={Text} /></h5>
                                </li>
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