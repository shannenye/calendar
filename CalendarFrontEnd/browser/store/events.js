import axios from 'axios';

const CREATE = 'CREATE_EVENT';
const GET = 'GET_EVENT';
const UPDATE = 'UPDATE_EVENT';
const REMOVE = 'DELETE_EVENT';
const GETCURRENT = 'GET_CURRENT_EVENT';

const create = event => ({ type: CREATE, event });
const get = events => ({ type: GET, events });
const update = event => ({ type: UPDATE, event });
const remove = id => ({ type: REMOVE, id });
const getCurrent = id => ({ type: GETCURRENT, id});

export default function reducer (events = [], action) {
    switch (action.type) {
        case GET:
            return action.events;
        case CREATE:
            return [action.event, ...events];
        case UPDATE:
            return events.map(event => (
                action.event.id === event.id ? action.event : event
            ));
        case REMOVE:
            return events.filter(event => event.id !== action.id)
        case GETCURRENT:
            return events.filter(event => event.id !== action.id);
        default:
            return events;
    }
}

export const getEvents = () => dispatch => {
    axios.get(`/api/events`)
        .then(res => dispatch(get(res.data)))
        .catch(err => console.error(`Could not retrieve all events`, err))
};

export const getCurrentEvent = (currentEventId) => dispatch => {
    axios.get(`/api/events/${currentEventId}`, currentEventId)
        .then(res => dispatch(getCurrent(res.data)))
        .catch(err => console.error(`Could not get event id ${currentEventId}`, err))
};

export const createEvent = (newEvent) => dispatch => {
    axios.post(`/api/events`, newEvent)
        .then(res => dispatch(create(res.data)))
        .catch(err => console.error(`Could not create current event`, err))
};

export const updateEvent = (currentEventId, updatedEvent) => dispatch => {
    axios.put(`/api/events/${currentEventId}`, updatedEvent)
        .then(res => dispatch(update(res.data)))
        .catch(err => console.error(`Could not update event with ID: ${currentEventId}`, err))
};

export const deleteEvent = (currentEventId) => dispatch => {
    axios.delete(`/api/events/${currentEventId}`)
        .then(() => dispatch(remove(id)))
        .catch(err => console.error(`Could not delete event with ID: ${currentEventId}`, err))
};
