import React from 'react';
import ProductList from '../components/ProductList';
import BrandFilter from '../components/BrandFilter';
import TypeFilter from '../components/TypeFilter';
var _ = require('lodash')

class MakeupBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {products: [], displayedProducts: [], brands:[], types: [], filterBrand: null, filterType: null}

    this.handleSelectedBrand = this.handleSelectedBrand.bind(this);
    this.handleSelectedType = this.handleSelectedType.bind(this);
    // this.brandFilter = this.brandFilter.bind(this);
    // this.typeFilter = this.typeFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const url = "http://localhost:5000/API.json";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const jsonString = xhr.responseText;
        const data = JSON.parse(jsonString);
        this.setState({products: data})

        let brandArr = []
        let typeArr = []
        const brands = data.map((product) => {
          if (product.brand) {
            brandArr.push(product.brand)
          }
          if (product.product_type) {
            typeArr.push(product.product_type)
          }
        })
        const newBrandArr = _.uniq(brandArr);
        const newTypeArr = _.uniq(typeArr);
        this.setState({brands: newBrandArr});
        this.setState({types: newTypeArr});
      }
    })
    xhr.send();
    this.handleChange();
  }

  handleSelectedBrand(brandName) {
    if (brandName == "all") {
      this.setState({filterBrand: null})
      // this.setState({displayedProducts: this.state.products})
    } else {
      this.setState({filterBrand: brandName})
      // const filteredArr = this.state.products.filter(product => product.brand == brandName)
      // this.setState({displayedProducts: filteredArr});
    }
    this.handleChange();
  }

  handleSelectedType(typeName) {
    if (typeName == "all") {
      this.setState({filterType: null})
      // this.setState({displayedProducts: this.state.products})
    } else {
      this.setState({filterType: typeName})
      // const filteredArr = this.state.products.filter(product => product.product_type == typeName)
      // this.setState({displayedProducts: filteredArr});
    }
    this.handleChange();
  }

  handleChange() {
    const typefilter = this.state.filterType;
    const brandfilter = this.state.filterBrand;
    let filteredArr = [];

    if (!brandfilter) {
      filteredArr = this.state.products;
    } else {
      filteredArr = this.state.products.filter(product => product.brand == brandfilter);
    }

    if (!typefilter) {
      this.setState({displayedProducts: filteredArr});
    } else {
      filteredArr = filteredArr.filter(product => product.product_type == typefilter);
      this.setState({displayedProducts: filteredArr});
    }
  }
  //
  // handleChange() {
  //   this.brandFilter();
  //   this.typeFilter();
  // }
  //
  // brandFilter() {
  //   if (!this.state.filterBrand) {
  //     this.setState({displayedProducts: this.state.products})
  //   } else {
  //     const filteredArr = this.state.products.filter(product => product.brand == this.state.filterBrand)
  //     this.setState({displayedProducts: filteredArr});
  //   }
  // }
  //
  // typeFilter() {
  //   if (this.state.filterType) {
  //     const filteredArr = this.state.displayedProducts.filter(product => product.product_type == this.state.filterType);
  //     this.setState({displayedProducts: filteredArr});
  //   }
  // }

  // handleChange(changeType) {
  //   if (changeType == "brand") {
  //     if (!this.state.filterBrand && !this.state.filterType) {
  //       this.setState({displayedProducts: this.state.products})
  //     } elseif (!this.state.filterBrand) {
  //
  //       const filteredArr = this.state.products.filter(product => product.brand == this.state.filterBrand)
  //       this.setState({displayedProducts: filteredArr});
  //     }
  //   }
  //
  //   if (this.state.filterType == null) {
  //     this.setState({displayedProducts: this.state.displayedProducts})
  //   } else {
  //     const filteredArr = this.state.displayedProducts.filter(product => product.product_type == this.state.filterType)
  //     this.setState({displayedProducts: filteredArr})
  //   }
  // }



  render() {
    return(
      <div>
        <div><h5>Filter by brand:</h5><BrandFilter brands={this.state.brands} onSelect={this.handleSelectedBrand}/></div>
        <div><h5>Filter by category:</h5><TypeFilter types={this.state.types} onSelect={this.handleSelectedType}/></div>

        <ProductList products={this.state.displayedProducts} />
      </div>
    )
  }
}

export default MakeupBox;
