import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { SUBMIT_FEEDBACK_REQUESTED } from './constants';
import { submitFeedbackSucceeded, submitFeedbackFailed } from './actions';
import { addFeedback } from '../../api/index';
import { getFeedback } from './selectors';
import { getUserId } from '../../auth/selectors';
import { parseClientError } from '../../api/utils';

function* submitFeedback() {
    try {
        const userId = yield select(getUserId);
        const feedback = yield select(getFeedback);

        const feedbackRef = yield call(addFeedback, feedback, userId);

        if (feedbackRef) {
            yield put(submitFeedbackSucceeded(feedbackRef.id));
        }
    } catch (e) {
        const error = parseClientError(e);
        const message = error && error.message ? error.message : error;
        yield put(submitFeedbackFailed(message));
    }
}

export default function*() {
    yield all([yield takeLatest(SUBMIT_FEEDBACK_REQUESTED, submitFeedback)]);
}
