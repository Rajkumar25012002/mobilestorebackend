import express from "express";
import collection from "./data.js";
import cors from "cors";
import  "dotenv/config";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT=8000|| process.env.PORT;
app.get("/", cors(), (req, res) => {
  collection.find({}).then(function (allDetails) {
    
        res.json({allDetails })
  })
});

app.post("/add",async (req, res) => {
  const { productId, brand, model, img_url, price, quantity, totalPrice } = req.body;
  const data = {
    productId: productId,
    brand: brand,
    model: model,
    img_url: img_url,
    price: price,
    quantity: quantity,
    totalPrice: totalPrice,
  };
  await collection.insertMany([data]).then(data=>res.json(data)).catch(e=>res.json(e));
});
app.put("/remove",async (req, res) => {
  const {_id} = req.body;
  await collection.findByIdAndRemove({_id:_id.toString()}).then(res.json(`Obect with id ${_id} removed`));
});
app.put("/updateAdd",async (req, res) => {
  const {_id,value,price} = req.body;
  await collection.updateMany({_id:_id.toString()},{$set:{quantity: value+1,totalPrice: Number(price)*(value+1)}}).then(res.json(`Obect with id ${_id} removed`));
});
app.put("/updateSub",async (req, res) => {
  const {_id,value,price} = req.body;
  await collection.updateMany({_id:_id.toString()},{$set:{quantity: value-1,totalPrice: Number(price)*(value-1)}}).then(res.json(`Obect with id ${_id} removed`));
});

app.listen(PORT, () => {
  console.log("port connected");
});
