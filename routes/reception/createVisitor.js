const models = require('../../models');
const sendMail = require('./visitorMail');
/**
 * @description: Function to add new records to the visitor table, add visit details and send mail.
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */
const addVisitor = async (req, res, next) => {
    try {
        transaction = await models.sequelize.transaction();
        let visitorId;
        const visitObj = {
            employeeId: req.body.employeeId,
            entryTime: req.body.entryTime,
            exitTime: req.body.exitTime,
            date: req.body.date,
            purpose: req.body.purpose,
            description: req.body.description,
            vehicleNumber: req.body.vehicleNumber,
        }
        const isEmployee = await models.users.findOne({
            where: {
                user_id: req.body.employeeId,
            }
        });
        if(! isEmployee) {
            return res.json({
                error:'Invalid EmployeeId.',
            }); 
        } else {
            const isVisitor = await models.Visitor.findOne({
                where: {
                    contactNumber: req.body.contactNumber,
                }
            });
            if (! isVisitor) {
                const visitorObj = {
                    visitorName: req.body.visitorName,
                    contactNumber: req.body.contactNumber,
                }
                const visitor = await models.Visitor.create({
                    ...visitorObj,
                },{
                    transaction
                });
                visitorId = visitor.id;

            } else {
                if (req.body.visitorName !== isVisitor.name) {
                    return res.json({
                        error: `Visitor name doesn't match with the exixting phone number.`,
                    });
                }
                visitorId = isVisitor.id;
            }
                const visit = await models.visit.create({
                    visitorId: visitorId,
                    ...visitObj,
                }, {
                    transaction
                });
                await sendMail(isEmployee.email, req.body.visitorName);
                await transaction.commit();
                return res.json({
                    status: 'Success'
                });
        }
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
}

module.exports = addVisitor;