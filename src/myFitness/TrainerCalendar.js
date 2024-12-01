// src/TrainerCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

function TrainerCalendar({ trainerId, onSelectSlot }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleTimeChange = time => {
        setSelectedTime(time);
    };

    const handleSubmit = () => {
        const dateTime = new Date(selectedDate);
        dateTime.setHours(selectedTime.getHours());
        dateTime.setMinutes(selectedTime.getMinutes());
        onSelectSlot(trainerId, dateTime);
    };

    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
            />
            <DatePicker
                selected={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
            />
            <button onClick={handleSubmit}>Schedule Meeting</button>
        </div>
    );
}

export default TrainerCalendar;
