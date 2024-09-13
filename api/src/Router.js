const express = require('express')
const router = express.Router()

const JobController = require('./controllers/JobController')
const PersonController = require('./controllers/PersonController')
const RealizationController = require('./controllers/RealizationController')
const ComplaintController = require('./controllers/ComplaintController')

// Teste Route
router.get('/', (_req, res) => {
  res.send('Essa é uma rota de teste! A API está funcionando')
})

// Jobs Routes
router.post('/job', JobController.create)
router.get('/job', JobController.index)
router.get('/job/:id', JobController.show)
router.put('/job/:id', JobController.update)

// Person Routes
router.post('/person', PersonController.create)
router.get('/person', PersonController.index)
router.get('/person/:id', PersonController.show)
router.put('/person/:id', PersonController.update)

// Realization Routes
router.post('/realization', RealizationController.create)
router.get('/realization', RealizationController.index)
router.get('/realization/:id', RealizationController.show)
router.put('/realization/:id', RealizationController.update)
router.delete('/realization/:id', RealizationController.deleteRealization)

// Complaint Routes
router.post('/complaint', ComplaintController.create)
router.get('/complaint', ComplaintController.index)
router.get('/complaint/:id', ComplaintController.show)
router.put('/complaint/:id', ComplaintController.update)

module.exports = router