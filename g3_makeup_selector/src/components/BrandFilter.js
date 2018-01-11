import React from 'react';

class BrandFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onSelect(String(event.target.value));
  }

  render() {
    const options = this.props.brands.map((brandName, index) => {
      return <option value={brandName} key={index+1}>{brandName}</option>
    })

    return (
      <select id="brands" onChange={this.handleChange}>
        <option value="all" key="0">all</option>
        {options}
      </select>
    )
  }
}

export default BrandFilter;
