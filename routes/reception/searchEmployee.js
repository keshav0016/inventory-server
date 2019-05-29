const models = require('../../models');

/**
 * @description: Function to create the where object according to the length of name.
 * @param {String} name 
 */
function whereObject(name) {

    
    if (name.length > 1) {
        const firstName = name[0];
        const secondName = name[1];
        return {

            where: {
                $or: [
                    {
                        first_name: {
                            ilike: `%${firstName}%`,
                        },
                    },
                    {
                        first_name: {
                            ilike: `%${secondName}%`,
                        },
                    },
                    {
                        last_name: {
                            ilike: `%${firstName}%`,
                        }
                    },
                    {
                        last_name: {
                            ilike: `%${secondName}%`,
                        }
                    },
                ],
            }
        }
    } else if (name.length === 1) {
        const firstName = name;
        return {
            where: {
                $or: [
                    {
                        first_name: {
                            ilike: `%${firstName}%`,
                        },
                    },
                    {
                        last_name: {
                            ilike: `%${firstName}%`,
                        }
                    },

                ]
            }
        };
    }
}

/**
 * @description: Driver function to find the employees with given name.
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */

const searchEmployee = async (req, res, next) => {
    try {
        let limit = req.query.limit || 10;
        let offset = req.query.offset;
        if (req.body.name) {
        const employees = await models.users.findAll({
            ...whereObject(req.body.name.split(" ")),
            offset,
            limit,
            attributes: ['user_id', 'first_name', 'last_name'],
        });
        if (employees.length > 0) {
            return res.json({
                employees,
            })
        } else {
            return res.json({
                error: 'invalid name',
            })
        }
        } else {
            const employees = await models.users.findAll({
                offset,
                limit,
                attributes: ['user_id', 'first_name', 'last_name'],
            });
            res.json({
                employees,
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = searchEmployee;
