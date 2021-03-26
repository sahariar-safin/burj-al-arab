import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { bedType } = useParams();

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckIn = (date) => {
        const newDate = { ...selectedDate };
        newDate.checkIn = date;
        setSelectedDate(newDate);
    }
    const handleCheckOut = (date) => {
        const newDate = { ...selectedDate };
        newDate.checkOut = date;
        setSelectedDate(newDate);
    }
    const handleBooking = () => {
        console.log(selectedDate);
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...loggedInUser, ...selectedDate })
        })
            .then(res => res.json())
            .then(data => {
                console.log("added");
            })
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hi, {loggedInUser.name}.Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Button onClick={handleBooking} variant="contained" color="primary">Booking</Button>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;