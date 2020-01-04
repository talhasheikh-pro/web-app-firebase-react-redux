import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import useStyles from './styles';
import {
    getLoginError,
    getLoginMessage,
    isUserLoggedIn,
} from '../../auth/selectors';
import { userLoginRequested } from '../../auth/actions';
import { ROUTE_REGISTER, ROUTE_PROTECTED } from '../../navigation/constants';

const LoginScreen = ({ onLogin, errorMessage, isLoggedIn, message }) => {
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
                            onLogin({ email, password });
                        }}
                    >
                        {message && <Alert severity="success">{message}</Alert>}
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}
                        <CardContent>
                            <Typography className={classes.title}>
                                Login
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
                                Login
                            </Button>
                            <NavLink to={ROUTE_REGISTER}>
                                <i
                                    className="icon-dashboard"
                                    aria-hidden="true"
                                ></i>
                                Register new account
                            </NavLink>
                        </CardActions>
                    </form>
                </Card>
            )}
        </Fragment>
    );
};

LoginScreen.propTypes = {
    // function to be called when user successfully submits login form
    onLogin: PropTypes.func,
    errorMessage: PropTypes.string,
    message: PropTypes.string,
    isLoggedIn: PropTypes.bool,
};

LoginScreen.defaultProps = {
    // function to be called when user successfully submits login form
    onLogin: () => {},
    isLoggedIn: false,
};

const mapStateToProps = (state) => {
    return {
        errorMessage: getLoginError(state),
        message: getLoginMessage(state),
        isLoggedIn: isUserLoggedIn(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userCreds) => dispatch(userLoginRequested(userCreds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
