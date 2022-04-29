import React from 'react';
import ReactDOM from 'react-dom';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useState, useRef, useEffect } from 'react';
import './modal.css';

import firebase from './firebase';
import 'firebase/auth';

const textStyle = {
    fontFamily: 'Raleway',
    fontWeight: '34pt',
    padding: '9pt',
    width: '60%',
};

function ModalData(props) {
    const email = useRef('');
    const pass = useRef('');
    const [displayText, changeText] = useState('Enter Login Details');

    function signIn() {
        const eMail = email.current.value;
        const password = pass.current.value;
        
        firebase.auth().signInWithEmailAndPassword(eMail, password)
        .then(() => {
            console.log('Logged In');
            changeText('Redirecting ...');
            props.loginFunc(1);
        })
        .catch(() => {
            console.log('Login Failed');
            changeText('Login Failed. Please Try Again.');
            
            email.current.value = "";
            pass.current.value = "";
        })
    }

    return (  
    <div>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
            <span className="modal-header">
                    <p>{displayText}</p>
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={props.doStuff}>
                    <span aria-hidden="true">&times;</span>
                    </button>
            </span>
            <div className="modalBody">
                <TextField inputRef={email} style={textStyle} label="Email" />
                <TextField inputRef={pass} style={textStyle} label="Password" type="password" />
                <Button onClick={signIn} variant="contained" style={{fontSize: '20px'}}>
                Submit
                </Button>
            </div>
        </div>
        </div>
    </div>
    );
}

const Modal = ({ isShowing, hide, changeAuth}) => isShowing ? ReactDOM.createPortal(

  <React.Fragment>
      <ModalData doStuff={hide} loginFunc={changeAuth}>
      </ModalData>
  </React.Fragment>, document.body
  
) : null;

export default Modal;