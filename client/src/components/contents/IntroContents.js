import React, { useEffect, useState } from 'react'

export default function IntroContents() {

    const [apivalue, setApivalue] = useState(null);

    useEffect(() => {
        if (apivalue === null) {
            fetch('/api')
                .then((res) => res.text())
                .then((restext) => setApivalue(restext))
                .catch((err) => { console.log(err); })
        }
    })

    return (
        <div>
            Introduction section
            <div>
                API return value : {apivalue}
            </div>
        </div>
    );
}