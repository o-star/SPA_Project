import React, { useEffect, useState } from 'react'

import SelectCluster from '../selectcontents/SelectCluster'
import SelectAppname from '../selectcontents/SelectAppname'
import StatisticsResult from './StatisticsResult'

export default function StatisticsContents() {

    const [cluster, setCluster] = useState(null)
    const [appname, setAppname] = useState(null)
    const [contentsnum, setContentsnum] = useState(1);

    useEffect(() => {
        if (appname !== null) setContentsnum(3);
        else if (cluster !== null) setContentsnum(2);
        else if (cluster == null && contentsnum !== 1) setContentsnum(1);
    })

    const onClusterChange = (clustervalue) => {
        setCluster(clustervalue);
    }  // 자식 컴포넌트에서 cluster value update를 위해

    const onAppnameChange = (namevalue) => {
        setAppname(namevalue);
    }   //자식 컴포넌트에서 appname value update를 위해

    const onResetAllTypes = () => {
        setAppname(null);
        setCluster(null);
    }   // cluster type, app type all reset

    let subcontents = <div></div>;
    switch (contentsnum) {
        case 1:
            subcontents = <SelectCluster onClusterNext={onClusterChange} />
            break;
        case 2:
            subcontents = <SelectAppname cluster={cluster} onClusterBack={onClusterChange}
                onAppnameNext={onAppnameChange} />
            break;
        case 3:
            subcontents = <StatisticsResult cluster={cluster} appname={appname} onResetAllTypes={onResetAllTypes} />
            break;
        default:
            subcontents = null;
    }

    return (
        <div className="inner-box">
            <div>
                <h2>Parameter Ranking Statistics Service</h2>
                {subcontents}
            </div>
        </div>
    );
}