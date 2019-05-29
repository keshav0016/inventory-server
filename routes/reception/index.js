const router = require('express').Router();
const admintokenAuth = require('../../middleware/admintokenAuth')
const createVisitor = require('./createVisitor');
const searchEmployee = require('./searchEmployee');
const listVisitors = require('./listAll');
const list = require('./listVisitor');

router.use(admintokenAuth);

router.post('/addVisitor', createVisitor);
router.get('/searchEmployee', searchEmployee);
router.get('/list', listVisitors);
router.get('/list/:employeeId', list);

module.exports = router;