import React from "react";
import "./styles/Cart.css";
import { useState} from "react";
import axios from "axios";
import { useContext } from "react";
import SearchContext from "./context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function CartMap({ item }) {
  const { _id, price } = item;
  const [value, setValue] = useState(Number(item.quantity));
  const add = (event) => {
    event.preventDefault();
    setValue((v) => v + 1);
    const handleAdd = async (event) => {
      await axios
        .put("http://localhost:8000/updateAdd", { _id, value, price })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    handleAdd();
  };
  const sub = (event) => {
    event.preventDefault();
    setValue((v) => v - 1);
    const handleSub = async (event) => {
      await axios
        .put("http://localhost:8000/updateSub", { _id, value, price })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    handleSub();
  };

  const handleRemove = async (event) => {
    await axios
      .put("http://localhost:8000/remove", { _id })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <tr>
      <td>
        <img src={item.img_url} alt={item.brand + " " + item.model} />
      </td>
      <td>{item.brand + " " + item.model}</td>
      <td>
        {(Number(price) * 90).toLocaleString("hi-In", {
          style: "currency",
          currency: "INR",
        })}
      </td>
      <td>
        <div style={{ display: "flex" }}>
          <button className="quantitybtn" disabled={value <= 1} onClick={sub}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          {value}
          <button className="quantitybtn" disabled={value >= 10} onClick={add}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </td>
      <td>
        {(price * value * 90).toLocaleString("hi-In", {
          style: "currency",
          currency: "INR",
        })}
      </td>
      <td>
        <button className="removeBtn" onClick={handleRemove}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}

function Cart() {
  
  const{cartData}=useContext(SearchContext);
 
  return (
    <div className="cart">
      {cartData.length !== 0 ? (
        <div>
          <h1>Your Cart</h1>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cartData &&
                cartData.map((item) => {
                  return <CartMap item={item} />;
                })}
            </tbody>
          </table>
          <h3>
            Total Price :{" "}
            {(
              Number(
                cartData.reduce((a, b) => {
                  return a + Number(b.totalPrice);
                }, 0)
              ) * 90
            ).toLocaleString("hi-In", { style: "currency", currency: "INR" })}
          </h3>
        </div>
      ) : (
        <p className="empty">Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
