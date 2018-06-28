import React, { Component } from 'react';
import { getWeather } from './../util';
import '../styles/DailyWeather.css';
const roundTo = require('round-to');

class DailyWeather extends Component {

	constructor(props){
		super(props);
		this.state = {
			value : '',
			loaded : false,
			currentCity : null,
			error: null
		};
		this.handleChange =  this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentWillMount() {
		await fetch("http://ipinfo.io/json")
			.then((response) => {
				if (response.status === 400) {
					throw new Error("Could not find your current location");
				}
				return response.json()}
			)
			.then(data => this.setState({currentCity: data.city}));
		await getWeather(this.state.currentCity).then(data => this.setState({data: data.list}));
		this.setState({loaded : true});
	}

	updateDisplay (city) {
		getWeather(city).then(data => {
			if (data.cod === "404") {
				this.setState({error: `Error... City ${city} is not found. Please try again`});
			} else {
			this.setState({
				error: null,
				data: data.list,
				currentCity: city,
			});
			}
		});
	}
	
	handleChange (event) {
		this.setState({value: event.target.value});
	}

	handleSubmit (event) {
		this.updateDisplay(this.state.value);
    event.preventDefault();
	}

	getDataDisplay() {
		
		var eachDay = [];
		var data = this.state.data;
		for(var i=0, i2=0; i<data.length ; i=i+8) {
			var nextDay = new Date();
			nextDay.setDate(nextDay.getDate() + i2);
			nextDay = (nextDay + "").slice(0, 15);
			var url = "http://openweathermap.org/img/w/" + data[i].weather[0].icon + ".png";
			eachDay.push( 
				<div className="one-day" key={i}>
					{nextDay} 
					<img src={url} alt="" />
					<p> {roundTo(data[i].main.temp - 273.15, 1)}°C </p>
					<div className="text"> {data[i].weather[0].description} </div>
				</div>
			);
			i2++;	
		}
		return eachDay;
	}
	
	render() {

		const form = (
			<form onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Enter City name" value={this.state.value} onChange={this.handleChange} />
				<input type="submit" value="submit" />
			</form>
		);

		return (
			<div className="container">
				{form}
				<div className="display" > Current City Selected : {this.state.currentCity} </div>
				<div className="error"> {this.state.error ? this.state.error : null} </div>
				<div className="display-container">
					{this.state.loaded ? this.getDataDisplay() : null}
				</div>
			</div>
		);
	}
}

export default DailyWeather;