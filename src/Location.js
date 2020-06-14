import React from 'react';
import ReactDOM from 'react-dom';
import Jumbotron from './Jumbotron';

export class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lon: null,
            city: null,
            state: null,
            error: null,
            isLoaded: false,
            recentForecast: null,
            periods: []
        };

    }

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(this.setPosition);
    }

    setPosition = (location) => {
        this.setState({
            isLoaded: true,
            lat: location.coords.latitude,
            lon: location.coords.longitude
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.lat !== prevState.lat && this.state.lon !== prevState.lon) {
            let url = `https://api.weather.gov/points/${this.state.lat},${this.state.lon}`
            fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    var forecastURL = result.properties.forecast
                    this.setState({
                        isLoaded: true,
                        city: result.properties.relativeLocation.properties.city,
                        state: result.properties.relativeLocation.properties.state
                    })
                    return fetch(forecastURL)
                })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        periods: result.properties.periods
                    });
                })
        } 
    }

    render() {
        const periods = this.state.periods;
        return (
            <div className="forecast">
                <Jumbotron recentForecast={this.state.periods[0]} city={this.state.city} state={this.state.state}/>
                <ul>
                    {periods.map(item => (
                        <li key={item.number}>
                            {item.name} {item.temperature} {item.shortForecast}
                        </li>
                    ))}
                </ul>
            </div>
        
        );
        }
};

export default Location;
