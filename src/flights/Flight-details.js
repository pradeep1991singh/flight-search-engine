import React, { Component } from 'react';
import moment from 'moment';
import './flights.css'

class FlightDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReturnTrip: true,
      bookingText: 'Book this flight'
    }
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (this.refs.flightRef) {
        this.setState({isReturnTrip: state.returnTrip});
      }
    });
  }  

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let flight = this.props.flight;
    flight.depart_time = moment(flight.depart_date).format("hh:mm A");
    flight.arrive_time = moment(flight.arrive_date).format("hh:mm A");

    let returnTrip = flight.return_trip;
    returnTrip.depart_time = moment(returnTrip.depart_date).format("hh:mm A");
    returnTrip.arrive_time = moment(returnTrip.arrive_date).format("hh:mm A");    

    return (
      <div className="flight" ref="flightRef">
        <div className="flight__details">
          <h3 className="flight__price">₹ {flight.price}</h3>

          <div className="flight__timings">
            <div className="flight__departure">
              <p className="flight__number">{flight.number.toUpperCase()}</p>
              <p className="flight__codes">{flight.from_code} &raquo; {flight.to_code}</p>
              <p className="flight__depart__time">Depart: {flight.depart_time}</p>
              <p className="flight__arrive__time">Arrive: {flight.arrive_time}</p>
            </div>

            { 
              this.state.isReturnTrip &&
              <div className="flight__return">
                <p className="flight__number">{returnTrip.number.toUpperCase()}</p>
                <p className="flight__codes">{returnTrip.from_code} &raquo; {returnTrip.to_code}</p>
                <p className="flight__depart__time">Depart: {returnTrip.depart_time}</p>
                <p className="flight__arrive__time">Arrive: {returnTrip.arrive_time}</p>
              </div>
            }
          </div>

        </div>

        <div className="flight__logo">
          <div className={`airline ${flight.airline_code}`}></div>
          <button 
            className="booking--button"
            onClick={() => this.setState({bookingText: 'Booked'})}>
            {this.state.bookingText}
          </button>
        </div>
      </div>      
    )
  }
 }

FlightDetails.contextTypes = {
  store: React.PropTypes.object
}; 

export default FlightDetails;