const models = require('../../models');

const listVisitors = async (req, res, next) => {
    try {
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
        });
        res.json({
            visitors,
        })
    } catch (error) {
        next(error);
    }
}

module.exports = listVisitors;