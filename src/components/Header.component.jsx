import React, { useEffect } from "react";
import "./Header.styles.scss";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateprovider";
import logo from "../../src/easycart-t.png";
import { auth } from "../firebase";

export default function Header() {
  const [{ basket, user }] = useStateValue();

  // const email = user && user.email ? user.email : 'guest';

  console.log("Header rendered", new Date());

  // console.log("User in header component contains",user);
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className='header'>
      <Link className='navbar-brand' to={"/"}>
        <img width='150px' height='50px' src={logo} alt={"brand-logo"} />
      </Link>
      <div className='header__search'>
        <input className='header__search--Input' type='search' name='' id='' />
        <SearchIcon className='header__search--Icon' />
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
  );
}
