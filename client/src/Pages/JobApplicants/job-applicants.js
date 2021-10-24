import Table from "../../components/Job Applicants/job-table";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/Job Applicants/searchBar";
import AddApplicant from "../../components/Job Applicants/addApplicant";

class JobApplicants extends React.Component{
    render() {
        return(
            <React.Fragment>
                <Sidebar />
                <Search />
                <AddApplicant />
                <Table />
            </React.Fragment>    
        )   
    }
}

export default JobApplicants