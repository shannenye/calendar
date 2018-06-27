import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import history from './history';
import MonthView from './components/MonthView';
import DayView from './components/DayView';
import { getEvents } from './store/events';

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={ MonthView } />
                    <Route exact path="/:day" component={ DayView } />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        loadEvents: storeState.events
    }
};

const mapDispatchToProps = (dispatch) => ({
    getEvents: () => dispatch(getEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
