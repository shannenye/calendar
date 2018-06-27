import React, { Component } from 'react';
import { connect } from  'react-redux';
import { getEvents, updateEvent, deleteEvent } from '../store/events';

class DayView extends Component {

    componentDidMount() {
        this.props.getEvents();
    }

    handleClick(id) {
        this.props.deleteEvent(id)
    }

    render() {
        const currentDay = this.props.match.params.day;

        return (
            <div>
                {this.props.loadEvents.map(event => {
                    if (event.day === currentDay) {
                        return (
                            <div className="allEvents">
                                <li>{event.title}</li>
                                <li>{event.start}</li>
                                <li>{event.end}</li>
                                <li>{event.description}</li>
                                <button className="deleteButton" onClick={() => this.handleClick(event.id)}>Delete Event</button>
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
