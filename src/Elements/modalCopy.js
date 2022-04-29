import React from 'react';
import ReactDOM from 'react-dom';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useState, useRef, useEffect } from 'react';

import firebase from './firebase';
import 'firebase/auth';

const textStyle = {
    fontFamily: 'Raleway',
    fontWeight: '34pt',
    padding: '9pt',
    width: '60%'
};

const boxStyle = {
    display: "flex", 
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: "center",
};

const signIn = (email, password) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(() => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log('Logged In');
    })
    .catch(() => {
        console.log('Error');
    })
    });
}

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(

  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <p>
          Hello, I'm a modal.
        </p>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>

        </div>
        <div className="modalBody" style={boxStyle}>
            <TextField ref="email" style={textStyle} label="Email" />
            <TextField ref="pass" style={textStyle} label="Password" />
            <Button variant="contained" onClick={signIn(this.refs.email.current.value, this.refs.pass.current.value)} style={{fontSize: '20px'}}>
            Submit
            </Button>
        </div>
        
      </div>
    </div>
  </React.Fragment>, document.body
  
) : null;

export default Modal;