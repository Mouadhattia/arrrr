import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    try {
        const Cg = req.query.Cg
        const filter = req.query.filter
        const from = req.query.from
        const to = req.query.to

        const queryFilter = {
            ... (Cg ? { category: Cg } : {}),
            ... ((from || to) ? { price: { $lte: to  ,  $gte: from } } : {}),
            ... (req.query.keyword ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i'
                } ,
            } : {})
        };
        /*
        if (!req.user.isAdmin)
        {
            queryFilter.active
        }*/
        let query = Product.find(queryFilter);
        
        let sortBy = {
            'Rating': '-rating',
            'date': 'createdAt',
            'highprice': 'price',
            'lowprice': '-price'
        }[filter];
   
        let products = [];
        if (sortBy?.length) {
            query = query.sort(sortBy)
            products = await query.exec();          
        } else {
            products = await query.exec();
        }
        res.json(products)
    } catch (e) {
        console.log({ e });
    }
})


// @desc Fetch single  product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
     
        if (product) {
            if (!product.images) {
                product.images = []
            }
            if (!product.imagesColors || product.imagesColors.length != product.images.length) {
                product.imagesColors = product.imagesColors.filter((c, index) => product.images[index]?.length && c?.length)
            }
            product.images = product.images.filter((i) => i?.length)
            if (!product.sizes) {
                product.sizes = []
            }
            if (!product.sizesPrices || product.sizes.length != product.sizesPrices.length) {
                product.sizesPrices = product.sizes.map(() => 0)
            }
          
            res.json(product)
        } else {
            // status it's 500 by default cuz of errHandler
            res.status(404)
            throw new Error('Product not found')
        }
    } catch (e) {
      

        return res.sendStatus()
    }
})

// @desc Delete a product
// @route GET /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        // status it's 500 by default cuz of errHandler
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Create a product
// @route Post /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Product ' + (await Product.count({})),
        price: 0,
        description: '-- pas de description --',
        user: req.user._id,
        sizes: ["normal"],
        sizesPrices: [0],
        images: ['https://i.ibb.co/SJdN9Tx/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg'],
        imagesColors: ["#000000"],
        category: [],
        countInStock: 0,
        numReviews: 0 ,
        active : false
    })
    const createProduct = await product.save();
    res.status(201).json(createProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, sizes, Images, countInStock, imagesColors, sizesPrices, active } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.category = category
        product.sizes = sizes.filter(e => e?.length)
        product.images = Images
        product.countInStock = countInStock
        product.imagesColors = imagesColors
        product.sizesPrices = sizesPrices.filter(e => e?.length)
        product.active = active === true
        const updatedProduct = await product.save();
        res.json(updateProduct)
    } else {
        res.status(404)
        throw new Error('Product Not found')
    }
})

// @desc Create new Review
// @route PUT /api/products/:id/reviews
// @access Private
const createproductreview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(404)
            throw new Error('Product Already Review')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product Not found')
    }
})


export {
    getProducts, getProductById, deleteProduct, createProduct, updateProduct, createproductreview
}