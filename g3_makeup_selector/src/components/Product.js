import React from 'react';
import ColourSpot from './ColourSpot'

var capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Product = (props) => {
  let makeupbrand = capitalize(String(props.brand));
  let makeuptype = capitalize(String(props.product_type));

  const colourNodes = props.product_colors.map((shade, index) => {
    return <ColourSpot {...shade} key={index} />
  })

  return (
    <li className="product">
      <div className="product-attributes">
        <h4>Brand: {makeupbrand}</h4>
        <h5>Name: {props.name}</h5>
        <h6>Type: {makeuptype}</h6>
        <h6>Price: ${props.price}</h6>
        <h6>Shades available:</h6>
        <div className="colours" height="30px">{colourNodes}</div>
      </div>
      <div className="product-image">
        <img src={props.image_link} height="150px"/>
      </div>
      <div className="product-description">
        <h6>Description: <p>{props.description}</p></h6>
      </div>
    </li>
  )
}

export default Product;
