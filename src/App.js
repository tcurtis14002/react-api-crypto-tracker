import { React, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
	const api =
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios.get(api).then((response) => {
			setCoins(response.data);
		});
	}, []);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className='coin-app'>
			<div className='coin-search'>
				<h1 className='coin-text'>Search a currency</h1>
				<form>
					<input
						type='text'
						placeholder='Search'
						className='coin-input'
						onChange={handleChange}
					/>
				</form>
			</div>
			{filteredCoins.map((coin) => {
				return (
					<Coin
						key={coin.id}
						name={coin.name}
						price={coin.current_price}
						priceChange={coin.price_change_percentage_24h}
						image={coin.image}
						symbol={coin.symbol}
						volume={coin.total_volume}
						marketCap={coin.market_cap}
					/>
				);
			})}
		</div>
	);
}

export default App;
