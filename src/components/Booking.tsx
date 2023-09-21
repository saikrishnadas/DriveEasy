import { useEffect, useState } from "react";
import "./Booking.css";
import Economy from "../images/car1.png";
import MiniVan from "../images/car2.png";
import Comfort from "../images/car3.png";
import Luxury from "../images/car4.png";
import Electric from "../images/car5.png";

import Cash from "../images/cash.png";
import GooglePay from "../images/google-pay.png";
import Card from "../images/card.png";
import Visa from "../images/visa.png";
import ApplePay from "../images/apple-pay.png";
import { useDispatch, useSelector } from "react-redux";
import { getCoords, getDrivingRoute } from "../features/mapSlice";
import { BaseSearchURL, GeoSearchURL, DrivingURL } from "./Map/MapBoxMap";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

function Booking() {
	let windowHeight = window.innerHeight * 0.78;
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
	const [carType, setCarType] = useState<any | null>(null);
	const [paymentType, setPaymentType] = useState<any | null>(null);
	const [source, setSource] = useState("");
	const [destination, setDestination] = useState("");
	const [addressList, setAddressList] = useState([]);
	const [showSource, setShowSource] = useState(false);
	const [showDestination, setShowDestination] = useState(false);
	const sourceCoords = useSelector((state: any) => state.map.source);
	const destinationCoords = useSelector((state: any) => state.map.destination);
	const distance = useSelector((state: any) => state.map.distance);
	const error = useSelector((state: any) => state.map.error);

	const getSearch = async () => {
		const res = await fetch(
			BaseSearchURL +
				`?q=${source}?language=en&limit=10&session_token=${process.env.REACT_APP_MAPBOX_SESSION_TOKEN}&country=IN&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
			{ headers: { "Content-Type": "application/json" } }
		);
		const data = await res.json();
		// console.log(data.suggestions)
		setAddressList(data.suggestions);
	};

	const getMarkerLocation = async (mapbox_id: any, type: any) => {
		dispatch(getCoords({ mapbox_id, type }));
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			getSearch();
		}, 1000);
		return () => clearTimeout(delayDebounceFn);
	}, [source]);

	useEffect(() => {
		if (sourceCoords && destinationCoords)
			dispatch(getDrivingRoute({ sourceCoords, destinationCoords }));
	}, [sourceCoords, destinationCoords]);

	return (
		<div className="booking-container" style={{ height: windowHeight }}>
			<div className="title" onClick={getSearch}>
				Get a ride
			</div>
			<div className="input-container-main">
				<div className="input-container">
					<span className="icon">🔍</span>
					<input
						type="text"
						className="input-box"
						placeholder="Where From"
						value={source}
						onChange={(e) => setSource(e.target.value)}
						onFocus={() => setShowSource(true)}
					/>
				</div>

				{showSource && addressList && addressList.length > 0 ? (
					<div className="address-box">
						{addressList?.map((item: any, index) => (
							<div
								key={index}
								onClick={() => {
									item.full_address
										? setSource(item.full_address)
										: setSource(item.place_formatted);
									setShowSource(false);
									getMarkerLocation(item?.mapbox_id, "source");
								}}
							>
								{item.full_address ? item.full_address : item.place_formatted}
							</div>
						))}
					</div>
				) : null}

				<div className="input-container">
					<span className="icon">🔍</span>
					<input
						type="text"
						className="input-box"
						placeholder="Where To"
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
						onFocus={() => setShowDestination(true)}
					/>
				</div>

				{showDestination && addressList && addressList.length > 0 ? (
					<div className="address-box" style={{ marginTop: "100px" }}>
						{addressList?.map((item: any, index) => (
							<div
								key={index}
								onClick={() => {
									item.full_address
										? setDestination(item.full_address)
										: setDestination(item.place_formatted);
									setShowDestination(false);
									getMarkerLocation(item?.mapbox_id, "dest");
								}}
							>
								{item.full_address ? item.full_address : item.place_formatted}
							</div>
						))}
					</div>
				) : null}
			</div>
			<div className="car-select">
				<div className="title">Select Car</div>
				<div className="car-container">
					<div
						className={carType === "economy" ? "car-box-selected " : "car-box"}
						onClick={() => setCarType("economy")}
					>
						<img
							src={Economy}
							alt="Logo"
							className={
								carType === "economy" ? "car-image-selected " : "car-image"
							}
						/>
						<div className="car-type">
							<div className="car-type-title">Economy</div>
							<div>INR {Math.round(distance * 0.025)}</div>
						</div>
					</div>
					<div
						className={carType === "minivan" ? "car-box-selected " : "car-box"}
						onClick={() => setCarType("minivan")}
					>
						<img
							src={MiniVan}
							alt="Logo"
							className={
								carType === "minivan" ? "car-image-selected " : "car-image"
							}
						/>
						<div className="car-type">
							<div className="car-type-title">MiniVan</div>
							<div>INR {Math.round(distance * 0.035)}</div>
						</div>
					</div>
					<div
						className={carType === "comfort" ? "car-box-selected " : "car-box"}
						onClick={() => setCarType("comfort")}
					>
						<img
							src={Comfort}
							alt="Logo"
							className={
								carType === "comfort" ? "car-image-selected " : "car-image"
							}
						/>
						<div className="car-type">
							<div className="car-type-title">Comfort</div>
							<div>INR {Math.round(distance * 0.055)}</div>
						</div>
					</div>
					<div
						className={carType === "luxury" ? "car-box-selected " : "car-box"}
						onClick={() => setCarType("luxury")}
					>
						<img
							src={Luxury}
							alt="Logo"
							className={
								carType === "luxury" ? "car-image-selected " : "car-image"
							}
						/>
						<div className="car-type">
							<div>Luxury</div>
							<div>INR {Math.round(distance * 0.085)}</div>
						</div>
					</div>
					<div
						className={carType === "electric" ? "car-box-selected " : "car-box"}
						onClick={() => setCarType("electric")}
					>
						<img
							src={Electric}
							alt="Logo"
							className={
								carType === "electric" ? "car-image-selected " : "car-image"
							}
						/>
						<div className="car-type">
							<div className="car-type-title">Electric</div>
							<div>INR {Math.round(distance * 0.075)}</div>
						</div>
					</div>
				</div>
			</div>

			<div className="payment-select">
				<div className="title">Payment</div>
				<div className="payment-container">
					<div
						className={
							paymentType === "cash" ? "payment-type-selected" : "payment-type"
						}
						onClick={() => setPaymentType("cash")}
					>
						<img src={Cash} alt="Logo" className="payment-image" />
					</div>
					<div
						className={
							paymentType === "googlepay"
								? "payment-type-selected"
								: "payment-type"
						}
						onClick={() => setPaymentType("googlepay")}
					>
						<img src={GooglePay} alt="Logo" className="payment-image" />
					</div>
					<div
						className={
							paymentType === "visa" ? "payment-type-selected" : "payment-type"
						}
						onClick={() => setPaymentType("visa")}
					>
						<img src={Visa} alt="Logo" className="payment-image" />
					</div>
					<div
						className={
							paymentType === "applepay"
								? "payment-type-selected"
								: "payment-type"
						}
						onClick={() => setPaymentType("applepay")}
					>
						<img src={ApplePay} alt="Logo" className="payment-image" />
					</div>
				</div>
			</div>
			{error === true ? (
				<>
					<div style={{ color: "red" }} className="book-button-disabled">
						No Cab Found
					</div>
				</>
			) : (
				<div className="book-button">Book</div>
			)}
		</div>
	);
}

export default Booking;
