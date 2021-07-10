import React, { useEffect, useMemo } from "react";

import "./App.css";
import Header from "./components/Header.component";
import Home from "./pages/Home.component";
import { Switch, Route } from "react-router-dom";
import Checkout from "./components/checkout/checkout.component";
import Payment from "./components/payment/payment.component";
import VendorDetails from "./components/register/vendor.register";
import Login from "./components/signin/signin.component";
import { auth } from "./firebase";
import { useStateValue } from "./stateprovider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_R9NsWDtrUYfuxBNuKp4fiDz700sVyawnGa");

function App() {
  console.log("App rendered at", new Date());
  const [{ user, basket }, dispatch] = useStateValue();

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);
  useEffect(() => {
    //will only run once when the app component loads...
    auth.onAuthStateChanged(async (authUser) => {
      console.log("The User is>>>", authUser);

      if (await authUser) {
        //user just logged in or was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    // BEM
    <div className='app'>
      <Switch>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/vendorRegister'>
          <VendorDetails />
        </Route>
        <Route path='/checkout'>
          <Header />
          <Checkout />
        </Route>
        <Route path='/payment'>
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path='/'>
          <Header />
          <Home />
        </Route>
        {/* <Route exact path='/' component={Home}/>
      <Route path='/signin' component={signIn}/> 
      <Route exact path='/checkout' component={Checkout} /> */}
      </Switch>
    </div>
  );
}

export default App;
