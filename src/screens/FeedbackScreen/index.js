import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { noop } from '../../common/propTypes';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import styles from './styles';
import { submitFeedbackRequested } from './actions';
import { getFeedbackError, isFeedbackInProgess } from './selectors';

function FeedbackScreen({ errorMessage, onSubmit, feedbackInProgess }) {
    const [message, setMessage] = useState(null);
    const [feedback, setFeedback] = useState(null);

    return (
        <Fragment>
            <Card>
                <CardContent style={styles.context}>
                    <Typography>Submit your Feedback</Typography>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (feedback && feedback.length > 100) {
                                onSubmit(feedback);
                            } else {
                                setMessage(
                                    'Feedback should be atleast 100 characters',
                                );
                            }
                        }}
                    >
                        {errorMessage && (
                            <Alert style={styles.alert} severity="error">
                                {errorMessage}
                            </Alert>
                        )}
                        {message && (
                            <Alert style={styles.alert} severity="info">
                                {message}
                            </Alert>
                        )}

                        {!feedbackInProgess ? (
                            <textarea
                                onChange={(e) => {
                                    setFeedback(e.target.value);
                                }}
                                style={styles.textarea}
                                disabled={feedbackInProgess}
                            ></textarea>
                        ) : (
                            <Alert style={styles.alert} severity="info">
                                Feedback In Progress
                            </Alert>
                        )}

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
                    </form>
                </CardContent>
            </Card>
        </Fragment>
    );
}

FeedbackScreen.propTypes = {
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func,
    feedbackInProgess: PropTypes.bool,
};

FeedbackScreen.defaultProps = {
    errorMessage: '',
    onSubmit: noop,
    feedbackInProgess: false,
};

const mapStateToProps = (state) => {
    return {
        errorMessage: getFeedbackError(state),
        feedbackInProgess: isFeedbackInProgess(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (feedback) => dispatch(submitFeedbackRequested(feedback)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen);
