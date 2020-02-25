import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    ROUTE_PARKING_AREAS,
    ROUTE_FEEDBACK,
    ACTIVE_CLASS_NAME,
    ROUTE_ALL_RESERVATIONS,
    ROUTE_ALL_CANCELLATIONS,
    ROUTE_ALL_USERS,
    ROUTE_ALL_FEEDBACKS,
} from './constants';
import { hasAdminRights } from '../auth/selectors.js';
import { isUserLoggedIn } from '../auth/selectors';
import { userLogoutRequested } from '../auth/actions';
import { noop } from '../common/propTypes';

export function AuthenicatedNavigation({ isUserLoggedIn, isAdmin, onLogout }) {
    return (
        <Fragment>
            {isUserLoggedIn && !isAdmin && (
                <ul>
                    <li>
                        <NavLink
                            activeClassName={ACTIVE_CLASS_NAME}
                            to={ROUTE_PARKING_AREAS}
                        >
                            Parking Areas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={ACTIVE_CLASS_NAME}
                            to={ROUTE_FEEDBACK}
                        >
                            Feedback
                        </NavLink>
                    </li>
                </ul>
            )}

            {isUserLoggedIn && isAdmin && (
                <ul>
                    <li>
                        <NavLink
                            activeClassName={ACTIVE_CLASS_NAME}
                            to={ROUTE_ALL_RESERVATIONS}
                        >
                            Reservations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={ACTIVE_CLASS_NAME}
                            to={ROUTE_ALL_CANCELLATIONS}
                        >
                            Cancellations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={ACTIVE_CLASS_NAME}
                            to={ROUTE_ALL_USERS}
                        >
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={ACTIVE_CLASS_NAME}
                            to={ROUTE_ALL_FEEDBACKS}
                        >
                            Feedbacks
                        </NavLink>
                    </li>
                </ul>
            )}

            {isUserLoggedIn ? (
                <ul>
                    <li>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                onLogout();
                            }}
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            ) : null}
        </Fragment>
    );
}

AuthenicatedNavigation.propTypes = {
    // denotes whether the current user is logged in or not
    isUserLoggedIn: PropTypes.bool,
    // indicates whether the current user is admin or not
    isAdmin: PropTypes.bool,
    onLogout: PropTypes.func,
};

AuthenicatedNavigation.defaultProps = {
    isAdmin: false,
    isUserLoggedIn: false,
    onLogout: noop,
};

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: isUserLoggedIn(state),
        isAdmin: hasAdminRights(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(userLogoutRequested()),
    };
};

const ConnectedAuthenicatedNavigation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthenicatedNavigation);

export default ConnectedAuthenicatedNavigation;
