const { expect } = require('chai');
const request = require('supertest');
const { Events } = require('../db/models/index');
const db = require('../db/index');
const app = require('../index');

describe('Events route', () => {
    before('Erase database before you start each test', () => db.sync({ force: true }));
    afterEach('Erase database after each test', () => db.sync({ force: true }));

    const event5 = {
        id: '5',
        title: 'back to work!',
        start: '2018-07-14 13:30:00-04',
        end: '2018-07-14 16:30:00-04',
        description: 'Counting down hours until next snack break :)',
        day: '14'
    };

    const event6 = {
        id: '7',
        title: 'Sleepy day',
        start: '2018-07-23 01:30:00-04',
        end: '2018-07-23 09:30:00-04',
        description: 'Nap. And more naps...',
        day: '23'
    };

    const event7 = {
        id: '8',
        title: 'Munching on snacks again',
        start: '2018-07-23 01:30:00-04',
        end: '2018-07-23 09:30:00-04',
        description: 'snack, then nap. Then busta rap. BOOM',
        day: '23'
    };

    beforeEach('Create an event', () => {
        return Events.create(event5)
            .then(() => {
                return Events.create(event6)
            })
            .then(() => {
                return Events.create(event7)
            });
    });

    describe('GET request for /api/events', () => {
        it('gets all events from the database', () => {
            return request(app)
                .get('/api/events')
                .expect(200)
                .expect(res => expect(res.body.length).to.equal(3));
        });
    });

    describe('POST request for /api/events', () => {
        it('adds an event to the database', () => {
            const event9 = {
                id: '9',
                title: 'doneeeeeee',
                start: '2018-07-26 01:30:00-04',
                end: '2018-07-26 09:30:00-04',
                description: 'Submitting work!',
                day: '26'
            };

            return request(app)
                .post('/api/events')
                .send(event9)
                .expect(200)
                .expect(res => expect(res.body.id).to.equal(9))
        });
    });

    describe('PUT request for /api/events/:id', () => {
        it('updates an event in the database', () => {
            let eventToUpdate = {
                id: '5',
                title: 'FOOOODDDD',
                start: '2018-07-14 10:30:00-04',
                end: '2018-07-14 11:30:00-04',
                description: 'Pizza or ice cream?',
                day: '14'
            };
            return request(app)
                .put('/api/events/5')
                .send(eventToUpdate)
                .expect(200)
        });
    });

    describe('DELETE request for /api/events/:id', () => {
        it('deletes an event in the database', () => {
            return request(app)
                .delete('/api/events/7')
                .expect(202)
        });
    });

});
