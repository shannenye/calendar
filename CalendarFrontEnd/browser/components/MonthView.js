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
        let currentMonth = new Date().getMonth() + 1;
        let daysInMonth = new Date(2018, currentMonth, 0).getDate();

        this.props.loadEvents.map(event => {
            if (!set.has(Number(event.day))) {
                set.add(Number(event.day))
            }
        })

        for (let day = 1; day <= daysInMonth; day++) {
            if (set.has(day)) {
                dayArr.push(
                    <li key={day}>
                        <Popup trigger={<button className="day">{day}</button>} modal>
                            {close => (
                                <div className="modal">
                                    <a className="close" onClick={close}>Add Event</a>
                                    <AddEvent id={day} close={close} currentMonth={currentMonth} />
                                </div>
                            )}
                        </Popup>
                            <Link to={`/${day}`} day={day}>
                                <div>
                                    <button className="visibleEvent">
                                        <span className="dot" />
                                        <span className="dot" />
                                        <span className="dot" />
                                    </button>
                                </div>
                            </Link>
                    </li>
                )
            } else {
                dayArr.push(
                    <li key={day}>
                        <Popup trigger={<button className="day">{day}</button>} modal>
                            {close => (
                                <div className="modal">
                                    <a className="close" onClick={close}>Add Event</a>
                                    <AddEvent id={day} close={close} currentMonth={currentMonth} />
                                </div>
                            )}
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
