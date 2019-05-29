const models = require('../../models');

/**
 * @description: List of all the visitors with their details.
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */
const listVisitors = async (req, res, next) => {
    try {
        let limit = req.query.limit || 10;
        let offset = req.query.offset;
        const visits = await models.visit.findAll({
          
            include: [
                {
                    model: models.users,
                    attributes: ['first_name', 'last_name'],
                },
                {
                    model: models.Visitor,
                }
            ],
            offset,
            limit,
        });

        res.json({
            visits,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = listVisitors;