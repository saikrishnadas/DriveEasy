import { useEffect, useState } from 'react'
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

const BaseSearchURL = `https://api.mapbox.com/search/searchbox/v1/suggest`


function Booking() {
    let windowHeight = window.innerHeight * 0.78;
    const [carType, setCarType] = useState();
    const [paymentType, setPaymentType] = useState();
    const [source, setSource] = useState();
    const [addressList, setAddressList] = useState([]);

    const getSearch = async () => {
        const res = await fetch(BaseSearchURL + `?q=${source}?language=en&limit=1&session_token=${process.env.REACT_APP_MAPBOX_SESSION_TOKEN}&country=IN&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`, { headers: { "Content-Type": "application/json" } })
        const data = await res.json();
        // console.log(data.suggestions)
        setAddressList(data.suggestions)
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getSearch();
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [source])

    return (
        <div className='booking-container' style={{ height: windowHeight }}>
            <div className='title' onClick={getSearch}>
                Get a ride
            </div>
            <div className='input-container-main'>
                <div className="input-container">
                    <span className="icon">🔍</span>
                    <input type="text" className='input-box' placeholder='Where From' value={source} onChange={(e) => setSource(e.target.value)} />
                </div>

                {addressList ? <div>
                    {addressList?.map((item, index) => (
                        <h2 key={index}>{item.full_address}</h2>
                    ))}
                </div> : null}

                <div className="input-container">
                    <span className="icon">🔍</span>
                    <input type="text" className='input-box' placeholder='Where To' />
                </div>
            </div>
            <div className='car-select'>
                <div className='title'>
                    Select Car
                </div>
                <div className='car-container'>
                    <div className={carType === 'economy' ? 'car-box-selected ' : 'car-box'} onClick={() => setCarType('economy')}>
                        <img src={Economy} alt="Logo" className={carType === 'economy' ? 'car-image-selected ' : 'car-image'} />
                        <div className='car-type'>
                            <div className='car-type-title'>Economy</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                    <div className={carType === 'minivan' ? 'car-box-selected ' : 'car-box'} onClick={() => setCarType('minivan')}>
                        <img src={MiniVan} alt="Logo" className={carType === 'minivan' ? 'car-image-selected ' : 'car-image'} />
                        <div className='car-type'>
                            <div className='car-type-title'>MiniVan</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                    <div className={carType === 'comfort' ? 'car-box-selected ' : 'car-box'} onClick={() => setCarType('comfort')}>
                        <img src={Comfort} alt="Logo" className={carType === 'comfort' ? 'car-image-selected ' : 'car-image'} />
                        <div className='car-type'>
                            <div className='car-type-title'>Comfort</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                    <div className={carType === 'luxury' ? 'car-box-selected ' : 'car-box'} onClick={() => setCarType('luxury')}>
                        <img src={Luxury} alt="Logo" className={carType === 'luxury' ? 'car-image-selected ' : 'car-image'} />
                        <div className='car-type'>
                            <div>Luxury</div>
                            <div>26.01$</div>
                        </div>
                    </div>
                    <div className={carType === 'electric' ? 'car-box-selected ' : 'car-box'} onClick={() => setCarType('electric')}>
                        <img src={Electric} alt="Logo" className={carType === 'electric' ? 'car-image-selected ' : 'car-image'} />
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
                    <div className={paymentType === 'cash' ? 'payment-type-selected' : 'payment-type'} onClick={() => setPaymentType('cash')}>
                        <img src={Cash} alt="Logo" className='payment-image' />

                    </div>
                    <div className={paymentType === 'googlepay' ? 'payment-type-selected' : 'payment-type'} onClick={() => setPaymentType('googlepay')}>
                        <img src={GooglePay} alt="Logo" className='payment-image' />

                    </div>
                    <div className={paymentType === 'visa' ? 'payment-type-selected' : 'payment-type'} onClick={() => setPaymentType('visa')}>
                        <img src={Visa} alt="Logo" className='payment-image' />

                    </div>
                    <div className={paymentType === 'applepay' ? 'payment-type-selected' : 'payment-type'} onClick={() => setPaymentType('applepay')}>
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
