import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../stateprovider";
import { getBasketTotal } from "../../reducer";
import CheckoutProduct from "../checkout/checkoutproduct.component";
import "./payment.styles.scss";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../../axios";

export default function Payment() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
    //generate the special  stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects the total in a currencies subuits
        url: `/payment/create?total=${getBasketTotal(basket) * 60}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log(`Client secret is ${clientSecret}`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      dispatch({
        type: "EMPTY_BASKET",
      });
      history.replace("/orders");
    
    }, 5000);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent=payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });

      
  };
  const handleChange = (event) => {
    console.log("button clicked");
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div class='payment'>
      <div className='payment__container'>
        {/* Payment Section Address */}
        <h1>
          Checkout(
          <Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delievery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>179/2 Mukesh nagar</p>
            <p>Shahadra delhi</p>
          </div>
        </div>
        {/* Payment section Items */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(({ id, title, image, price, rating }) => (
              <CheckoutProduct
                id={id}
                title={title}
                image={image}
                price={price}
                rating={rating}
              />
            ))}
          </div>
        </div>
        {/* Payment section Payment Method */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            {/* Stripe magic will go */}
            <form onSubmit={handleSubmit}>
              <CardElement
                className={"payment__cardNumContainer"}
                onChange={handleChange}
              />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>
                        Order Total):<strong>{value}</strong>
                      </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
