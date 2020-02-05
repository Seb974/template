import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { Provider } from 'react-redux';
import store from './store';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from './components/product/productList';

require('../css/app.css');

class App extends React.Component 
{
    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        const url = new URL('https://fraispei.re:3000/.well-known/mercure');
        url.searchParams.append('topic', 'mercure/test');

        const eventSource = new EventSourcePolyfill(url, {
            withCredentials: true,
        });
        // const eventSource = new EventSource(url);
        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            alert(data.data);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router onUpdate={() => window.scrollTo(0, 0)}>
                <span>
                    <span id="react-header">
                        {/* <Navbar/> */}
                    </span>
                    <div id="page-container">
                        {/* <ScrollToTop> */}
                            <Switch>
                                <Route path='/' exact component={ProductList} />
                                {/* <Route path='/show/:id' component={ProductDetails} />
                                <Route path='/login' component={Login} /> */}
                                <Route path="*" render={() => (<Redirect to="/" />)} /> 
                            </Switch>
                        {/* </ScrollToTop> */}
                    </div>
                </span>
                </Router>
            </Provider>
        );
    }
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     user: state.auth.user,
//   });
  
//   export default connect( mapStateToProps )(App);

export default App;

  ReactDOM.render(<App/>, document.getElementById("root"));

