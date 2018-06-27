const router = require('express').Router();
const { Events } = require('../db/models');

router.get('/', (req, res, next) => {
    Events.findAll()
        .then(allEvents => res.json(allEvents))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Events.create(req.body)
        .then(createdEvent => res.json(createdEvent))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Events.findById(req.params.id)
        .then(foundEvent => foundEvent.update(req.body))
        .then(updatedEvent => res.json(updatedEvent))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Events.findById(req.params.id)
        .then(foundEvent => foundEvent.destroy())
        .then(() => res.sendStatus(202))
        .catch(next);
});

module.exports = router;