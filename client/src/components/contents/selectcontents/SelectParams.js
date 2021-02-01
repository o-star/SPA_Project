import React from 'react'
import { Button } from 'react-bootstrap'

export default function SelectParams(props) {

    const onBackClick = () => {
        props.onAppnameBack(null);
    }

    return (
        <div>
            <h4 className="subtitle">Cluster Type : <strong style={{ color: 'red' }}>{props.cluster}</strong></h4>
            <h4 className="subtitle">App Name : <strong style={{ color: 'red' }}>{props.appname}</strong></h4>
            <h4 className="subtitle">Please Choose App Name Type</h4>
            <div className="clustercontainer">
                <div className="row">
                    <div className="subcontainer">
                        <div>empty</div>
                    </div>
                </div>
            </div>
            <div className="twobuttonsection">
                <Button className="btn-lg btn-danger buttonstyle" onClick={onBackClick}> BACK </Button>
                <Button className="btn-lg buttonstyle"> SUBMIT </Button>
            </div>
        </div >
    );
}