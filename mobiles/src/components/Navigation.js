import "./styles/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import SearchContext from "./context";
import { useContext } from "react";
function Navigation() {
  const { valueFromNavBar, setValueFromNavBar,cartLen } = useContext(SearchContext);
  const handleSearch = (event) => {
    setValueFromNavBar(event.target.value);
  };
  return (
    <nav>
      <h2>Mobiles Store</h2>
      <div>
        <input
          type="search"
          value={valueFromNavBar}
          onChange={handleSearch}
          placeholder="Search for mobiles..."
        ></input>
        {/* <FontAwesomeIcon  id="searchIcon "icon={faMagnifyingGlass}/> */}
      </div>
      <a href="http://localhost:3000/cart">
        <span className="cartchild">
          <FontAwesomeIcon size="xl" icon={faCartPlus} /><p>{cartLen}</p>
        </span>
      </a>
      <a href="http://localhost:3000/profile">
        <span>
          <FontAwesomeIcon size="xl" icon={faUserCircle} />
        </span>
        Profile
      </a>
    </nav>
  );
}

export default Navigation;
