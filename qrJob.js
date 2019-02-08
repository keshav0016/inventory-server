const models = require('./models/index');
const QRCode = require('qrcode')
const path = require('path')


function extractAllQrCode() {
    return models.assets.findAll({})
    .then((result) => {
        result.forEach(asset => {
            console.log(path.resolve('./QR', `${asset.asset_id}.png`));
            QRCode.toFile(path.resolve('./QR', `${asset.asset_id}.png`), asset.asset_id, {}, (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log('done');
                }
            })
        });
    }).catch((err) => {
        console.log(err);
    });
}


extractAllQrCode()