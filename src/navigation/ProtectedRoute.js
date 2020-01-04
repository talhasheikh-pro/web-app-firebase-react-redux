import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_ROOT } from './constants';
import { isUserLoggedIn } from '../auth/selectors.js';

function ProtectedRoute({ children, isUserLoggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isUserLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTE_ROOT,
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
}

ProtectedRoute.propTypes = {
    // components to be rendered inside
    children: PropTypes.node,

    // denotes whether the current user is logged in or not
    isUserLoggedIn: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
    isUserLoggedIn: false,
    children: null,
};

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: isUserLoggedIn(state),
    };
};

const ConnectedProtectedRoute = connect(mapStateToProps)(ProtectedRoute);

export default ConnectedProtectedRoute;
