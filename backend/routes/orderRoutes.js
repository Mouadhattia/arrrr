import express from 'express'
const router = express.Router()
import { addorderitems, GetMyOrders, getOrderById, GetOrders, updateOrderToPaid,updateOrderToDelivered } from '../controlers/orderControler.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.route('/').post(addorderitems).get(protect,admin,GetOrders)
router.route('/myorders').get(protect,GetMyOrders) 
router.route('/:id').get(getOrderById) 
router.route('/:id/pay').put(protect,updateOrderToPaid) 
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered) 


export default router