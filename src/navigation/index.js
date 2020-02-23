import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
    ROUTE_ROOT,
    ROUTE_LOGIN,
    ROUTE_REGISTER,
    ROUTE_PARKING_AREAS,
    ROUTE_PARKING_SLOTS,
    ROUTE_FEEDBACK,
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
                    <ProtectedRoute path={ROUTE_FEEDBACK}>
                        <FeedbackScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_PARKING_AREAS}>
                        <ParkingAreasScreen />
                    </ProtectedRoute>
                    <ProtectedRoute path={ROUTE_PARKING_SLOTS}>
                        <SlotsScreen />
                    </ProtectedRoute>
                </Switch>
            </div>
        </Router>
    );
}
