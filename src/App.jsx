import React from 'react'


//images
import bottl_1 from './assets/bottle-1.png'
import bottl_2 from './assets/bottle-2.png'
import cedi from './assets/cedi-1.png'
import logo from './assets/afrilogic.png'

import './css/index.css'



function App() {
   

  return (
    <div className="app">
      
      <div className="container">

        <div className='header-center'>
          <div className="header">
            <h1>Feedback</h1>

          </div>
        </div>

        <div className="main-col">
          <div className="main-col__lt">
            <div className='main-col__top'>
              <div className="text-desc">
                Total Bottle: 12
              </div>

              <div className='btn'>
                <button className='btn-start' type='submit'>Start</button>
              </div>

            </div>

            <div className="center">
              <div className="items">
                <div className='item-1'>
                  <img src={bottl_1} alt="first items" />
                  <div className='bottle_1-desc'>
                    3
                  </div>
                </div>

                <div className='item-1'>
                  <img src={bottl_1} alt="second items" />
                  <div className='bottle_1-desc'>
                    2
                  </div>
                </div>

              </div>

              <div className="price">
                <div className="col-1">
                  <div className='price-desc'>Price</div>

                  <div className="amount">
                    <span>
                      <img className='cedi' src={cedi} alt="cedi" />
                    </span>
                    <span>0.01</span>

                  </div>

                </div>

                <div className="col-2">
                  <button type='submit'>
                    Finish
                  </button>
                </div>

              </div>

            </div>
          
          </div>


          <div className='logo'>
            <img src={logo} alt="Afrilogic Logo" />
          </div>
        </div>
        
      </div>


    </div>
  )
}

export default App
