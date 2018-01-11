import React from 'react';

class TypeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onSelect(String(event.target.value));
  }

  render() {
    const options = this.props.types.map((type, index) => {
      return <option value={type} key={index+1}>{type}</option>
    })

    return (
      <select id="types" onChange={this.handleChange}>
        <option value="all" key="0">all</option>
        {options}
      </select>
    )
  }
}

export default TypeFilter;
