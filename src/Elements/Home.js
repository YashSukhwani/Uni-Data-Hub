import logo from '../White Logo.svg';
import './Home.css';
import Button from '@material-ui/core/Button';
import { useState, useRef, useEffect } from 'react';
import Access from './Access';

import Modal from "./Modal";
import useModal from './useModal';

function Home(props) {

  const {isShowing, toggle} = useModal();
  const [loggedIn, changeAuthState] = useState(0);

  // signIn({email}, {pass})
  
  const doSignOut = () => {
    this.auth.signOut();
  }

  if (loggedIn == 1) {
    return <Access></Access>
  }

  return (
    <div className="App">
      <header className="App-header">

        {/* <img className="homeLogo" src={logo} alt="logo" /> */}
        
        <div className="outer">
          <div className="split"></div>
          <div className="Main">
            <h3> The Hub </h3>
            <a className="App-link" href="https://envisionoverseas.in" target="_blank" rel="noopener noreferrer">Visit Our Website</a>
            <br></br>
            <Modal overlayClassName="myoverlay"
              className="mymodal"
              changeAuth={changeAuthState}

              isShowing={isShowing}
              hide={toggle}
            />
            <br></br>
            <Button variant="contained" style={{fontSize: '20px'}} onClick={toggle}>
              Log In
            </Button>
          </div>
        </div>
        
      </header>
    </div>
  );
}

export default Home;