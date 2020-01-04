import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import useStyles from '../LoginScreen/styles';
import { userRegistrationRequested } from '../../auth/actions';
import {
    getRegistrationError,
    getRegistrationMessage,
    isUserLoggedIn,
} from '../../auth/selectors';
import { NavLink } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_PROTECTED } from '../../navigation/constants';

const RegisterScreen = ({ onRegister, errorMessage, message, isLoggedIn }) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Fragment>
            {isLoggedIn ? (
                <Redirect
                    to={{
                        pathname: ROUTE_PROTECTED,
                    }}
                />
            ) : (
                <Card className={classes.root}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onRegister({ email, password });
                        }}
                    >
                        {message && <Alert severity="success">{message}</Alert>}
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}
                        <CardContent>
                            <Typography className={classes.title}>
                                Register
                            </Typography>
                            <TextField
                                label="email"
                                required={true}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <TextField
                                type="password"
                                label="password"
                                required={true}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                className={classes.btn}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                            <NavLink to={ROUTE_LOGIN}>
                                <i
                                    className="icon-dashboard"
                                    aria-hidden="true"
                                ></i>
                                Go to Login
                            </NavLink>
                        </CardActions>
                    </form>
                </Card>
            )}
        </Fragment>
    );
};

RegisterScreen.propTypes = {
    // function to be called when user successfully submits login form
    onRegister: PropTypes.func,
    errorMessage: PropTypes.string,
    message: PropTypes.string,
    isLoggedIn: PropTypes.bool,
};

RegisterScreen.defaultProps = {
    // function to be called when user successfully submits login form
    onRegister: () => {},
    isLoggedIn: false,
};

const mapStateToProps = (state) => {
    return {
        errorMessage: getRegistrationError(state),
        message: getRegistrationMessage(state),
        isLoggedIn: isUserLoggedIn(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRegister: (userCreds) =>
            dispatch(userRegistrationRequested(userCreds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
