import React from 'react'
import "./Booking.css";
import Economy from "../images/car1.png";
import MiniVan from "../images/car2.png";
import Comfort from "../images/car3.png";
import Luxury from "../images/car4.png";
import Electric from "../images/car5.png";

import Cash from "../images/cash.png"
import GooglePay from "../images/google-pay.png"
import Card from "../images/card.png"
import Visa from "../images/visa.png"
import ApplePay from "../images/apple-pay.png"

function Booking() {
    let windowHeight = window.innerHeight * 0.78;
    return (
        <div className='booking-container' style={{ height: windowHeight }}>
            <div className='title'>
                Get a ride
            </div>
            <div className='input-container-main'>
                <div class="input-container">
                    <span class="icon">🔍</span>
                    <input type="text" className='input-box' placeholder='Where From' />
                </div>

                <div class="input-container">
                    <span class="icon">🔍</span>
                    <input type="text" className='input-box' placeholder='Where To' />
                </div>
            </div>
            <div className='car-select'>
                <div className='title'>
                    Select Car
                </div>
                <div className='car-container'>
                    <div className='car-box'>
                        <img src={Economy} alt="Logo" className='car-image' />
                        <div className='car-type'>
                            <div className='car-type-title'>Economy</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                    <div className='car-box'>
                        <img src={MiniVan} alt="Logo" className='car-image' />
                        <div className='car-type'>
                            <div className='car-type-title'>MiniVan</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                    <div className='car-box'>
                        <img src={Comfort} alt="Logo" className='car-image' />
                        <div className='car-type'>
                            <div className='car-type-title'>Comfort</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                    <div className='car-box'>
                        <img src={Luxury} alt="Logo" className='car-image' />
                        <div className='car-type'>
                            <div>Luxury</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                    <div className='car-box'>
                        <img src={Electric} alt="Logo" className='car-image' />
                        <div className='car-type'>
                            <div className='car-type-title'>Electric</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='payment-select'>
                <div className='title'>
                    Payment
                </div>
                <div className='payment-container'>
                    <div className='payment-type'>
                        <img src={Cash} alt="Logo" className='payment-image' />

                    </div>
                    <div className='payment-type'>
                        <img src={GooglePay} alt="Logo" className='payment-image' />

                    </div>
                    <div className='payment-type'>
                        <img src={Visa} alt="Logo" className='payment-image' />

                    </div>
                    <div className='payment-type'>
                        <img src={ApplePay} alt="Logo" className='payment-image' />

                    </div>
                </div>
            </div>

            <div className='book-button'>
                Book
            </div>
        </div >
    )
}

export default Booking