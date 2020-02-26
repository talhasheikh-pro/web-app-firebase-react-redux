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
import LinearProgress from '@material-ui/core/LinearProgress';
import { noop } from '../../../common/propTypes';
import { connect } from 'react-redux';
import { allReservationsRequested } from '../actions';
import { getReservationsData } from '../selectors';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function AllReservationsScreen({ data, onLoad }) {
    const classes = useStyles();

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <TableContainer component={Paper}>
            {!data.length && <LinearProgress />}
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
                    {data.length > 0 &&
                        data.map(
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

AllReservationsScreen.propTypes = {
    data: PropTypes.array,
    onLoad: PropTypes.func,
};

AllReservationsScreen.defaultProps = {
    data: [],
    onLoad: noop,
};

const mapStateToProps = (state) => {
    return {
        data: getReservationsData(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(allReservationsRequested()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllReservationsScreen);
