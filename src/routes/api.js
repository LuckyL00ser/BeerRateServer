import express from 'express';
import userRoutes from './userRoutes';
import beerRoutes from './beerRoutes'
import breweryRoutes from './breweryRoutes'
import commentRoutes from './commentRoutes'
import opinionRoutes from './opinionRoutes'


const router = express.Router();
router.use('/users',userRoutes);
router.use('/breweries',breweryRoutes);
router.use('/beers',beerRoutes);
router.use('/comments',commentRoutes);
router.use('/opinions',opinionRoutes);


export default router;