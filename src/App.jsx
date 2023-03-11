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
                <button className='btn-primary' type='submit'>Start</button>
              </div>
            </div>

            <div className="middle">
              <div className="middle__lt">
                <div className='item-1'>
                  <img src={bottl_1} alt="item 1" />
                  <span>3</span>
                </div>

                <div className="item-2">
                  <img src={bottl_2} alt="item 2" />
                  <span>2</span>
                </div>

              </div>

              <div className="middle__rt">
                <div className='price-container'>
                  <span className='desc'>Price</span>
                  <div className='amount'>
                    <span><img className='cedi' src={cedi} alt="currency symbol" />
                      0.01
                    </span>
                  </div>
                </div>
               

                <div className="btn">
                  <button className='btn-primary' type='submit'>
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
