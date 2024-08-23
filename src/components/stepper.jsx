import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'transparent',
        padding: 0,
    },
    stepLabel: {
        color: '#fff !important',
        '& .MuiStepIcon-root': {
            color: '#fff',
        },
        '& .Mui-active': {
            color: '#00A8FF !important',
        },
        '& .Mui-completed': {
            color: '#00A8FF !important',
        },
    },
});

const CustomStepper = () => {
    const classes = useStyles();
    const steps = ['Pending', 'Under Review', 'Assign'];

    return (
        <div className="bg-dark-blue h-screen flex flex-col justify-center items-center">
            <Stepper activeStep={1} alternativeLabel className={classes.root}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel className={classes.stepLabel}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default CustomStepper;
