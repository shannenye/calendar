import React, { Component } from 'react';
import { connect } from  'react-redux';
import { createEvent } from '../store/events';

class AddEvent extends Component {
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

    handleSubmit(event) {
        event.preventDefault();
        const currentDay = this.props.id;
        const currentMonth = this.props.currentMonth;
        const startHour = this.state.startHour;
        const startMinutes = Number(this.state.startMinutes);
        const endHour = this.state.endHour;
        const endMinutes = Number(this.state.endMinutes);
        const startTime = new Date(2018, currentMonth - 1, currentDay, startHour - 4, startMinutes);
        const endTime = new Date(2018, currentMonth - 1, currentDay, endHour - 4, endMinutes);

        this.props.createEvent({
            title: this.state.title,
            start: startTime,
            end: endTime,
            description: this.state.description,
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
                        <div>
                        <label>
                            Event Name:
                            <input type="text" value={this.state.title} onChange={this.handleTitle} placeholder="Event Name..." required />
                        </label>
                        </div>

                        <div>
                        <label>
                            Start Time:
                            <select value={this.state.startHour} onChange={this.handleStartHour}>
                                {
                                    startHourArr.map(hour => hour)
                                }
                            </select>
                            <select value={this.state.startMinutes} onChange={this.handleStartMinute}>
                                {
                                    startMinutesArr.map(minutes => minutes)
                                }
                            </select>
                        </label>
                        </div>

                        <div>
                        <label>
                            End Time:
                            <select value={this.state.endHour} onChange={this.handleEndHour}>
                                {
                                    endHourArr.map(hour => hour)

                                }
                            </select>
                            <select value={this.state.endMinutes} onChange={this.handleEndMinute}>
                                {
                                    endMinutesArr.map(minutes => minutes)
                                }
                            </select>
                        </label>
                        </div>

                        <div>
                        <label>
                            Description:
                            <input type="text" value={this.state.description} onChange={this.handleDescription} placeholder="Description..." />
                        </label>
                        </div>

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
        currentMonth: ownProps.currentMonth
    }
};

const mapDispatchToProps = dispatch => ({
    createEvent: (event) => dispatch(createEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
