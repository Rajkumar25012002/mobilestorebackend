import React from "react";
import { Link } from "react-router-dom";

function MobileCard({ value }) {
  return (
    <div>
      <Link to={`/${value.id}`}>
        <div class="mobileImg">
          <img src={value.img_url} alt={value.brand + " " + value.model} />
        </div>
        <div class="mobileContent">
          <h3>{value.brand + " " + value.model}</h3>
          <h2>
            {(Number(value.approx_price_EUR) * 90).toLocaleString("hi-In", {
              style: "currency",
              currency: "INR",
            })}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default MobileCard;
