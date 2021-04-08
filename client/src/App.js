import React from 'react'
import { Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/App.css'

import Navbar from 'components/navbar/Navbar'
import Footer from 'components/footer/Footer'
import HomeContents from 'components/contents/home/HomeContents'
import IntroContents from 'components/contents/introduction/IntroContents'
import EstimateContents from 'components/contents/estimation/EstimateContents'
import StatisticsContents from 'components/contents/statistics/StatisticsContents'

function App() {
  return (
    <div>
      <Navbar />
      <body>
        <div className="testimonial-block">
          <Route exact path='/' component={HomeContents} />
          <Route path='/intro' component={IntroContents} />
          <Route path='/estimate' component={EstimateContents} />
          <Route path='/statistics' component={StatisticsContents} />
        </div>
      </body>
      <Footer />
    </div>
  );
}

export default App;
