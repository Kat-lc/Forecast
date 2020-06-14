import React from 'react';
import ReactDOM from 'react-dom';

export class Jumbotron extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        }
    }

    componentDidMount = () => {
        this.setState({
            isLoaded: true
        })
    }
    
    render() {
        const { error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else if(!this.props.recentForecast) {
            return null;
        } else {
            return (
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">{this.props.city}, {this.props.state}</h1>
                        <img src = "https://i.imgur.com/7dRfqqu.png" height="68"></img>
                        <h3>{this.props.recentForecast.name}</h3>
                        <h2>{this.props.recentForecast.temperature}°F </h2>
                        <p class="lead">{this.props.recentForecast.detailedForecast}</p>
                        <button type="button" class="btn btn-outline-light">Full Forecast</button>
                    </div>
                </div>
            );
        }
    }
};

export default Jumbotron;
