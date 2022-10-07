const router = require('express').Router()

router.get('*', (_req, res) => { res.status(404).send('You are in the middle of nowhere!') })
router.post('*', (_req, res) => { res.status(404).send('You are in the middle of nowhere!') })
router.patch('*', (_req, res) => { res.status(404).send('You are in the middle of nowhere!') })
router.delete('*', (_req, res) => { res.status(404).send('You are in the middle of nowhere!') })

module.exports = router
