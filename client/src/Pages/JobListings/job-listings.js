import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Job Listings/job-listings-table";

class JobListings extends React.Component{
    render() {
        return(
            <React.Fragment>
                <Sidebar />
                <Table />
            </React.Fragment>    
        )   
    }
}

export default JobListings