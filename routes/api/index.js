const router = require('express').Router();
const userRoutes = require('./usersRoute');
const thoughtRoutes = require('./thoughtRoute');

router.use('/user',userRoutes);
router.use('/thought',thoughtRoutes);

module.exports = router;