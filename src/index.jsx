// @ts-ignore
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
	document.getElementById("root")
);
root.render(
	<React.StrictMode>
		<Auth0Provider
			domain={String(process.env.REACT_APP_DOMAIN)}
			clientId={String(process.env.REACT_APP_CLIENT_ID)}
			redirectUri={window.location.origin}
		>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</Auth0Provider>
	</React.StrictMode>
);
