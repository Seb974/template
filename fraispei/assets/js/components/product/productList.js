import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { testMercure } from '../../actions/productActions';

class ProductList extends React.Component 
{
    static propTypes = {
        testMercure: PropTypes.func.isRequired,
    };

    handleTest = (e) => {
        e.preventDefault();
        this.props.testMercure();
    }

    render() {
        return (
            <div className="product-wrapper">
                <section className="p-t-30" id="react-product-list">
                    <div className="container">
                        Liste des produits 
                        <button onClick={ this.handleTest }>Tester Mercure</button>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    product: state.product,
});

export default connect( mapStateToProps, { testMercure } )(ProductList);
