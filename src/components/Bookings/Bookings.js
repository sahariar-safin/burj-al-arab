import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/getBookings?email=' + loggedInUser.email, {
            headers: {
                "Authorization": `Bearer ${ sessionStorage.getItem('idToken') }`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])

    return (
        <div>
            <h1>You have {bookings.length} booking!</h1>
            {
                bookings.map(book => <li>{loggedInUser.name} From: {new Date(book.checkIn).toDateString('MM/dd/yyyy')} To: {new Date(book.checkOut).toDateString('MM/dd/yyyy')} </li>)
            }
        </div>
    );
};

export default Bookings;