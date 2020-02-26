import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { noop } from '../../common/propTypes';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getActiveReservedSlots } from './selectors';
import {
    cancelReservationRequested,
    activeReservationsRequested,
} from './actions';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function CancellationScreen({ onLoad, activeSlots, onCancel }) {
    const classes = useStyles();

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Booking From</TableCell>
                        <TableCell align="right">booking To</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activeSlots.length > 0 &&
                        activeSlots.map(
                            ({ id, start_time, end_time, is_cancel }) => (
                                <TableRow key={id}>
                                    <TableCell>{id}</TableCell>
                                    <TableCell>{start_time}</TableCell>
                                    <TableCell>{end_time}</TableCell>
                                    <TableCell align="right">
                                        {!is_cancel ? (
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    onCancel(id);
                                                }}
                                            >
                                                Cancel Reservation
                                            </Button>
                                        ) : (
                                            'Cancelled'
                                        )}
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

CancellationScreen.propTypes = {
    onLoad: PropTypes.func,
    onCancel: PropTypes.func,
    activeSlots: PropTypes.array,
};

CancellationScreen.defaultProps = {
    onLoad: noop,
    onCancel: noop,
    activeSlots: [],
};

const mapStateToProps = (state) => {
    return {
        activeSlots: getActiveReservedSlots(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(activeReservationsRequested()),
        onCancel: (id) => dispatch(cancelReservationRequested(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancellationScreen);
