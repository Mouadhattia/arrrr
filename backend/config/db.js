import mongose from 'mongoose'
import colors from 'colors'

import Product from '../models/productModel.js'

// a mongoose stuf (mongoose.connect ....) return always a promise
const connectDB = async () => {
    try{
        console.log('Trying to connect to : ' + process.env.MONGO_URI);
        console.log("...");
        const conn = await mongose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
    } catch (error) {
      console.error(`Error: ${error.message}`.red.underline.bold)
            process.exit(1)
    }
}

export default connectDB