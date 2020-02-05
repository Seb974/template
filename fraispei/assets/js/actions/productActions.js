import axios from 'axios';
import {  MERCURE_TEST } from './types';
import productReducer from '../reducers/productReducer';

export const testMercure = () => dispatch => {
    axios.get('/mercure/test')
         .then( res => {
            console.log(res.publish);
         });
};