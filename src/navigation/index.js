import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
    ROUTE_ROOT,
    ROUTE_LOGIN,
    ROUTE_REGISTER,
    ROUTE_PARKING_AREAS,
    ROUTE_PARKING_SLOTS,
    ROUTE_FEEDBACK,
    ROUTE_RESERVATIONS,
    ROUTE_ALL_CANCELLATIONS,
    ROUTE_ALL_FEEDBACKS,
    ROUTE_ALL_RESERVATIONS,
    ROUTE_ALL_USERS,
} from './constants';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AuthenicatedNavigation from './AuthenicatedNavigation';

// Screens/Pages
import LoginScreen from '../screens/LoginScreen/';
import RegisterScreen from '../screens/RegisterScreen/';
import ParkingAreasScreen from '../screens/ParkingAreasScreen/';
import SlotsScreen from '../screens/SlotsScreen/';
import FeedbackScreen from '../screens/FeedbackScreen/';
import CancellationScreen from '../screens/CancellationScreen';

import AllCancellationsScreen from '../screens/admin/AllCancellationsScreen/';
import AllFeedbackScreen from '../screens/admin/AllFeedbackScreen/';
import AllReservationsScreen from '../screens/admin/AllReservationsScreen/';
import AllUsersScreen from '../screens/admin/AllUsersScreen/';

export default function Navigation() {
    return (
        <Router>
            <div>
                {/* Routes which will be shown when user is logged in */}
                <AuthenicatedNavigation />

                <Switch>
                    <PublicRoute exact path={[ROUTE_LOGIN, ROUTE_ROOT]}>
                        <LoginScreen />
                    </PublicRoute>
                    <PublicRoute exact path={ROUTE_REGISTER}>
                        <RegisterScreen />
                    </PublicRoute>
                    <ProtectedRoute path={ROUTE_ALL_CANCELLATIONS}>
                        <AllCancellationsScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_ALL_FEEDBACKS}>
                        <AllFeedbackScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_ALL_RESERVATIONS}>
                        <AllReservationsScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_ALL_USERS}>
                        <AllUsersScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_FEEDBACK}>
                        <FeedbackScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_PARKING_AREAS}>
                        <ParkingAreasScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_PARKING_SLOTS}>
                        <SlotsScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_RESERVATIONS}>
                        <CancellationScreen />
                    </ProtectedRoute>
                </Switch>
            </div>
        </Router>
    );
}
