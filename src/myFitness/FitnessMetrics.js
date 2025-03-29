import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Box, Grid } from '@mui/material';

function FitnessMetrics() {
    const userId = localStorage.getItem('id');
    const [age, setAge] = useState(''); // Age (Add this field)
    const [gender, setGender] = useState(''); // Gender (Add this field)
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState('');
    const [waist, setWaist] = useState('');
    const [hip, setHip] = useState('');
    const [whr, setWhr] = useState('');

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
        calculateBmi(e.target.value, weight);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
        calculateBmi(height, e.target.value);
    };

    const calculateBmi = (height, weight) => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiResult = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiResult);
        }
    };

    const handleWhrChange = (e) => {
        setWaist(e.target.value);
        calculateWhr(e.target.value, hip);
    };

    const handleHipChange = (e) => {
        setHip(e.target.value);
        calculateWhr(waist, e.target.value);
    };

    const calculateWhr = (waist, hip) => {
        if (waist && hip) {
            const whrResult = (waist / hip).toFixed(2);
            setWhr(whrResult);
        }
    };

    const saveRecord = async () => {
        const fitnessData = {
            user_id: userId,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            waist: waist,
            hip: hip
        };

        try {
            const response = await axios.post('http://localhost:5000/fitness/save', fitnessData);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error saving the fitness record!', error);
        }
    };

    return (
        <Box sx={{ mt: 15 }}> {/* This adds spacing below your navbar */}
            <Container>
                <h2>Log Your Data Here!</h2>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Height & Weight Container */}
                    <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', borderRadius: 2, width: '100%', maxWidth: 600, marginBottom: 3 }}>
                        <TextField
                            label="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Height (cm)"
                            value={height}
                            onChange={handleHeightChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Weight (kg)"
                            value={weight}
                            onChange={handleWeightChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ marginTop: 2 }}>
                            <strong>BMI: {bmi}</strong>
                        </Box>
                    </Box>

                    {/* Waist & Hip Container */}
                    <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', borderRadius: 2, width: '100%', maxWidth: 600 }}>
                        <TextField
                            label="Waist (cm)"
                            value={waist}
                            onChange={handleWhrChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Hip (cm)"
                            value={hip}
                            onChange={handleHipChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ marginTop: 2 }}>
                            <strong>Waist-to-Hip Ratio: {whr}</strong>
                        </Box>
                    </Box>

                    {/* Save Button */}
                    <Box sx={{ marginTop: 3 }}>
                        <Button onClick={saveRecord} variant="contained" color="primary">
                            Save Record
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );

}

export default FitnessMetrics;
