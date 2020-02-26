import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    ROUTE_PARKING_AREAS,
    ROUTE_FEEDBACK,
    ROUTE_RESERVATIONS,
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
import styles from './styles';

export function AuthenicatedNavigation({ isUserLoggedIn, isAdmin, onLogout }) {
    return (
        <Fragment>
            <nav>
                <ul>
                    {isUserLoggedIn && !isAdmin && (
                        <Fragment>
                            <li style={styles.list}>
                                <NavLink
                                    activeClassName={ACTIVE_CLASS_NAME}
                                    to={ROUTE_PARKING_AREAS}
                                    style={styles.anchor}
                                >
                                    Parking Areas
                                </NavLink>
                            </li>
                            <li style={styles.list}>
                                <NavLink
                                    activeClassName={ACTIVE_CLASS_NAME}
                                    to={ROUTE_FEEDBACK}
                                    style={styles.anchor}
                                >
                                    Give Feedback
                                </NavLink>
                            </li>
                            <li style={styles.list}>
                                <NavLink
                                    activeClassName={ACTIVE_CLASS_NAME}
                                    to={ROUTE_RESERVATIONS}
                                    style={styles.anchor}
                                >
                                    Reservations
                                </NavLink>
                            </li>
                        </Fragment>
                    )}

                    {isUserLoggedIn && isAdmin && (
                        <Fragment>
                            <li style={styles.list}>
                                <NavLink
                                    activeClassName={ACTIVE_CLASS_NAME}
                                    to={ROUTE_ALL_RESERVATIONS}
                                    style={styles.anchor}
                                >
                                    Reservations
                                </NavLink>
                            </li>
                            <li style={styles.list}>
                                <NavLink
                                    activeClassName={ACTIVE_CLASS_NAME}
                                    to={ROUTE_ALL_CANCELLATIONS}
                                    style={styles.anchor}
                                >
                                    Cancellations
                                </NavLink>
                            </li>
                            <li style={styles.list}>
                                <NavLink
                                    activeClassName={ACTIVE_CLASS_NAME}
                                    to={ROUTE_ALL_USERS}
                                    style={styles.anchor}
                                >
                                    Users
                                </NavLink>
                            </li>
                            <li style={styles.list}>
                                <NavLink
                                    activeClassName={ACTIVE_CLASS_NAME}
                                    to={ROUTE_ALL_FEEDBACKS}
                                    style={styles.anchor}
                                >
                                    Feedbacks
                                </NavLink>
                            </li>
                        </Fragment>
                    )}

                    {isUserLoggedIn ? (
                        <li style={styles.list}>
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    onLogout();
                                }}
                                style={styles.anchor}
                            >
                                Logout
                            </a>
                        </li>
                    ) : null}
                </ul>
            </nav>
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
