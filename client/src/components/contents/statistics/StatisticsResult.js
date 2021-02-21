import React, { useEffect, useState } from 'react'

import '../../../assets/css/RankingResult.css'
import LoadingView from '../../LoadingView'

export default function StatisticsResult(props) {

    const [paramlist, setParamlist] = useState(null);
    const [rankdata, setRankdata] = useState(null);
    let loading = (paramlist === null) ? true : false;

    useEffect(() => {
        if (loading) {
            fetch(`/api/params/${props.cluster}/${props.appname}`)
                .then(res => res.json())
                .then(res => setTimeout(() => setParamlist(res), 500));
        }
        else if (rankdata === null) {
            fetch(`/api/statistics/${props.appname}`)
                .then(res => res.json())
                .then(res => setRankdata(res))
        }
    })

    if (loading) return <LoadingView />

    let tablehead = [<th> RANKING </th>];

    for (let k = 0; k < paramlist.length; k++)
        tablehead.push(<th>{paramlist[k]}</th>)

    let rankcontents = []
    if (rankdata !== null) {
        for (let i = 0; i < rankdata.length; i++) {
            let onecontents = [<th>{i + 1}</th>]
            for (let j = 0; j < rankdata[i].params.length; j++)
                onecontents.push(<td>{rankdata[i].params[j]}</td>)    // 임시 난수 출력
            rankcontents.push(<tr className="rowanimation" style={{ animationDelay: `${i * 600}ms` }}>{onecontents}</tr>);
        }
    }

    return (
        <div>
            <div className="infosection">
                <span id="clustertext">Cluster Type : {props.cluster} </span>
                <span id="apptext">App Type : {props.appname} </span>
            </div>
            {/* {rankdata} */}
            <div className="tablesection">
                <table className="rankingtable">
                    <thead>
                        <tr>
                            {tablehead}
                        </tr>
                    </thead>
                    <tbody>
                        {rankcontents}
                    </tbody>
                </table>
            </div>
            <div className="buttonsection">
                <button className="btn btn-primary btn-lg" onClick={props.onResetAllTypes}>RESET</button>
            </div>
        </div>
    );
}