import React from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AddApplicant(){
    return(
        <Button variant="outlined" startIcon={<PersonAddIcon />} style={{float: "right", marginRight: "3%"}} className="mt-3 mb-4">
            Add Applicant
        </Button>
    )
}
