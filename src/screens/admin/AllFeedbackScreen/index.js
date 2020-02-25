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
import { allFeedbackRequested } from '../actions';
import { getFeedbackData } from '../selectors';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function AllFeedbackScreen({ feedbackData, onLoad }) {
    const classes = useStyles();

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Message</TableCell>
                        <TableCell>User Id</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feedbackData.length > 0 &&
                        feedbackData.map(({ id, message, user_id }) => (
                            <TableRow key={id}>
                                <TableCell>{message}</TableCell>
                                <TableCell>{user_id}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

AllFeedbackScreen.propTypes = {
    feedbackData: PropTypes.array,
    onLoad: PropTypes.func,
};

AllFeedbackScreen.defaultProps = {
    feedbackData: [],
    onLoad: noop,
};

const mapStateToProps = (state) => {
    return {
        feedbackData: getFeedbackData(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(allFeedbackRequested()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFeedbackScreen);
