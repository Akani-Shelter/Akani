import React from 'react';
import { Form,FormControl,Button } from 'react-bootstrap'

export default function Search(){
    return(
        <Form inline style={{marginTop: "2%"}}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: "55%", marginLeft: "25%"}} />
            <Button variant="outline-success">Search</Button>
        </Form>
    )
}

