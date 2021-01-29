import React from 'react'
import { Router } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css'

import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <body>
        <div className="testimonial-block">
          <div className="inner-box">
            {/* <Router> */}
              
            {/* </Router> */}
          </div>
        </div>
      </body>
      <Footer />
    </div>
  );
}

export default App;
