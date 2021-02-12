import React from 'react'
import { Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css'

import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import HomeContents from './components/contents/home/HomeContents'
import IntroContents from './components/contents/IntroContents'
import EstimateContents from './components/contents/estimation/EstimateContents'
import StatisticsContents from './components/contents/StatisticsContents'

import EstimateResult from './components/contents/estimation/EstimateResult'

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

          <Route path="/result" component = {() => <EstimateResult
          cluster="calculation chemistry" appname="dmd_pol"/>} />
          {/* 연습용 router */}

        </div>
      </body>
      <Footer />
    </div>
  );
}

export default App;
