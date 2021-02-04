import React, { useEffect, useState } from 'react'

import LoadingView from "../LoadingView"

export default function IntroContents() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    })

    if (loading) return (<LoadingView />);
    return (
        <div className="inner-box">
            <div>
                Introduction section
            </div>
        </div>
    );
}