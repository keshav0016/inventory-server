const router = require('express').Router()
const QRCode = require('qrcode')


function qrCodeHandler(req, res, next){
    res.append('content-type', 'image/png')
    QRCode.toFileStream(res, req.query.text)
}




// router.get('/qr', qrCodeHandler)

module.exports = exports = qrCodeHandler