import Navbar from './components/Navbar'
import { AppRouter } from './routers/AppRouter'
import { UserContext } from '../context/UserContext'
import React, { useState } from 'react';

function App() {

  const [userData, setUserData] = useState({
    userData: {},
    setUserData: () => {}
  });

  return(
    <>
      <UserContext.Provider value={{userData, setUserData}}>
        <AppRouter/>
      </UserContext.Provider>
    </>
  )
}

export default App
