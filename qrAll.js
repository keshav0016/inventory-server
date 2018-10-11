const models = require('./models/index');
const QRCode = require('qrcode')

function getAllQr(req, res, next) {
    models.assets.findAll({})
        .then((result) => {
            result.forEach(asset => {
                QRCode.toFile(`./qr/${asset.asset_id}.png`, asset.asset_id.toString())
            });
        }).catch((err) => {
            next(err);
        });

    res.json({
        done: true
    })
}

module.exports = exports = getAllQr;
