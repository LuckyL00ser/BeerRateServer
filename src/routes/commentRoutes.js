import express from 'express';
import commentController from '../controllers/comment.controller'
const router = express.Router();


router.get('/',commentController.index)
router.get('/:id',commentController.getById)
router.post('/',commentController.create)
router.put('/:id',commentController.update)
router.delete('/:id',commentController.remove)


export default  router;
