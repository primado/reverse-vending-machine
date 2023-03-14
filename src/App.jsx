import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useWebSocket from 'react-use-websocket';
import 'reactjs-popup/dist/index.css';
import Modal from "react-modal";




var address = import.meta.env.IP_ADDRESS;
var feedback;
var metal;
var pet;
var status,state = "",message;
var metal_total=0,pet_total= 0, total_items = 0;
var metal_total_price=0,pet_total_price= 0, total_price = 0;


const WS_URL = 'ws://192.168.1.101:8081';
const WS_URL1 = 'ws://192.168.1.101:8082';

//images
import bottl_1 from './assets/can-bottle.png'
import bottl_2 from './assets/pet_bottle.png'
import cedi from './assets/cedi-1.png'
import logo from './assets/afrilogic.png'

import './css/index.css'



function App() {
   
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null);


  function handleNumberClick(number) {
    setInputValue(inputValue + number);
  }

  function handleBackspaceClick() {
    setInputValue(inputValue.slice(0, -1));
  }

  function handleClearClick() {
    setInputValue("");
  }

  function handlePhoneNumberChange(event) {
    setPhoneNumber(event.target.value);
  }

  function Finish(){
    socket.send("finish");

  }

  function handleSavePhoneNumber() {
    console.log(inputValue);
    // alert(inputValue);
    setModalIsOpen(false);
    message = "INITIALIZING SYSTEM .... PLEASE WAIT!";
    //connect to websocket
    socket.send("start");

    setInputValue("");
  }
   useWebSocket(WS_URL, {

    onOpen: () => {
      console.log('WebSocket1 connection established.');
    },
    onMessage:(event)=>{
      const data = JSON.parse(event.data);
      console.log(data);
          feedback = data['feedback'];
          metal = data['metal'];
          pet = data['pet'];
          status = data['status'];
          state = data['state'];


          if(status === "active" && state === "good" ){
              if(metal > 0 && pet === 0){
                message = feedback;
                metal_total =  metal_total + 1;
                metal_total_price = metal_total_price + 0.25;
              }
              if(pet > 0 && metal === 0){
                message = feedback;
                pet_total =  pet_total + 1;
                pet_total_price = pet_total_price + 0.2
              }

              if(metal === 0 && pet === 0){
                message = "START INSERTING BOTTLES";
              }
              
              total_items = pet_total + metal_total;
              total_price = pet_total_price + metal_total_price;
        }

        if(status === "inactive" && state === "good" ){
          message = feedback;
        }


        

      
    },
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
 
    const ws = new WebSocket(WS_URL1);
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connection established");

    }; 

    ws.onmessage = (event) => {
      console.log(`Received data: ${event.data}`);
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    };
    
    return () => {
      
     };
  }, []);
   
   return (
    <div className="app">
      
      <div className="container">

        <div className='header-center'>
          <div className="header">
            <h1>{message}</h1>

          </div>
        </div>

        <div className="main-col">
          <div className="main-col__lt">
            <div className='main-col__top'>
              <div className="text-desc">
                Total Bottle: {total_items}
              </div>

              <div className=''>
                <button className='btn-primary' type='submit' onClick={() => setModalIsOpen(true)}>Start</button>

                <div className="">
                  <Modal isOpen={modalIsOpen}>
                    <div className='modal_center'>
                      <h2 className='phone_no_label'>Enter Your Phone Number</h2>
                      <input className='text__input_1' type="number" value={inputValue} onChange={handlePhoneNumberChange} />
                      

                       <div className='numbers-container'>
                          {/* <input className='text__input_1' type="text" value={inputValue} onChange={handlePhoneNumberChange}   /> */}
                          <div className='btn-num-group'>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("1")}>1</button>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("2")}>2</button>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("3")}>3</button>
                          </div>
                          <div className='btn-num-group'>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("4")}>4</button>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("5")}>5</button>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("6")}>6</button>
                          </div>
                          <div className='container_3 btn-num-group'>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("7")}>7</button>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("8")}>8</button>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("9")}>9</button>
                          </div>
                          <div>
                            <button className='btn_primary_2' onClick={() => handleClearClick()}>Clear</button>
                            <button className='btn_primary_3' onClick={() => handleNumberClick("0")}>0</button>
                            <button className='btn_primary_2A btn-danger' onClick={() => handleBackspaceClick()}>Delete</button>
                          </div>
                        </div>

                      <div className='btn-container'>
                         <button className='btn-save' onClick={handleSavePhoneNumber}>Save</button>
                        <button className='btn-cancel' onClick={() => setModalIsOpen(false)}>Cancel</button>

                      </div>
                    </div>
                  </Modal>

                </div>
                        
              </div>
            </div>

            <div className="middle">
              <div className="middle__lt">
                <div className='item-1'>
                  <img className='can__bottle' src={bottl_1} alt="item 1" />
                  <span>{metal_total}</span>
                </div>

                <div className="item-2">
                  <img className='pet__bottle' src={bottl_2} alt="item 2" />
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
                  <button className='btn-primary' type='submit' onClick={() => Finish()}>
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
