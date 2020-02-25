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
import { allUsersRequested } from '../actions';
import { getUsersData } from '../selectors';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function AllUsersScreen({ data, onLoad }) {
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
                        <TableCell align="right">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 &&
                        data.map(({ id, email }) => (
                            <TableRow key={id}>
                                <TableCell>{id}</TableCell>
                                <TableCell>{email}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

AllUsersScreen.propTypes = {
    data: PropTypes.array,
    onLoad: PropTypes.func,
};

AllUsersScreen.defaultProps = {
    data: [],
    onLoad: noop,
};

const mapStateToProps = (state) => {
    return {
        data: getUsersData(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(allUsersRequested()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersScreen);
