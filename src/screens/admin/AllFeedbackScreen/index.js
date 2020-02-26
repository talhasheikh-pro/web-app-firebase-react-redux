import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { noop } from '../../../common/propTypes';
import { connect } from 'react-redux';
import { allFeedbackRequested, feedbackReplyRequested } from '../actions';
import { getFeedbackData, getFeedbackInProgress } from '../selectors';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import styles from '../../FeedbackScreen/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function AllFeedbackScreen({
    feedbackData,
    onLoad,
    feedbackInProgess,
    onReply,
}) {
    const classes = useStyles();
    const [showReplyForm, setShowReplyForm] = useState(feedbackInProgess);
    const [message, setMessage] = useState(null);
    const [replyMessage, setReplyMessage] = useState(null);
    const [replyToId, setReplyToId] = useState(null);
    useEffect(() => {
        onLoad();
    }, []);

    if (showReplyForm && feedbackInProgess) {
        setShowReplyForm(false);
        setMessage('Reply Submitted Successfully!');
    }

    return (
        <TableContainer component={Paper}>
            {message && (
                <Alert style={styles.alert} severity="info">
                    {message}
                </Alert>
            )}
            {feedbackInProgess && <LinearProgress />}
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Message</TableCell>
                        <TableCell>User Id</TableCell>
                        <TableCell>Reply</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feedbackData.length > 0 &&
                        feedbackData.map(({ id, message, user_id, reply }) => (
                            <TableRow key={id}>
                                <TableCell>{message}</TableCell>
                                <TableCell>{user_id}</TableCell>
                                <TableCell>
                                    {reply ? (
                                        reply
                                    ) : (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setShowReplyForm(true);
                                                setReplyToId(id);
                                            }}
                                        >
                                            Reply
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (
                        replyMessage &&
                        replyMessage.length > 100 &&
                        replyToId
                    ) {
                        onReply(replyToId, replyMessage);
                    } else {
                        setMessage('Feedback should be atleast 100 characters');
                    }
                }}
            >
                {showReplyForm && !feedbackInProgess && (
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <h1>Reply</h1>
                        {message && (
                            <Alert style={styles.alert} severity="info">
                                {message}
                            </Alert>
                        )}
                        <textarea
                            onChange={(e) => {
                                setReplyMessage(e.target.value);
                            }}
                            style={styles.textarea}
                            disabled={feedbackInProgess}
                        ></textarea>
                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={feedbackInProgess}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </TableContainer>
    );
}

AllFeedbackScreen.propTypes = {
    feedbackData: PropTypes.array,
    onLoad: PropTypes.func,
    feedbackInProgess: PropTypes.bool,
    onReply: PropTypes.func,
};

AllFeedbackScreen.defaultProps = {
    feedbackData: [],
    onLoad: noop,
    feedbackInProgess: false,
    onReply: noop,
};

const mapStateToProps = (state) => {
    return {
        feedbackData: getFeedbackData(state),
        feedbackInProgess: getFeedbackInProgress(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(allFeedbackRequested()),
        onReply: (replyToId, reply) =>
            dispatch(feedbackReplyRequested(replyToId, reply)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFeedbackScreen);
