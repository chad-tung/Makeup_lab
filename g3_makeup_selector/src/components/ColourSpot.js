import React from 'react';

const ColourSpot = (props) => {
  let col = String(props.hex_value)
  return (
    <th className="colour-spot" bgcolor={col}></th>
  )
}

export default ColourSpot;
