import React from "react";
import "./styles/MobileDetails.css";
import { useParams, Link } from "react-router-dom";
import Data from "./data/Data";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCartPlus } from "@fortawesome/free-solid-svg-icons";

function MobileDetails() {
  const { mobileId } = useParams();
  const value = Data.filter((item) => {
    return item.id === Number(mobileId);
  })[0];
  console.log(mobileId);

  const {
    id: productId,
    brand,
    model,
    img_url,
    approx_price_EUR: price,
  } = value;
  const quantity = 1;
  const totalPrice = price;
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/add", {
        productId,
        brand,
        model,
        img_url,
        price,
        quantity,
        totalPrice,
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="mobileDetailsPage">
      <Link className="backBtn" to="/">
        <FontAwesomeIcon icon={faAngleLeft} size="2xs" /> Back to Home
      </Link>
      <div className="mobileDetails">
        <div>
          <img src={value.img_url} alt={value.brand + " " + value.model} />
        </div>
        <div className="details">
          <h1>
            {value.brand} {value.model} ({value.internal_memory})
          </h1>
          <h2>
            {(Number(value.approx_price_EUR) * 90).toLocaleString("hi-In", {
              style: "currency",
              currency: "INR",
            })}
          </h2>
          <h3>{value.status}</h3>
          <div className="mainDetails">
            <p>
              Color: <span>{value.colors}</span>
            </p>
            <p>
              Memory:{" "}
              <span>{value.internal_memory + " + " + value.memory_card}</span>
            </p>
            <p>
              RAM: <span>{value.RAM}</span>
            </p>
            <p>
              Brand: <span>{value.brand}</span>
            </p>
            <p>
              Model: <span>{value.model}</span>
            </p>
            <p>
              Operating System: <span>{value.OS}</span>
            </p>
            <p>
              Camera:{" "}
              <span>
                {value.primary_camera + " + " + value.secondary_camera}
              </span>
            </p>
            <p>
              SIM: <span>{value.SIM}</span>
            </p>
          </div>
          <button onClick={handleSubmit}>Add to Card</button>
          <Link to="/cart">
            <FontAwesomeIcon className="cartlink" icon={faCartPlus} />
          </Link>
          <hr></hr>
          <div className="aboutDetails">
            <h4>About this mobile:</h4>
            <ul>
              <li>Dimentions of the mobile {value.dimentions}</li>
              <li>
                Display type {value.display_type}, size {value.display_size},
                resolution {value.display_resolution}
              </li>
              <li>CPU used {value.CPU}</li>
              <li>Network Speed are {value.network_speed}</li>
              <li>Battery used {value.battery}</li>
              <li>
                Sensors, GPU, USB and Chipset are {value.sensors}, {value.GPU},{" "}
                {value.USB}, {value.Chipset}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileDetails;
