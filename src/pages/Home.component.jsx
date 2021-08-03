import React, { useState, useEffect, } from "react";
import { API } from "../backend";
import { useStateValue } from "../stateprovider";
import { getProducts } from "../coreapicalls";
import Product from "../components/Product.component";
import "./Home.styles.scss";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [{ basket, user, searchedValue }] = useStateValue();
  //   const [searchedProducts, setsProducts] = useState([]);
  //   const [searchField, setSearchField] = useState([""]);

  const [error, setError] = useState(false);
  const loadAllProduct = () => {
    getProducts().then((data,err) => {
      if (err) {
        setError(error);
        console.log(error);
      } else {
        setProducts(data);
        console.log(products);
      }
    });
  };
  const loadSearchedProduct = () => {
    console.log(searchedValue);
    getProducts().then((data,err) => {
      if (err) {
        setError(error);
      } else {
        const filteredProducts=data.filter(data=>data['name'].toLowerCase().includes(searchedValue));
        console.log(filteredProducts);
        setProducts(filteredProducts);
        // console.log(products);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
  }, []);

  useEffect(() =>{
    if(searchedValue!=null)
    loadSearchedProduct();
    if(searchedValue.length===1){
      loadAllProduct();
    }
  },[searchedValue]);
  // console.log("API IS", API);
  console.log(searchedValue? searchedValue:'');
  return (
    <div className='home'>
      <img
        className='home__image'
        src='https://image.shutterstock.com/image-vector/smart-shopping-word-concepts-banner-260nw-1157423206.jpg'
        alt=''
      />

      <div className='home__container'>
        {/* <div>
          {products
            .filter((product) => product.category.name === "Samsung")
            .map((product, index) => {
              return (
                <Product
                  id={product._id}
                  title={product.name}
                  price={product.price}
                  rating={4}
                  image={product.imgUrl}
                  description={product.description}
                  stock={product.stock}
                />
              );
            })}
        </div> */}
        
        <React.Fragment>
          {products
            .filter((product) => product.category.name === "iPhone")
            .map((product, index) => {
              return (
                <Product
                id={product._id}
                title={product.name}
                price={product.price}
                rating={4}
                image={product.imgUrl}
                description={product.description}
                stock={product.stock}
                />
              );
            })}
        </React.Fragment>
        <React.Fragment>
        {products
            .filter((product) => product.category.name === "Samsung")
            .map((product, index) => {
              return (
                <Product
                  id={product._id}
                  title={product.name}
                  price={product.price}
                  rating={4}
                  image={product.imgUrl}
                  description={product.description}
                  stock={product.stock}
                />
              );
            })}
            </React.Fragment>
            <React.Fragment>
          {products
            .filter((product) => product.category.name === "Smartphones")
            .map((product, index) => {
              return (
                <Product
                id={product._id}
                title={product.name}
                price={product.price}
                rating={4}
                image={product.imgUrl}
                description={product.description}
                stock={product.stock}
                />
              );
            })}
            </React.Fragment>
        <React.Fragment>
          {products
            .filter((product) => product.category.name === "Clothes")
            .map((product, index) => {
              return (
                <Product
                id={product._id}
                title={product.name}
                price={product.price}
                rating={4}
                image={product.imgUrl}
                description={product.description}
                stock={product.stock}
                />
              );
            })}
        </React.Fragment>
        <Product
          id='1'
          key={"1"}
          title='The Subtle Art of Not Giving a F*ck Paperback'
          price={390}
          rating={3}
          image='https://images-na.ssl-images-amazon.com/images/I/511vJPN7p5L._SX331_BO1,204,203,200_.jpg'
        />
        <Product
          id='17'
          key={"17"}
          title='Mi Notebook 14 Intel Core i5-10210U 10th Gen Thin and Light Laptop(8GB/256GB SSD/Windows 10)'
          price={4399}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/71mYRzElTAL._SL1500_.jpg'
        />
        <Product
          id='24'
          key={"24"}
          title='OnePlus 7T (Glacier Blue, 8GB RAM, Fluid AMOLED Display, 256GB Storage, 3800mAH Battery)'
          price={379}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/71ncRs6HzyL._SL1500_.jpg'
        />
        <Product
          id='323'
          key={"323"}
          title='POLESTAR Ranker Blue 30 Lt Casual Bagpack/Travel Laptop Backpack Bag'
          price={5}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/91TNrafvb9L._SL1500_.jpg'
        />
        <Product
          id='132'
          key={"132"}
          title='BEBONCOOL Gamepad,USB Wired Gamepad with Dual Vibrators Controller Gamepad for PC/Laptop Computer (Windows XP/7/8/10) / PS3'
          price={13}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/71o1shNaKGL._SL1500_.jpg'
        />
        <Product
          id='112'
          key={"112"}
          title='OnePlus 7T (Glacier Blue, 8GB RAM, Fluid AMOLED Display, 256GB Storage, 3800mAH Battery)'
          price={379}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/71ncRs6HzyL._SL1500_.jpg'
        />
        <Product
          id='13'
          key={"13"}
          title='Mi Notebook 14 Intel Core i5-10210U Laptop(8GB/256GB SSD/Windows 10/Intel UHD Graphics/Silver/1.5Kg)'
          price={455}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/71mYRzElTAL._SL1500_.jpg'
        />
        <Product
          key={"18"}
          title='Samsung 80 cm (32 Inches) Series 4 HD Ready LED Smart TV UA32N4300AR (Black) (2018 model)'
          price={4399}
          rating={4}
          image='https://images-na.ssl-images-amazon.com/images/I/91FKnvV4PHL._SL1500_.jpg'
        />
      </div>
    </div>
  );
}
