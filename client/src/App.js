import React from 'react'
import { Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css'

import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import HomeContents from './components/contents/HomeContents'
import IntroContents from './components/contents/IntroContents'
import EstimateContents from './components/contents/EstimateContents'
import StatisticsContents from './components/contents/StatisticsContents'

function App() {
  return (
    <div>
      <Navbar />
      <body>
        <div className="testimonial-block">
          <div className="inner-box">
            <Route exact path='/' component={HomeContents} />
            <Route path='/intro' component={IntroContents} />
            <Route path='/estimate' component={EstimateContents} />
            <Route path='/statistics' component={StatisticsContents} />
          </div>
        </div>
      </body>
      <Footer />
    </div>
  );
}

export default App;
