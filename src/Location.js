import React from 'react';
import Jumbotron from './Jumbotron';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';


/**
 * The Location component defined below is called in the render of App.js.
 * The purpose of this component is to render a view displaying the
 * weather information from wherever the user is viewing the web app from.
 * It queries the user's geolocation data, from that data pulls a code, 
 * queries the National Weather Service API for the forecast related to
 * that grid code, and then renders it using react-bootstrap components.
 */
export class Location extends React.Component {
    //The constructor initializes the data in this.state
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

    //The location is set here and calls set position to be the
    //argument of the calling geolocation function
    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(this.setPosition);
    }

    //The setPosition function stores the geolocation data
    //as a data member of the calling object, which was possible
    //due to the binding lambda syntax used on componentDidMount()
    setPosition = (location) => {
        this.setState({
            isLoaded: true,
            lat: location.coords.latitude,
            lon: location.coords.longitude
        });
    }


    /*
     * The method of chaining fetch calls implemented in the below componenetDidUpdate()
     * function where motivated by the selected answer to this link:
     * https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript  
     * If the latitude and longitude coordinates need updating after comparison to the 
     * previous state, two AJAX calls are preformed in a chain. PrevProps and PrevStates 
     * are both required in order to prevent this from method from infinitely looping, which 
     * happens when setState is called within this method without a conditional. 
     * The first fetch grabs the forecast URL and sets the city and state values. 
     * Then the. second fetch uses that forecast URL to grab the forecast "periods
     */
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
                },
                (error) => {
                    this.setState({
                      isLoaded: true,
                      error
                    });
                })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        periods: result.properties.periods
                    });
                },
                (error) => {
                    this.setState({
                      isLoaded: true,
                      error
                    });
                })
        } 
    }

    /*
     * The render method checks if an error occurred, if it did, then it returns
     * the appropriate error message, otherwise, it will message the user that it
     * loading until it returns a div containing a Bootstrap Jumbotron and a Table 
     * with Image components embedded. It dynamically renders the table by mapping
     * over each data entry and rendering the relevant particibles using JSX.
    */
    render() {
        const { error, isLoaded, periods} = this.state;

        if(error) { 
            return <div>Error: {error.message}</div>;
        } else if(!isLoaded) { 
            return <div>Loading...</div>;
        } else {
            return (
                <div className="forecast">
                <Jumbotron recentForecast={this.state.periods[0]} city={this.state.city} state={this.state.state}/>
        <Table  className="location" striped bordered hover responsive size="sm">
        <tbody>
          {
            periods.map(item => (
              <tr key={item.number}>
                <td><Image  src={item.icon} fluid /></td>
                <td><p>{item.name}</p></td>
                <td><p>{item.shortForecast}</p></td>
                <td><p>{item.temperature}</p></td>
                <td><p>{item.windSpeed}</p></td>
                <td><p>{item.windDirection}</p></td>
              </tr>
            ))}
        </tbody>
      </Table>
            </div>
            );
        }
    }

};

export default Location;
