import asyncHandler from 'express-async-handler'
import {sendEmail} from "./../services/mailer.js"
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addorderitems = asyncHandler(async (req, res) => {
    try {
        const { orderItems, shippingAddress, description, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                if (decoded) {
                    req.user = await User.findById(decoded.id).select('-password')
                }
            } catch (error) {
                console.error(error)
            }
        }
        if (!req.user) {
           
            req.user = await User.findOne({
                email: shippingAddress.email
            }).select('-password')
        }
        if (!req.user) {
       
            req.user = await User.findOne({
                email: "anonymous@anonymous.com"
            }).select('-password')
        }
        
        if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error('No order items');
        } else {
            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                description
            })
            const createdOrder = await order.save();
            const id = createdOrder._id;
            sendEmail(shippingAddress.email ,"VOTRE COMMANDE A ÉTÉ BIEN CRÉÉE SUR ARDUST.TN",
            `BONJOUR ${shippingAddress.name},<br/>
            VOTRE COMMANDE A ÉTÉ BIEN CRÉÉE SUR ARDUST.TN, NOUS VOUS CONTACTERONS PAR MAIL/TEL POUR VOUS CONFIRMER LA DISPONIBILITÉ DE CES ARTICLES.<br/>
            DÉTAILS DE LA COMMANDE<br/>
            Commande : ${id} passée le ${((new Date()).toString())}<br/>
            <br/>
            Paiement : Paiement comptant à la livraison<br/>
            <br/>
            VOICI LE LIEN VERS LES DÉTAILS DU COMMANDE : <br/>
            <br/>
            http://ardust.tn/order/${id}<br/>
            <br/>
            INFORMATIONS SUR LES DÉLAIS DE LIVRAISON<br/>
            <br/>
            Compte tenu des circonstances actuelles, les délais de traitement et de livraison des commandes peuvent être allongés. Nous vous remercions sincèrement pour votre compréhension et votre patience.<br/>
            <br/>
            LIVRAISON<br/>
            <br/>
            Pour toute question, veuillez nous contacter en cliquant sur le bouton "contactez-nous" en haut de la page d'accueil du site ou par tel sur le (+216) 51 609 064 / +(216)75 212 712 <br/>
            <br/>
            Paiement : Paiement comptant à la livraison<br/>
            <br/>
            *Merci de ne pas répondre directement à cet email. Pour nous contacter, cliquez ici<br/>
            <br/>
            ADRESSE DE LIVRAISON <br/>
            ${shippingAddress.address}<br/>
            <br/>
            ADRESSE DE FACTURATION<br/>
            ${shippingAddress.address}<br/>`
            
            
            
            )
            res.status(201).json(createdOrder);
        }
    } catch (e) {
      
        return res.sendStatus(500);
    }
})

// @desc get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not found')
    }
})
// @desc update order to paid
// @route update /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: Date.now(),
            email_address: req.user.email,
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder);
    } else {
        res.status(404)
        throw new Error('Order Not found')
    }
})

// @desc update order to delivered
// @route update /api/orders/:id/deliver
// @access Private

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order Not found')
    }

})
// @desc get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const GetMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

// @desc get orders
// @route GET /api/admin/orders
// @access Private/admin
const GetOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export { addorderitems, getOrderById, updateOrderToPaid, GetMyOrders, GetOrders, updateOrderToDelivered }