import mongoose from "mongoose";

const url = `mongodb://127.0.0.1:27017/mobile`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
};

mongoose.connect(url)
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