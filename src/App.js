import React from 'react';
import Axios from 'axios';
import './App.css';
import DisplayWeather from './components/DisplayWeather';
import Navbar from './components/Navbar';

class App extends React.Component {
	state = {
		coords: {
			latitude: 45,
			longitude: 60
		},
		data: {},
		inputData: ''
	};

	componentDidMount() {
		// get device location
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let newCoords = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				};

				this.setState({ coords: newCoords });

				Axios.get(
					`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${this.state
						.coords.latitude}, ${this.state.coords.longitude}`
				).then((res) => {
					let weatherData = {
						location: res.data.location.name,
						temperature: res.data.current.temperature,
						description: res.data.current.weather_descriptions[0],
						region: res.data.location.region,
						country: res.data.location.country,
						wind_speed: res.data.current.pressure,
						pressure: res.data.current.pressure,
						precip: res.data.current.humidity,
						img: res.data.current.weather_icons,
						humidity: res.data.current.humidity
					};

					this.setState({ data: weatherData });
				});
			});
		} else {
			console.log('not supported');
		}
	}

	// track the input field
	change = (value) => {
		this.setState({ inputData: value });
	};

	changeWeather = (event) => {
		event.preventDefault();

		// api call
		Axios.get(
			`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${this.state
				.inputData}`
		).then((res) => {
			let weatherData = {
				location: res.data.location.name,
				temperature: res.data.current.temperature,
				description: res.data.current.weather_descriptions[0],
				region: res.data.location.region,
				country: res.data.location.country,
				wind_speed: res.data.current.pressure,
				pressure: res.data.current.pressure,
				precip: res.data.current.humidity,
				img: res.data.current.weather_icons,
				humidity: res.data.current.humidity
			};

			this.setState({ data: weatherData });
		});
	};

	render() {
		return (
			<div className="App">
				<div className="container">
					<Navbar changeWeather={this.changeWeather} changeRegion={this.change} />
					<DisplayWeather weatherData={this.state.data} />
				</div>
			</div>
		);
	}
}

export default App;
