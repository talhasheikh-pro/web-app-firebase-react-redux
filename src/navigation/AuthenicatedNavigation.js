import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTE_PROTECTED, ROUTE_LOGIN, ACTIVE_CLASS_NAME } from './constants';
import { isUserLoggedIn } from '../auth/selectors';

export function AuthenicatedNavigation({ isUserLoggedIn }) {
    return (
        isUserLoggedIn && (
            <ul>
                <li>
                    <NavLink
                        activeClassName={ACTIVE_CLASS_NAME}
                        to={ROUTE_PROTECTED}
                    >
                        Protected Page
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        activeClassName={ACTIVE_CLASS_NAME}
                        to={ROUTE_LOGIN}
                    >
                        Public Page
                    </NavLink>
                </li>
            </ul>
        )
    );
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: isUserLoggedIn(state),
    };
};

const ConnectedAuthenicatedNavigation = connect(mapStateToProps)(
    AuthenicatedNavigation,
);

export default ConnectedAuthenicatedNavigation;
