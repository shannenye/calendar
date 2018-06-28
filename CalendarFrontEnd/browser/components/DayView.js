import React, { Component } from 'react';
import { connect } from  'react-redux';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { getEvents, updateEvent, deleteEvent } from '../store/events';
import UpdateEvent from './UpdateEvent';

class DayView extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.getEvents();
    }

    render() {
        const currentDay = this.props.match.params.day;

        return (
            <div>
                <Link to={`/`}>
                    <div>
                        <button className="back">Go Back</button>
                    </div>
                </Link>
                {this.props.loadEvents.map(event => {
                    if (currentDay == event.day) {
                        return (
                            <div key={currentDay} className="allEvents">
                                <li key={event.id}>Event ID: {event.id}</li>
                                <li key={event.title}>Event Name: {event.title}</li>
                                <li key={event.start}>Start Time: {event.start}</li>
                                <li key={event.end}>End Time: {event.end}</li>
                                <li key={event.description}>Description: {event.description}</li>
                                <button className="deleteButton" onClick={() => this.props.deleteEvent(event.id)}>Delete Event</button>
                                <Popup trigger={<button className="event">Update Event</button>} modal>
                                    {close => (
                                        <div className="modal">
                                            <a className="close" onClick={close}>Enter Updated Info</a>
                                            <UpdateEvent id={currentDay} eventID={event.id} close={close}/>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        loadEvents: storeState.events
    }
};

const mapDispatchToProps = dispatch => ({
    getEvents: () => dispatch(getEvents()),
    updateEvent: (id, currentEvent) => dispatch(updateEvent(id, currentEvent)),
    deleteEvent: (id) => dispatch(deleteEvent(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DayView);
