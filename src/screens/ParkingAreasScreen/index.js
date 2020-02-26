import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { noop } from '../../common/propTypes';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from 'react-router-dom';
import { parkingAreasRequested } from './actions';
import { getParkingAreas, getParkingAreasError } from './selectors';
import { connect } from 'react-redux';

function ParkingAreasScreen({ history, onLoad, parkings, errorMessage }) {
    // triggers when component in mounted
    useEffect(() => {
        onLoad();
    }, []);

    return (
        <Fragment>
            <Typography>Select Parking</Typography>
            {!parkings.length && <LinearProgress />}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {parkings.map((single) => {
                const { id, location } = single;
                return (
                    <Card
                        key={id}
                        style={{
                            marginTop: 20,
                        }}
                    >
                        <CardActionArea
                            onClick={() => {
                                history.push({
                                    pathname: `${id}/slots`,
                                    state: { ...single },
                                });
                            }}
                        >
                            <CardContent>
                                <h1>{location}</h1>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
        </Fragment>
    );
}

ParkingAreasScreen.propTypes = {
    // provided by `withRouter` HOC
    history: PropTypes.object,

    onLoad: PropTypes.func,
    parkings: PropTypes.array,
    errorMessage: PropTypes.string,
};

ParkingAreasScreen.defaultProps = {
    parkings: [],
    onLoad: noop,
};

const mapStateToProps = (state) => {
    return {
        parkings: getParkingAreas(state),
        errorMessage: getParkingAreasError(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(parkingAreasRequested()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(ParkingAreasScreen));
