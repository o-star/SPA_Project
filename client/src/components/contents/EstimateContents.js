import React, { useEffect, useState } from 'react'

import SelectCluster from './selectcontents/SelectCluster'
import SelectAppname from './selectcontents/SelectAppname'

export default function EstimateContents() {
    const [cluster, setCluster] = useState(null)
    const [appname, setAppname] = useState(null)
    const [contentsnum, setContentsnum] = useState(1);

    useEffect(() => {
        if (appname != null) setContentsnum(3);
        else if (cluster !== null) setContentsnum(2);
        else if (cluster == null && contentsnum != 1) setContentsnum(1);
    })

    const onClusterNext = (clustervalue) => {
        setCluster(clustervalue);
    }

    let subcontents = <div></div>;
    switch (contentsnum) {
        case 1:
            subcontents = <SelectCluster onClusterNext={onClusterNext} />
            break;
        case 2:
            subcontents = <SelectAppname />
            break;
    }

    return (
        <div>
            <h2>Time Estimation section</h2>
            {subcontents}
        </div>
    );
}