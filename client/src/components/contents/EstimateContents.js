import React, { useEffect, useState } from 'react'

import SelectCluster from './selectcontents/SelectCluster'
import SelectAppname from './selectcontents/SelectAppname'
import SelectParams from './selectcontents/SelectParams'

export default function EstimateContents() {
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
            subcontents = <SelectParams cluster={cluster} appname={appname}
                onAppnameBack={onAppnameChange} />
    }

    return (
        <div>
            <h2>Time Estimation section</h2>
            {subcontents}
        </div>
    );
}