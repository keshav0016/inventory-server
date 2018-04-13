const models = require('../../models/index')
const router = require('express').Router()

function rejectAssetHandler(req, res, next){
    models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})
    .then(ticket => {
        ticket.status = 'Rejected'
        ticket.reason = req.body.reason
        return ticket.save()
    })
    .then(ticket => {
        res.json({
            message : "Ticket Rejected"
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Ticket could not be rejected"
        })
    })
}






router.post('/reject', rejectAssetHandler)

module.exports = exports = router