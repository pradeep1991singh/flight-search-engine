import React, { Component } from 'react';
import moment from 'moment';

// import json
import FLIGHTS from '../store/flights-json'

import FlightDetails from './Flight-details';
import './flights.css';

class Flights extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReturnTrip: true,
      flights: [],
      searchString: []
    };
  }

  componentWillMount() {
    const flights = FLIGHTS;
    this.setState({flights});
  }  

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      this.setState({searchString: state});
      this.setState({isReturnTrip: state.returnTrip});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkFlightAvailability(flight) {
    let searchString = this.state.searchString;
    let isOriginCityFlight = true, 
        isDestinationCItyFlight = true,
        isDepartDateFlight = true,
        isReturnDateFlight = true,
        isFlightWithInPrice = true;

    if (searchString.originCity) {
      isOriginCityFlight = (flight.from.toLowerCase() === searchString.originCity.toLowerCase());
    }

    if (searchString.destinationCity) {
      isDestinationCItyFlight = (flight.to.toLowerCase() === searchString.destinationCity.toLowerCase());
    }

    if (searchString.departureDate) {
      isDepartDateFlight = (flight.depart_date.format("D M YYYY") === searchString.departureDate.format("D M YYYY"));
    }

    if (searchString.returnDate && this.state.isReturnTrip) {
      isReturnDateFlight = (moment(flight.return_trip.depart_date).format("D M YYYY") === moment(searchString.returnDate._d).format("D M YYYY"));
    }

    if (searchString.price) {
      isFlightWithInPrice = (flight.price <= searchString.price.max && flight.price >= searchString.price.min);
    }            

    return isOriginCityFlight &&
           isDestinationCItyFlight &&
           isDepartDateFlight &&
           isReturnDateFlight &&
           isFlightWithInPrice;
  }

  render() {
    let flights = this.state.flights.filter((flight) => {
      flight.depart_date = moment(flight.depart_date);
      flight.return_trip.depart_date = moment(flight.return_trip.depart_date);
      return this.checkFlightAvailability(flight);
    })
    
    let flightList = flights.map((flight) => {
      return <FlightDetails key={flight.id} flight={flight}></FlightDetails>;
    });

    let flightDetails = flights[0];
    if (flightDetails) {
      flightDetails = {
        ...flightDetails,
        depart_day: moment(flightDetails.depart_date).format("Do MMM YYYY"),
        return_day: moment(flightDetails.return_trip.depart_date).format("Do MMM YYYY")
      };    
    }

    return (
      <section className="flights">
        {flightList.length > 0 &&
          <div className="flights__details"> 
            <div>
              { this.state.searchString.price &&
                <h1>
                  <span>{flightDetails.from}</span> &raquo; 
                  <span> {flightDetails.to} </span> 
                  { 
                    this.state.isReturnTrip &&
                    <span> &raquo; {flightDetails.from}</span>
                  }
                </h1>
              }

              { !this.state.searchString.price && 
                <h1>All Flights</h1>
              }

            </div>

            <div className="flight--timings">
              <span>Departure: {flightDetails.depart_day}</span>
              { 
                this.state.isReturnTrip &&              
                <span>Return: {flightDetails.return_day}</span>
              }
            </div>
          </div>
        }

        {
          flightList.length <= 0 && 
          <div>Sorry, No flights for your selection. Please refine your search!</div>
        }

        <div className="flight__container">
          {flightList}
        </div>
      </section>
    );
  }
}

Flights.contextTypes = {
  store: React.PropTypes.object
};

export default Flights;