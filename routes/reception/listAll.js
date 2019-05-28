const models = require('../../models');

const listVisitors = async (req, res, next) => {
    try {
        let limit = req.query.limit || 10;
        let offset = req.query.offset;
        const visitors = await models.users.findAll({
            attributes: ['user_id', 'first_name', 'last_name'],
            include: [
                {
                    model: models.Visitor,
                    include: [
                        {
                            model: models.visit,
                        }
                    ],
                    required: true
                }
            ],
            offset,
            limit,
        });
        res.json({
            visitors,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = listVisitors;