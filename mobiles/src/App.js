import "./App.css";
import SearchContext from "./components/context";
import Navigation from "./components/Navigation";
import Mobiles from "./components/Mobiles";
import MobileDetails from "./components/MobileDetails";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState,useEffect } from "react";
import axios from "axios";

function App() {
  const[valueFromNavBar,setValueFromNavBar]=useState()
  const[cartLen,setCartLen]=useState();
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((response) => JSON.stringify(response.data.allDetails))
      .then((data) => setCartData(JSON.parse(data))).then(setCartLen(cartData.length)).catch(err=>console.log(err));
  });
  return (
    <div className="App">
      <SearchContext.Provider value={{valueFromNavBar,setValueFromNavBar,cartData,cartLen}}>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mobiles />} />
          <Route path="/:mobileId" element={<MobileDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      </SearchContext.Provider>
      
    </div>
  );
}

export default App;
