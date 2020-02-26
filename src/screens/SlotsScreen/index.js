import React, { Fragment, useEffect, useState, useRef } from 'react';
import 'date-fns';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';
import { noop } from '../../common/propTypes';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from './styles';
import {
    parkingSlotsRequested,
    reservedSlotsRequested,
    slotReservationRequested,
} from './actions';
import {
    getParkingSlots,
    getSlotsError,
    getReservedSlots,
    isSlotReservationInProgress,
    isSlotRevervationSuccess,
    getReservedSlot,
} from './selectors';
import { connect } from 'react-redux';
import { DateTimePicker } from '@material-ui/pickers';
import ReactToPrint from 'react-to-print';

function SlotsScreen({
    onLoad,
    slots,
    reservedSlots,
    onCheckAvailibility,
    slotRevervationSuccess,
    slotRevervationInProgress,
    reservedSlot,
    onReservation,
    errorMessage,
}) {
    const location = useLocation();
    const [selectedId, setSelectedId] = useState(null);
    const [slotName, setSlotName] = useState('');
    const [message, setMessage] = useState(null);
    const [startDateTime, setStartDateTime] = useState(
        new Date().setHours(19, 30, 0),
    );
    const [endDateTime, setEndDateTime] = useState(
        new Date().setHours(20, 30, 0),
    );
    const receiptRef = useRef();

    // triggers when component in mounted
    useEffect(() => {
        onLoad(location.state.id);
        onCheckAvailibility(startDateTime, endDateTime);
    }, []);

    const updateSelectedStatus = (id) => {
        slots.forEach((slot) => {
            if (slot.id == id) {
                slot.selected = !slot.selected;

                setSlotName(slot.location);
                if (slot.selected) setSelectedId(id);
                else setSelectedId(null);
            }
        });
        setMessage(null);
    };

    return (
        <Fragment>
            <Typography>Select Slot for Reservation</Typography>
            <Card
                disabled={slotRevervationInProgress}
                style={styles.pickerContainer}
            >
                <CardContent>
                    <DateTimePicker
                        style={styles.pickers}
                        label="Reservation From"
                        disablePast={true}
                        disableFuture={true}
                        value={startDateTime}
                        onChange={setStartDateTime}
                    />
                    <DateTimePicker
                        style={styles.pickers}
                        label="Reservation To"
                        disablePast={true}
                        disableFuture={true}
                        value={endDateTime}
                        onChange={setEndDateTime}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            onCheckAvailibility(startDateTime, endDateTime);
                        }}
                    >
                        Check Availibility
                    </Button>
                </CardContent>
            </Card>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            {message && <Alert severity="info">{message}</Alert>}

            {slotRevervationInProgress ||
                (slots && !slots.length && <LinearProgress />)}

            {slots &&
                slots.map((single) => {
                    const { id, location, selected } = single;
                    const isReserved = reservedSlots.indexOf(id) > -1;
                    let bgColor = '#b6d4ff';
                    if (isReserved) {
                        bgColor = 'yellow';
                    } else if (selected) {
                        bgColor = 'green';
                    }

                    return (
                        <Card
                            key={id}
                            style={{ ...styles.root, backgroundColor: bgColor }}
                        >
                            <CardActionArea
                                disabled={isReserved}
                                onClick={() => {
                                    if (!selectedId || id == selectedId) {
                                        updateSelectedStatus(id);
                                    } else {
                                        setMessage(
                                            'You can only select single parking spot',
                                        );
                                    }
                                }}
                            >
                                <CardContent>
                                    <h1>{location}</h1>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
            <div
                style={{
                    marginTop: 40,
                }}
            >
                {selectedId ? (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={slotRevervationInProgress}
                        onClick={() => {
                            onReservation(
                                startDateTime,
                                endDateTime,
                                selectedId,
                            );
                        }}
                    >
                        Reserve Parking
                    </Button>
                ) : null}
            </div>
            <div>
                {!slotRevervationInProgress && slotRevervationSuccess ? (
                    <div>
                        <Alert severity="success">
                            Slot Reserved Successfully
                        </Alert>

                        {/* Booking/Reservation receipt */}
                        <div ref={receiptRef} style={styles.receiptRoot}>
                            <Typography>
                                Reservation Id: {reservedSlot}
                            </Typography>
                            <Typography>Location: {slotName}</Typography>
                            <Typography>
                                Start Time: {startDateTime.toString()}
                            </Typography>
                            <Typography>
                                End Time: {endDateTime.toString()}
                            </Typography>
                        </div>

                        {/* `ReactToPrint` for printing receipt */}
                        <ReactToPrint
                            trigger={() => (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Print this out!
                                </Button>
                            )}
                            content={() => receiptRef.current}
                        />
                    </div>
                ) : null}
            </div>
        </Fragment>
    );
}

SlotsScreen.propTypes = {
    onLoad: PropTypes.func,
    onCheckAvailibility: PropTypes.func,
    onReservation: PropTypes.func,
    slots: PropTypes.array,
    reservedSlot: PropTypes.string,
    reservedSlots: PropTypes.array,
    errorMessage: PropTypes.string,
    slotRevervationSuccess: PropTypes.bool,
    slotRevervationInProgress: PropTypes.bool,
};

SlotsScreen.defaultProps = {
    slots: [],
    reservedSlots: [],
    onLoad: noop,
    reservedSlot: null,
    slotRevervationSuccess: false,
    slotRevervationInProgress: false,
    onCheckAvailibility: noop,
    onReservation: noop,
};

const mapStateToProps = (state) => {
    return {
        slots: getParkingSlots(state),
        reservedSlots: getReservedSlots(state),
        errorMessage: getSlotsError(state),
        slotRevervationInProgress: isSlotReservationInProgress(state),
        slotRevervationSuccess: isSlotRevervationSuccess(state),
        reservedSlot: getReservedSlot(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(parkingSlotsRequested(id)),
        onCheckAvailibility: (startDateTime, endDateTime) =>
            dispatch(reservedSlotsRequested(startDateTime, endDateTime)),
        onReservation: (startDateTime, endDateTime, selectedId) =>
            dispatch(
                slotReservationRequested(
                    startDateTime,
                    endDateTime,
                    selectedId,
                ),
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsScreen);
