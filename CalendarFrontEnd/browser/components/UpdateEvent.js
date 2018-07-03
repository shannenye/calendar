import React, { Component } from 'react';
import { connect } from  'react-redux';
import { updateEvent, getCurrentEvent } from '../store/events';

class UpdateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startHour: '',
            startMinutes: '',
            endHour: '',
            endMinutes: '',
            title: '',
            start: '',
            end: '',
            description: '',
            day: this.props.id
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleEndMinute = this.handleEndMinute.bind(this);
        this.handleEndHour = this.handleEndHour.bind(this);
        this.handleStartHour = this.handleStartHour.bind(this);
        this.handleStartMinute = this.handleStartMinute.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDay = this.handleDay.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentEvent(this.props.loadCurrentEvent.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const currentDay = this.props.id;
        const currentMonth = 7;
        const currentEvent = this.props.loadCurrentEvent;
        const currentEventStartDetails = new Date(currentEvent.start);
        const currentEventEndDetails = new Date(currentEvent.end);
        const startHour = this.state.startHour ? this.state.startHour : `${currentEventStartDetails.getHours() + 4}`;
        const startMinutes = Number(this.state.startMinutes ? this.state.startMinutes : currentEventStartDetails.getMinutes());
        const endHour = this.state.endHour ? this.state.endHour : `${currentEventEndDetails.getHours() + 4}`;
        const endMinutes = Number(this.state.endMinutes ? this.state.endMinutes : currentEventEndDetails.getMinutes());
        const startTime = new Date(2018, currentMonth - 1, currentDay, startHour - 4, startMinutes);
        const endTime = new Date(2018, currentMonth - 1, currentDay, endHour - 4, endMinutes);

        this.props.updateEvent(currentEvent.id, {
            title: this.state.title ? this.state.title : currentEvent.title,
            start: startTime ? startTime : currentEvent.start,
            end: endTime ? endTime : currentEvent.end,
            description: this.state.description ? this.state.description : currentEvent.description,
            day: currentDay
        });
        this.props.close();
    }

    handleTitle(event) {
        this.setState({title: event.target.value});
    }

    handleStartHour(hour) {
        this.setState({startHour: hour.target.value});
    }

    handleStartMinute(minutes) {
        this.setState({startMinutes: minutes.target.value});
    }

    handleEndHour(hour) {
        this.setState({endHour: hour.target.value});
    }

    handleEndMinute(minutes) {
        this.setState({endMinutes: minutes.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    handleDay(event) {
        this.setState({day: event.target.value});
    }

    render() {
        const startHourArr = [];
        const startMinutesArr = [];
        const endHourArr = [];
        const endMinutesArr = [];

        for (let hour = 1; hour <= 24; hour++) {
            startHourArr.push(
                <option value={hour} key={hour}>{hour}</option>
            );
            endHourArr.push(
                <option value={hour} key={hour}>{hour}</option>
            );
        }
        for (let minutes = 0; minutes <= 45; minutes += 15) {
            startMinutesArr.push(
                <option value={minutes} key={minutes}>{minutes}</option>
            );
            endMinutesArr.push(
                <option value={minutes} key={minutes}>{minutes}</option>
            );
        }
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} className="form-content">
                    <div className="form-container">

                        <label>
                            Event Name:
                            <input type="text" value={this.state.title} onChange={this.handleTitle} placeholder="Event Name..." />
                        </label>



                        <label>
                            Start Time:
                            <select value={this.state.startHour} onChange={this.handleStartHour}>
                                <option className="holder">Hour</option>
                                {
                                    startHourArr.map(hour => hour)
                                }
                            </select>

                            <select value={this.state.startMinutes} onChange={this.handleStartMinute}>
                                <option className="holder">Minutes</option>
                                {
                                    startMinutesArr.map(minutes => minutes)
                                }
                            </select>
                        </label>



                        <label>
                            End Time:
                            <select value={this.state.endHour} onChange={this.handleEndHour}>
                                <option className="holder">Hour</option>
                                {
                                    endHourArr.map(hour => hour)

                                }
                            </select>
                            <select value={this.state.endMinutes} onChange={this.handleEndMinute}>
                                <option className="holder">Minutes</option>
                                {
                                    endMinutesArr.map(minutes => minutes)
                                }
                            </select>
                        </label>


                        <label>
                            Description:
                            <input type="text" value={this.state.description} onChange={this.handleDescription} placeholder="Description..." />
                        </label>


                        <button type="submit">Submit</button>
                        <button type="cancel" onClick={() => this.props.close()}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (storeState, ownProps) => {
    return {
        loadEvents: storeState.events,
        currentMonth: ownProps.currentMonth,
        loadCurrentEvent: ownProps.event
    }
};

const mapDispatchToProps = dispatch => ({
    updateEvent: (currentEventId, updatedEvent) => dispatch(updateEvent(currentEventId, updatedEvent)),
    getCurrentEvent: (currentEventId) => dispatch(getCurrentEvent(currentEventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent);
