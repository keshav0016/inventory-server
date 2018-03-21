const models = require('../../models/index')

function listAvailables(req,res){
    models.assets.findAll({
        where:{status: 'available'}
    })
    .then(assets=>{
        if(assets){
            models.consumables.findAll({
                where:{status: "available"}
            })
            .then(consumables=>{
                var items = [];
                if(consumables){
                    items.push(assets)
                    items.push(consumables)
                }
               
            })
        }else{
            res.json({
                message: 'assets and consumables not found'
            })
        }
    })
    
}