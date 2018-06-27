import React, { Component } from 'react';
import { connect } from  'react-redux';
import { createEvent } from '../store/events';

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            start: '',
            end: '',
            description: '',
            day: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDay = this.handleDay.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.createEvent(this.state);
    }

    handleTitle(event) {
        this.setState({title: event.target.value});
    }

    handleStart(event) {
        this.setState({start: event.target.value});
    }

    handleEnd(event) {
        this.setState({end: event.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    handleDay(event) {
        this.setState({day: event.target.value});
    }

    render() {
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
                            <input type="text" value={this.state.start} onChange={this.handleStart} placeholder="Start Time..."/>
                        </label>

                        <label>
                            End Time:
                            <input type="text" value={this.state.end} onChange={this.handleEnd} placeholder="End Time..."/>
                        </label>

                        <label>
                            Description:
                            <input type="text" value={this.state.description} onChange={this.handleDescription} placeholder="Description..."/>
                        </label>

                        <label>
                            Day:
                            <input type="text" value={this.state.day} onChange={this.handleDay} placeholder="Day..."/>
                        </label>

                        <button type="submit">Submit</button>
                    </div>
                </form>
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
    createEvent: (event) => dispatch(createEvent(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
