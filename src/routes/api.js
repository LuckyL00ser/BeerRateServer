import express from 'express';
import userController from '../controllers/user.controller'
const router = express.Router();


router.get('/users',userController.index)
router.get('/users/:id',userController.getById)
router.post('/users/login',userController.authenticate)
router.post('/users/register',userController.create)
router.put('/users/:id',userController.update)
router.delete('/users',userController.remove)


export default  router;
