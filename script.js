const db = require('./CalendarBackend/db/db');
const { User } = require('./CalendarBackend/db/models/index')
const { Events } = require('./CalendarBackend/db/models/index')

const users = [
    {
        name: 'Shannen',
        password: 'spotify'
    }
];

const events = [
    {
        id: '1',
        title: 'phone interview',
        start: '2018-07-04 01:30:00-04',
        end: '2018-07-04 06:45:00-04',
        description: 'Awaiting phone call!',
        day: '4'
    },
    {
        id: '2',
        title: 'coding challenge',
        start: '2018-07-10 01:30:00-04',
        end: '2018-07-10 06:30:00-04',
        description: 'Passing the coding challenge WOOOOO',
        day: '10'
    },
    {
        id: '3',
        title: 'second round',
        start: '2018-07-14 01:30:00-04',
        end: '2018-07-14 09:30:00-04',
        description: 'Starting second round!',
        day: '14'
    },
    {
        id: '4',
        title: 'taking a snack break',
        start: '2018-07-14 10:30:00-04',
        end: '2018-07-14 11:30:00-04',
        description: 'Burgers and fries are a girls best friend...and ice cream',
        day: '14'
    },
    {
        id: '5',
        title: 'back to work!',
        start: '2018-07-14 13:30:00-04',
        end: '2018-07-14 16:30:00-04',
        description: 'Counting down hours until next snack break :)',
        day: '14'
    },
    {
        id: '7',
        title: 'Sleepy day',
        start: '2018-07-23 01:30:00-04',
        end: '2018-07-23 09:30:00-04',
        description: 'Nap. And more naps...',
        day: '23'
    },
    {
        id: '8',
        title: 'Munching on snacks again',
        start: '2018-07-23 01:30:00-04',
        end: '2018-07-23 09:30:00-04',
        description: 'snack, then nap. Then busta rap. BOOM',
        day: '23'
    },
    {
        id: '9',
        title: 'doneeeeeee',
        start: '2018-07-26 01:30:00-04',
        end: '2018-07-26 09:30:00-04',
        description: 'Submitting work!',
        day: '26'
    }
];

const seed = () => {
    return User.bulkCreate(users)
        .then(() => Events.bulkCreate(events));
};

seed()
    .then(() => process.exit);
