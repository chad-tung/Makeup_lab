import React from 'react';
import Product from './Product';

const ProductList = (props) => {
  if(!props.products) {
    return null;
  }

  const productNodes = props.products.map((item) => {
    return <Product {...item} key={item.id}/>
  })
  return (
    <ul>{productNodes}</ul>
  )
}

export default ProductList;
