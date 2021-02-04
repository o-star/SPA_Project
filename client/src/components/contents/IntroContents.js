import React, { useEffect, useState } from 'react'

import LoadingView from "../LoadingView"

export default function IntroContents() {

    const [apivalue, setApivalue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // if (apivalue === null) {
        //     fetch('/api')
        //         .then((res) => res.text())
        //         .then((restext) => setApivalue(restext))
        //         .catch((err) => { console.log(err); })
        // }
    })

    if (loading) return (<LoadingView />);
    return (
        <div>
            Introduction section
            <div>
                API return value : {apivalue}
            </div>
        </div>
    );
}