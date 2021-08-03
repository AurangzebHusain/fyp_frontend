import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../productModal/productModal.styles.scss';
import { useStateValue } from "../../stateprovider";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top:`${50}%`,
    left:`${50}%`,
    transform:`translate(-${50}%, -${50}%)`,
    width: `${60}%`,
    height:`${'auto'}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ id, title, price, rating, image,stock,description }) {

    // console.log(id,title,description);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [{ basket }, dispatch] = useStateValue();
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className="product-description">
            <div className="productd__img">
            <img  src={image} alt='product-img' />
            </div>
       
      <div className="product-information">
      <div className='productd__title'>
        <p>{title}</p>
      </div>
      <div className='productd__rating'>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <span key={i} role={"img"} aria-label={"star-emoji"}>
              ⭐
            </span>
          ))}
      </div>
      
      <div className="productd__desc">
          <h2>Description</h2>
      <p>{description}</p> 
      </div>
      {
          stock?<div className="productd__stock">
          <h4>Stock Avaialable :</h4>
      <p>{stock}</p> 
      </div>: ''
      }
      

      <p className='productd__price'>
        <small>₹</small>
        <strong>{price}</strong>
      </p>
      
      <button onClick={addToBasket}>Add to Basket</button>
      </div>
      
      
     
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        View Description
      </button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}
