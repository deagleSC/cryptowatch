import React from "react";
import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {

// Setting up the initial states using
// react hook 'useState'
const [search, setSearch] = useState("");
const [crypto, setCrypto] = useState([]);

// Fetching crypto data from the API only
// once when the component is mounted
useEffect(() => {
	Axios.get(
`https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`
	).then((res) => {
	setCrypto(res.data.coins);
	});
}, []);

return (
	<div className="App container-fluid">
	<h1>CryptoWatch</h1>
	<input 
    className="form-control"
		type="text"
		placeholder="Search..."
		onChange={(e) => {
		setSearch(e.target.value);
		}}
	/>
	<table className="table-responsive container-fluid">
		<thead>
		<tr className="col">
			<td><b>Rank</b></td>
			<td><b>Name</b></td>
			<td><b>Symbol</b></td>
			<td><b>Market Cap</b></td>
			<td><b>Price</b></td>
			<td><b>Available Supply</b></td>
			<td><b>Volume (24hrs)</b></td>
		</tr>
		</thead>
		{/* Mapping all the cryptos */}
		<tbody>
		{/* Filtering to check for the searched crypto */}
		{crypto
			.filter((val) => {
			return val.name.toLowerCase().includes(search.toLowerCase());
			})
			.map((val, id) => {
			return (
				<>
				<tr id={id} className="col">
					<td className="rank">{val.rank}</td>
					<td className="logo">
					<a href={val.websiteUrl}>
						<img src={val.icon} alt="logo" width="30px" />
					</a>
					
<p>{val.name}</p>

					</td>
					<td className="symbol">{val.symbol}</td>
					<td>₹{val.marketCap}</td>
					<td>₹{val.price.toFixed(2)}</td>
					<td>{val.availableSupply}</td>
					<td>{Number(val.volume).toFixed(0)}</td>
				</tr>
				</>
			);
			})}
		</tbody>
	</table>
	</div>
);
}

export default App;
