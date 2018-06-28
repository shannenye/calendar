import axios from 'axios';

const CREATE = 'CREATE_EVENT';
const GET = 'GET_EVENT';
const UPDATE = 'UPDATE_EVENT';
const REMOVE = 'DELETE_EVENT';

const create = event => ({ type: CREATE, event });
const get = events => ({ type: GET, events });
const update = event => ({ type: UPDATE, event });
const remove = id => ({ type: REMOVE, id });

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
        default:
            return events;
    }
}

export const getEvents = () => dispatch => {
    axios.get(`/api/events`)
        .then(res => dispatch(get(res.data)))
        .catch(err => console.error(`Could not retrieve all events`, err))
};

export const createEvent = (newEvent) => dispatch => {
    axios.post(`/api/events`, newEvent)
        .then(res => dispatch(create(res.data)))
        .catch(err => console.error(`Could not create current event`, err))
};

export const updateEvent = (currentEventId, currentEvent) => dispatch => {
    axios.put(`/api/events/${currentEventId}`, currentEvent)
        .then(res => dispatch(update(res.data)))
        .catch(err => console.error(`Could not update event with ID: ${currentEventId}`, err))
};

export const deleteEvent = (id) => dispatch => {
    axios.delete(`/api/events/${id}`)
        .then(() => dispatch(remove(id)))
        .catch(err => console.error(`Could not delete event with ID: ${id}`, err))
};
