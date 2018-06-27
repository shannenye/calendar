import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import AddEvent from './AddEvent';
import { getEvents, createEvent } from '../store/events';

class MonthView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    componentDidMount() {
        this.props.getEvents();
    }

    render() {
        let dayArr = [];
        let set = new Set();

        this.props.loadEvents.map(event => {
            if (!set.has(Number(event.day))) {
                set.add(Number(event.day))
            }
        })

        for (let day = 1; day <= 31; day++) {
            if (set.has(day)) {
                dayArr.push(
                    <li key={day}>
                        <Popup trigger={<button className="day">{day}</button>}>
                            <AddEvent id={day} />
                        </Popup>
                        <div>
                            <Link to={`/${day}`} key={day}>
                                <button className="visibleEvent">
                                    <span className="dot" />
                                    <span className="dot" />
                                    <span className="dot" />
                                </button>
                            </Link>
                        </div>
                    </li>
                )
            } else {
                dayArr.push(
                    <li key={day}>
                        <Popup trigger={<button className="day">{day}</button>}>
                            <AddEvent id={day} />
                        </Popup>
                        <div className="invisibleEvent">
                            <span className="hiddenDot" />
                            <span className="hiddenDot" />
                            <span className="hiddenDot" />
                        </div>
                    </li>
                )
            }
        }

        return (
            <div>
                <div className="month">
                    <ul>
                        <li className="prev">
                            <button>&#10094;</button>
                        </li>
                        <li className="next">
                            <button>&#10095;</button>
                        </li>
                        <li>July 2018</li>
                    </ul>
                </div>

                <ul className="weekdays">
                    <span>
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </span>
                </ul>

                <ul className="days">
                    {
                        dayArr.map(day => day)
                    }
                </ul>
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
    createEvent: (event) => dispatch(createEvent(event)),
    getEvents: () => dispatch(getEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthView);
