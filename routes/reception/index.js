const router = require('express').Router();
const admintokenAuth = require('../../middleware/admintokenAuth')
const createVisitor = require('./createVisitor');
const searchEmployee = require('./searchEmployee');
const listVisitors = require('./listAll');

router.use(admintokenAuth);

router.post('/addVisitor', createVisitor);
router.get('/searchEmployee/:limit/:offset', searchEmployee);
router.get('/list/:limit/:offset', listVisitors);

module.exports = router;