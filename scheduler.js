const xlsx = require('node-xlsx')
var later = require('later');
const sgMail = require('@sendgrid/mail');
const fs = require('fs')
const models = require('./models/index')

sgMail.setApiKey('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');

var totalConsumableCount;
var consumablePendingCount;
var consumableAcceptedCount;
var consumableRejectedCount;
var totalAssetCount;
var assetPendingCount;
var assetAcceptedCount;
var assetRejectedCount;
var assetDetails1 = [];
var consumableDetails1 = [];

// var sched = later.parse.recur().every(10).second(),
var sched = later.parse.recur().on(17).hour().onWeekday(),
t = later.setInterval(itemStatusReportEmail,sched);
var limitDate = new Date(Number(new Date()) - (24*60*60*1000))

function itemStatusReportEmail(){
    models.ticket.count({where: {item_type : 'consumables', createdAt : {gt : limitDate}}})
    .then(totalConsumable => {
        totalConsumableCount = totalConsumable;
        return models.ticket.count({ where: {item_type : 'consumables', status : 'Pending', createdAt : {gt : limitDate}}})
    })
    .then(pending => {
        consumablePendingCount = pending;
        return models.ticket.count({where: {item_type : 'consumables', status : 'Accepted', createdAt : {gt : limitDate}}})
    })
    .then(accepted => {
        consumableAcceptedCount = accepted;
        return models.ticket.count({where: {item_type : 'consumables', status : 'Rejected', createdAt : {gt : limitDate}}})
    })
    .then(rejected =>{
        consumableRejectedCount = rejected;
        return models.ticket.count({ where: {item_type : 'assets', createdAt : {gt : limitDate}}})
    })
    .then(totalAsset => {
        totalAssetCount = totalAsset;
        return models.ticket.count({where: {item_type : 'assets', status : 'Pending', createdAt : {gt : limitDate}}})
    })
    .then(pending => {
        assetPendingCount = pending;
        return models.ticket.count({where: {item_type : 'assets', status : 'Accepted', createdAt : {gt : limitDate}}})
    })
    .then(accepted => {
        assetAcceptedCount = accepted;
        return models.ticket.count({where: {item_type : 'assets', status : 'Rejected', createdAt : {gt : limitDate}}})
    })
    .then(rejected =>{
        assetRejectedCount = rejected;
        return models.ticket.findAll({include : [{ model : models.users, attributes : ['first_name','last_name']}],where : {item_type : 'assets', createdAt : {gt : limitDate}}, attributes: ['requested_asset_item','status']})
    })
    .then(assetDetails => {
        assetDetails1.push(...assetDetails)
        return models.ticket.findAll({include : [{ model : models.users, attributes : ['first_name','last_name']}],where : {item_type : 'consumables', createdAt : {gt : limitDate}}, attributes: ['requested_consumable_item','status']})
    })
    .then(consumableDetails => {
        consumableDetails1.push(...consumableDetails)

        var Total = [[
            "Item","Total number of requests","No of accepted requests","No of rejected requests","No of pending requests"
        ],
        [
            "Assets",totalAssetCount,assetAcceptedCount,assetRejectedCount,assetPendingCount
        ],
        [
            "Consumables",totalConsumableCount,consumableAcceptedCount,consumableRejectedCount,consumablePendingCount
        ]];

        if(assetDetails1.length === 0){
            var Asset = [[
                "Employee Name","Requested Item","Status"
            ]]
        }
        else if(assetDetails1.length !== 0){
            var Asset = [[
                "Employee Name","Requested Item","Status"
            ]]
            assetDetails1.map(element => {
                return Asset.push([`${element.user.first_name} ${element.user.last_name}`,`${element.requested_asset_item}`,`${element.status}`])
            })
        }

        if(consumableDetails1.length === 0){
            var Consumables = [[
                "Employee Name","Requested Item","Status"
            ]]
        }
        else if(consumableDetails1 !== 0){
            var Consumables = [[
                "Employee Name","Requested Item","Status"
            ]]
            consumableDetails1.map(element => {
                return Consumables.push([`${element.user.first_name} ${element.user.last_name}`,`${element.requested_consumable_item}`,`${element.status}`])
            })
        }


        var buffer = xlsx.build([{name:'Total',data:Total},{name:'Assets',data:Asset},{name:'Consumables',data:Consumables}]);
        fs.writeFileSync('report.xlsx',buffer,'binary');
        let filename='./report.xlsx'
        let bitmap = fs.readFileSync(filename);
        imageBase64URL = new Buffer(bitmap).toString('base64');
        const msg = {
            to: 'keshav.b@westagilelabs.com',
            from: 'emmanuel.b@westagilelabs.com',
        subject: 'Daily resource request report.',
        text: 'Daily resource request report.',
        attachments: [
            {
              content: imageBase64URL,
              filename: 'item-report.xlsx',
              type: 'plain/xlsx',
              disposition: 'attachment',
              contentId: 'mytext'
            },
          ]
        };
        return sgMail.send(msg)
    })
    .then(()=>{
        fs.unlinkSync('./report.xlsx')
        console.log('mail sent')
    })
    .catch(error => {
        console.log(error)
    })
}