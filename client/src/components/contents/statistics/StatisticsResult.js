import React, { useEffect, useState } from 'react'

import '../../../assets/css/RankingResult.css'
import LoadingView from '../../LoadingView'

export default function StatisticsResult(props) {

    const [paramlist, setParamlist] = useState(null);
    let loading = (paramlist === null) ? true : false;

    useEffect(() => {
        if (loading) {
            fetch(`/api/params/${props.cluster}/${props.appname}`)
                .then((res) => res.json())
                .then((res) => setTimeout(() => setParamlist(Object.keys(res)), 500));
        }
    })

    if (loading) return <LoadingView />

    let tablehead = [<th> RANKING </th>, <th>Runtime</th>];
    console.log(paramlist);
    for (let k = 0; k < paramlist.length; k++)
        tablehead.push(<th>{paramlist[k]}</th>)

    let rankcontents = []
    for (let i = 1; i <= 10; i++) {
        let onecontents = [<th>{i}</th>]
        for (let j = 0; j <= paramlist.length; j++)
            onecontents.push(<td>{Number.parseInt(Math.random() * 100 % 10)}</td>)    // 임시 난수 출력
        rankcontents.push(<tr className="rowanimation" style={{ animationDelay: `${(i - 1) * 600}ms` }}>{onecontents}</tr>);
    }

    return (
        <div>
            <div className="infosection">
                <span id="clustertext">Cluster Type : {props.cluster} </span>
                <span id="apptext">App Type : {props.appname} </span>
            </div>
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