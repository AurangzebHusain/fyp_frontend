import React, { useEffect,useState } from "react";
import "./Header.styles.scss";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateprovider";
import logo from "../../src/easycart-t.png";
import { auth } from "../firebase";

export default function Header() {
  const [{ basket, user }] = useStateValue();
  const [{ searchFieldVal }, dispatch] = useStateValue();

    const [searchedCategory, setCategory] = useState([]);
    const [searchField, setSearchField] = useState(['']);
  // const email = user && user.email ? user.email : 'guest';

  // console.log("Header rendered", new Date());

  // console.log("User in header component contains",user);
  const addSearchedProduct = () => {
    //dispatch the items into data layer
    dispatch({
      type: "ADD_TO_SEARCH_FIELD",
      item:searchField,
    });
  };
  const addSearchedCategory = (value) => {
    setCategory(value);
    console.log(value);
    //dispatch the items into data layer
    dispatch({
      type: "ADD_TO_SEARCH_FIELD",
      item:searchedCategory,
    });
  };
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  const searchFunction=(e)=>{
    // console.log(e.target.value);
    setSearchField(e.target.value);
    addSearchedProduct()
  }
  return (
    <React.Fragment>
    <div className='header'>
      <Link className='navbar-brand' to={"/"}>
        <img width='150px' height='50px' src={logo} alt={"brand-logo"} />
      </Link>
      <div className='header__search'>
        <input className='header__search--Input' type='search' placeholder='Search products' onChange={(e)=>searchFunction(e)} />
        <SearchIcon className='header__search--Icon' onClick={addSearchedProduct} />
      </div>
      <div className='header__nav'>
        <Link to={"/vendorRegister"}>
          <div className='header__option'>
            <span className='header__option--LineOne'>Want to Sell?</span>
            <span className='header__option--LineTwo'>{"Sign In"}</span>
          </div>
        </Link>
        <Link to={!user ? "/signin" : ""}>
          <div onClick={handleAuthentication} className='header__option'>
            <span className='header__option--LineOne'>
              Hello,{user ? user.email : "guest"}
            </span>
            <span className='header__option--LineTwo'>
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className='header__option'>
          <span className='header__option--LineOne'>Return</span>
          <span className='header__option--LineTwo'>& Orders</span>
        </div>
        {/* <div className="header__option">
                <span className="header__optionLineOne">Your</span>
                <span className="header__optionLineTwo">Prime</span>
            </div> */}
        <Link to='/checkout'>
          <div className='header__option--Basket'>
            <ShoppingCartIcon className='shoppingCart' />
            <span className='header__option--LineTwo'>{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
    <div className="category-bar">
    <a href="#" className="item item-1" onClick={()=>{addSearchedCategory('') }}>All</a>
    <a href="#" className="item item-2" onClick={()=>{addSearchedCategory('smartphone') }}>SmartPhones</a>
    <a href="#" className="item item-3" onClick={()=>{addSearchedCategory('men') }}>Clothes</a>
    <a href="#" className="item item-4" onClick={()=>{addSearchedCategory('books') }}>Books</a>
    <a href="#" className="item item-5" onClick={()=>{addSearchedCategory('pro') }}>apple</a>
    <a href="#" className="item item-6" onClick={()=>{addSearchedCategory('samsung') }}>Samsung</a>
  </div>
  </React.Fragment>
  );
}
