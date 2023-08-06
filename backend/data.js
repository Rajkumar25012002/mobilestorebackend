import mongoose from "mongoose";
import  "dotenv/config";
const url = process.env.MONGO_URL;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
};

mongoose.connect(url,connectionParams)
    .then( () => { 
        console.info('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

const newSchema = new mongoose.Schema({
    productId:{
        type:String
    },
    brand:{
        type:String
    },
    model:{
        type:String
    },
    img_url:{
        type:String
    },
    price:{
        type:String
    },
    quantity:{
        type:String
    },
    totalPrice:{
        type:String
    }
});

const collection = mongoose.model("cart", newSchema);
export default collection;