import header from '../White.png';
import { InputLabel, MenuItem, Select, Typography, Button, TextField } from '@material-ui/core';
import { useState, useRef, useEffect } from 'react';
import './access.css'
import DataGridDemo from './DataGridDemo';
import axios from 'axios';

import Modal from "react-modal";

function Access() {
    const beStyle = {
        fontFamily: 'Dancing Script',
        padding: '2pt',
        width: '100%',
        textAlign: 'center',
        fontSize: '24pt'
    }

    function executeBoth() {
        axios.post('http://localhost:8080/progUni', {
            uni: university.current.value,
            prog: program.current.value,
            // table: table.current.value
        }).then((res) => {
            const retVal = res.data.Query;
            const toShow = retVal.map(item => {
                return {
                    "id": item.Sr_No,
                    "University_Name": item.University_Name,
                    "Course_Qualification": item.Course_Qualification,
                    "Course_Name": item.Course_Name,
                    "Course_Fees": item.Course_Fees,
                    "Start_Date": item.Start_Date
                }
            })
            changeCols(columns);
            changeRows(toShow);
            // console.log(res.data.Query);
        })
    }

    function searchProg() {
        axios.post('http://localhost:8080/program', {
            text: program.current.value,
            // table: table.current.value
        }).then((res) => {
            const retVal = res.data.Query;
            const toShow = retVal.map(item => {
                return {
                    "id": item.Sr_No,
                    "University_Name": item.University_Name,
                    "Course_Qualification": item.Course_Qualification,
                    "Course_Name": item.Course_Name,
                    "Course_Fees": item.Course_Fees,
                    "Start_Date": item.Start_Date
                }
            })
            changeCols(columns);
            changeRows(toShow);
            // console.log(res.data.Query);
        })
    }

    function searchUni() {
        axios.post('http://localhost:8080/university', {
            text: university.current.value,
            // table: table.current.value
        }).then((res) => {
            const retVal = res.data.Query;
            const toShow = retVal.map(item => {
                return {
                    "id": item.Sr_No,
                    "University_Name": item.University_Name,
                    "Popular_Courses": item.Popular_Courses,
                    "About": item.About,
                }
            })
            changeCols(aboutCols);
            changeRows(toShow);
            // console.log(res.data.Query);
        })
    }

    const boxStyle = {
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        width: "30%"
    };

    const newStyle = {
        display: "flex",
        padding: '10pt 0 0 0',
        flexDirection: "column",
        justifyContent: "space-around", 
        alignItems: "center",
        width: "100%"
    };

    const columns = [
        { field: 'Sr', headerName: 'ID', hide: true},
        { field: 'University_Name', headerName: 'University', width: 250 },
        { field: 'Course_Qualification', headerName: 'Qualification', width: 200 },
        { field: 'Course_Name', headerName: 'Course', width: 400 },
        { field: 'Course_Fees', headerName: 'Fees', width: 150 },
        { field: 'Start_Date', headerName: 'Start', width: 150 },
      ];

    const aboutCols = [
        { field: 'Sr', headerName: 'ID', hide: true},
        { field: 'University_Name', headerName: 'University', width: 250 },
        { field: 'Popular_Courses', headerName: 'Popular Courses', width: 200 },
        { field: 'About', headerName: 'About', width: 850 },
      ];

    const [rows, changeRows] = useState([]);
    const [cols, changeCols] = useState(columns);

    const university = useRef('');
    const program = useRef('');
    // const table = useRef('');

    Modal.setAppElement("#root");
    const [isOpen, setIsOpen] = useState(false);
    const [modText, setText] = useState('');
    // let modalText = "ABC";

    function toggleModal2(text) {
        // modalText = text;
        setText(text);
        setIsOpen(!isOpen);
    }

    function toggleModal() {
        setIsOpen(!isOpen);
    }
    
    return (
        <div className="Test">
            <div className="head"> <Typography style={beStyle} variant="h5" component="h6"> Data Hub </Typography> </div>

            <div className="head"> 
                <div style={boxStyle}>
                    <Button onClick={searchUni} variant="contained" style={{fontSize: '20px'}}> Search University </Button>
                    <TextField inputRef={university} style={beStyle} label="University"/>
                </div>
            
                <img className="queryLogo" src={header} alt="header" /> 
                
                <div style={boxStyle}>
                    <Button onClick={searchProg} variant="contained" style={{fontSize: '20px'}}> Search Program </Button>
                    <TextField inputRef={program} style={beStyle} label="Program" />
                </div>
            </div>

            <div id="root" className="mymodal"></div>
            
                <div style={newStyle}>
                    <Button onClick={executeBoth} variant="contained" style={{fontSize: '20px'}}> Combined Search </Button>
                    
                    {/* <InputLabel id="demo-controlled-open-select-label">Select Table</InputLabel>
                    <Select style={{width: "120pt"}} onChange={executeBoth} inputRef={table} >
                        <MenuItem selected disabled value=""><em>Select Table</em></MenuItem>
                        <MenuItem value="Edwise" >Courses</MenuItem>
                        <MenuItem value="IDP_Main" >About - Mini</MenuItem>
                        <MenuItem value="IDP_Courses" >About - Large</MenuItem>              
                    </Select> */}

                    <Modal
                        isOpen={isOpen}
                        onRequestClose={toggleModal}
                        contentLabel="My dialog"
                        className="mymodal"
                        overlayClassName="myoverlay"
                        closeTimeoutMS={500}
                        >
                        <p>{modText}</p>
                        <button onClick={toggleModal}>Close</button>
                    </Modal>
                </div>

            {/* {rows == [] &&
                <div style={{margin: '20pt'}}>
                    <DataGridDemo rows={rows} columns={cols}> </DataGridDemo>
                </div> } 
            */}
            <div style={{margin: '20pt'}}>
                <DataGridDemo toggleModal={toggleModal2} rows={rows} columns={cols}> </DataGridDemo>
            </div>

        </div>
    );
}

export default Access;