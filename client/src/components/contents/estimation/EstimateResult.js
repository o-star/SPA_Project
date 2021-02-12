import React from 'react'

import '../../../assets/css/EstimationResult.css'

export default function EstimateResult(props) {



    return (
        <div>
            <section class="divided clearfix">
                <div class="container">
                    <div class="row py-5">
                        <div class="col col-12 col-sm-12 col-md-6 p-lg-5">
                            <div className="textcontainer">
                                <div class="p-5 clusteranimate">
                                    <h5 class="text-muted">Science & Enginerring Type </h5>
                                    <h4 class="mb-5">{props.cluster} </h4>
                                    <h5 class="text-muted">Appname </h5>
                                    <h4 class="mb-5">{props.appname} </h4>
                                    <h5 class="text-muted">Parameters </h5>

                                </div>
                            </div>
                        </div>
                        <div class="col col-12 col-sm-12 col-md-6 p-lg-5">
                            <div class="p-5">
                                <h5 class="h5 text-muted">Bootstrap</h5>
                                <h1 class="h1 mb-5">Spacing </h1>
                                <p>Bootstrap includes a wide range of shorthand responsive margin and padding utility classes to modify an element’s appearance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}