import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductList extends React.Component 
{
    render() {
        return (
            <div className="product-wrapper">
                <section className="p-t-30" id="react-product-list">
                    <div className="container">
                        Liste des produits 
                    </div>
                </section>
            </div>
        );
    }
}
  
  export default ProductList;
