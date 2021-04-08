import React, { useEffect, useState } from 'react'

import SelectCluster from 'components/contents/selectcontents/SelectCluster'
import SelectAppname from 'components/contents/selectcontents/SelectAppname'
import SelectParams from 'components/contents/selectcontents/SelectParams'
import EstimateResult from 'components/contents/estimation/EstimateResult'

export default function EstimateContents() {
    const [cluster, setCluster] = useState(null)
    const [appname, setAppname] = useState(null)
    const [params, setParams] = useState(null)
    const [contentsnum, setContentsnum] = useState(1);

    useEffect(() => {
        if (params !== null) setContentsnum(4);
        else if (appname !== null) setContentsnum(3);
        else if (cluster !== null) setContentsnum(2);
        else if (cluster == null && contentsnum !== 1) setContentsnum(1);
    })

    const onClusterChange = (clustervalue) => {
        setCluster(clustervalue);
    }  // 자식 컴포넌트에서 cluster value update를 위해

    const onAppnameChange = (namevalue) => {
        setAppname(namevalue);
    }   //자식 컴포넌트에서 appname value update를 위해

    const onParamsChange = (paramsary) => {
        setParams(paramsary);
    }   //자식 컴포넌트에서 params ary update를 위해

    const onResetAllTypes = () => {
        setContentsnum(1);
        setParams(null);
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
            subcontents = <SelectParams cluster={cluster} appname={appname}
                onAppnameBack={onAppnameChange} onEstimateSubmit={onParamsChange} />
            break;
        case 4:
            subcontents = <EstimateResult cluster={cluster} appname={appname}
                params={params} onResetAllTypes={onResetAllTypes} />
            break;
        default:
            subcontents = null;
    }

    return (
        <div className="inner-box">
            <div>
                <h2>Simulation Execution-Time Estimation Service</h2>
                {subcontents}
            </div>
        </div>
    );
}