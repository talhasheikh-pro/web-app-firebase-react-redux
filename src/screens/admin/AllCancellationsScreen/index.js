import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { noop } from '../../../common/propTypes';
import { connect } from 'react-redux';
import { allCancellationsRequested } from '../actions';
import { getCancellationData } from '../selectors';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function AllCancellationsScreen({ cancelledReservationsData, onLoad }) {
    const classes = useStyles();

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Reservation Id</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell align="right">End Time</TableCell>
                        <TableCell align="right">Slot Id</TableCell>
                        <TableCell align="right">User Id</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cancelledReservationsData.length > 0 &&
                        cancelledReservationsData.map(
                            ({ id, start_time, end_time, slot, booked_by }) => (
                                <TableRow key={id}>
                                    <TableCell>{id}</TableCell>
                                    <TableCell>{start_time}</TableCell>
                                    <TableCell align="right">
                                        {end_time}
                                    </TableCell>
                                    <TableCell align="right">{slot}</TableCell>
                                    <TableCell align="right">
                                        {booked_by}
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

AllCancellationsScreen.propTypes = {
    cancelledReservationsData: PropTypes.array,
    onLoad: PropTypes.func,
};

AllCancellationsScreen.defaultProps = {
    cancelledReservationsData: [],
    onLoad: noop,
};

const mapStateToProps = (state) => {
    return {
        cancelledReservationsData: getCancellationData(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(allCancellationsRequested()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllCancellationsScreen);
