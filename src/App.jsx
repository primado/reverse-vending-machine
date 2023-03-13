import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useWebSocket from 'react-use-websocket';


var address = import.meta.env.IP_ADDRESS;
var feedback ="";
var metal;
var pet;
var status = "";
var metal_total=0,pet_total= 0, total_items = 0;
var metal_total_price=0,pet_total_price= 0, total_price = 0;


const WS_URL = 'ws://192.168.1.101:8081';


//images
import bottl_1 from './assets/bottle-1.png'
import bottl_2 from './assets/bottle-2.png'
import cedi from './assets/cedi-1.png'
import logo from './assets/afrilogic.png'

import './css/index.css'



function App() {
 
   useWebSocket(WS_URL, {

    onOpen: () => {
      console.log('WebSocket1 connection established.');
    },
    onMessage:(event)=>{
      const data = JSON.parse(event.data);
      console.log(data);
          feedback = data['feedback'];
          metal = data['metal'];
          pet = data['pet']
          status = data['status']

          if(status === "active"){
          if(metal > 0 && pet === 0){
            metal_total =  metal_total + 1;
            metal_total_price = metal_total_price + 0.25;
           }
          if(pet > 0 && metal === 0){
            pet_total =  pet_total + 1;
            pet_total_price = pet_total_price + 0.2
          }
          
          total_items = pet_total + metal_total;
          total_price = pet_total_price + metal_total_price;
        }

      
    },
    shouldReconnect: (closeEvent) => true,
  });

   
   return (
    <div className="app">
      
      <div className="container">

        <div className='header-center'>
          <div className="header">
            <h1>{feedback}</h1>

          </div>
        </div>

        <div className="main-col">
          <div className="main-col__lt">
            <div className='main-col__top'>
              <div className="text-desc">
                Total Bottle: {total_items}
              </div>

              <div className='btn'>
                <button className='btn-primary' type='submit'>Start</button>
              </div>
            </div>

            <div className="middle">
              <div className="middle__lt">
                <div className='item-1'>
                  <img src={bottl_1} alt="item 1" />
                  <span>{metal_total}</span>
                </div>

                <div className="item-2">
                  <img src={bottl_2} alt="item 2" />
                  <span>{pet_total}</span>
                </div>

              </div>

              <div className="middle__rt">
                <div className='price-container'>
                  <span className='desc'>Price</span>
                  <div className='amount'>
                    <span><img className='cedi' src={cedi} alt="currency symbol" />
                      [{total_price.toFixed(2)}]
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
