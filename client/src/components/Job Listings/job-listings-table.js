import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name) {
  return {
    name,
    details: [
      {
        date: '2020-01-05',
        skills: 'Python, Ruby, Go',
        amount: '15000-17000',
        experiance: '1 year'
      }
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="p" gutterBottom component="div">
                Looking for a good web developer with javascript, python and ruby skills. Minimum work experiance is 1 year. 
              </Typography>
              <Typography variant="h6" gutterBottom component="div" className="mt-2">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Work Experiance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> 
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.date}>
                      <TableCell component="th" scope="row">
                        {detailsRow.date}
                      </TableCell>
                      <TableCell>{detailsRow.skills}</TableCell>
                      <TableCell align="right">R {detailsRow.amount}</TableCell>
                      <TableCell align="right">
                        {detailsRow.experiance}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Web Developer'),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper} sx={{position: "absolute", left: "19.5%",width: "80%", height: "80%", marginTop: "5%"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Jobs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
