import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {
    ROUTE_ROOT,
    PROTECTED_ADMIN_ROUTES,
    PROTECTED_USER_ROUTES,
} from './constants';
import { isUserLoggedIn, hasAdminRights } from '../auth/selectors.js';
import { firebaseAuth } from '../client/firebase';
import { updateUserRequested } from '../auth/actions';

function ProtectedRoute({
    children,
    onUserWithGrantFetched,
    isUserLoggedIn,
    isAdmin,
    ...rest
}) {
    useEffect(() => {
        firebaseAuth.onAuthStateChanged(async function(user) {
            if (user) {
                // User is signed in.
                const token = await user.getIdTokenResult();
                const userWithClaims = { ...token.claims };

                onUserWithGrantFetched(userWithClaims);
            }
        });
    }, []);

    return (
        <Route
            {...rest}
            render={({ location }) => {
                let ROUTE_TO = ROUTE_ROOT;
                let doRender = true;

                // can admin visit the current route?
                if (
                    isUserLoggedIn &&
                    isAdmin &&
                    PROTECTED_ADMIN_ROUTES.indexOf(location.pathname) == -1
                ) {
                    ROUTE_TO = PROTECTED_ADMIN_ROUTES[0];
                    doRender = false;
                }

                // can user visit the current route?
                if (
                    isUserLoggedIn &&
                    !isAdmin &&
                    PROTECTED_USER_ROUTES.indexOf(location.pathname) == -1
                ) {
                    ROUTE_TO = PROTECTED_USER_ROUTES[0];
                    doRender = false;
                }

                return isUserLoggedIn && doRender ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTE_TO,
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
    // indicates whether the current user is admin or not
    isAdmin: PropTypes.bool,

    onUserWithGrantFetched: PropTypes.func,
};

ProtectedRoute.defaultProps = {
    isUserLoggedIn: false,
    children: null,
    isAdmin: false,
    onUserWithGrantFetched: () => {},
};

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: isUserLoggedIn(state),
        isAdmin: hasAdminRights(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserWithGrantFetched: (userWithGrants) =>
            dispatch(updateUserRequested(userWithGrants)),
    };
};

const ConnectedProtectedRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProtectedRoute);

export default ConnectedProtectedRoute;
