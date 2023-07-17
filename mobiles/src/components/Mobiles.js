import React, { useContext } from "react";
import Data from "./data/Data";
import MobileCard from "./MobileCard";
import "./styles/MobileCard.css";
import SearchContext from "./context";
function Mobiles() {
  const { valueFromNavBar } = useContext(SearchContext);
  const searchedData = Data.filter((value) =>
    value.model.includes(valueFromNavBar)
  );
  console.log("filteredData", searchedData);
  return (
    <div className="mobiles">
      {searchedData.length > 0 ? (
        searchedData.map((value) => {
          return <MobileCard value={value} key={value.id} />;
        })
      ) : valueFromNavBar ? (
        <h3 className="notavailable">No Mobiles Available on your search</h3>
      ) : (
        Data.map((value) => {
          return <MobileCard value={value} key={value.id} />;
        })
      )}
    </div>
  );
}

export default Mobiles;
