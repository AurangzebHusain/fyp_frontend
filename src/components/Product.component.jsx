import React, { useEffect } from "react";
import { useStateValue } from "../stateprovider";
import "./Product.styles.scss";
import ProductModal from './productModal/ProductModal.component';
export default function Product({ id, title, price, rating, image,description,stock }) {
 
  const [{ basket }, dispatch] = useStateValue();
  // console.log('Basket item is',basket)

  const addToBasket = () => {
    //dispatch the items into data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
      </div>
      <p className='product__price'>
        <small>₹</small>
        <strong>{price}</strong>
      </p>
      <div className='product__rating'>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <span key={i} role={"img"} aria-label={"star-emoji"}>
              ⭐
            </span>
          ))}
      </div>
      <img className='product__image' src={image} alt='product-img' />
      <ProductModal id={id}
                  title={title}
                  price={price}
                  rating={4}
                  image={image}
                  description={description}
                  stock={stock}/>
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}
