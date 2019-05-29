const models = require('../../models');

/**
 * @description: List of all the visitors associated with the employee.
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */
const listVisitors = async (req, res, next) => {
    try {
        let limit = req.query.limit || 10;
        let offset = req.query.offset;
        const  employeeVisits = await models.visit.findAll({
                include: [
                    {
                        model: models.users,
                        attributes: ['first_name', 'last_name'],
                       
                    },
                    {
                        model: models.Visitor,
                    },
                ],
                where: {
                    employeeId: req.params.employeeId,
                },
            
            required: true,
            offset,
            limit,
        });
        return res.json({
            employeeVisits,
        })
    } catch (error) {
        next(error);
    }
}
module.exports = listVisitors;