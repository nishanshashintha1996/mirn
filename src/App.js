import { ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import Form from './components/Form';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className='App'>
      <ChakraProvider>

        <Router>
          <Routes>
            <Route exact path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
            <Route path="/" element={ isAuthenticated ? <Form/> : <Login setIsAuthenticated={setIsAuthenticated} /> }/>
          </Routes>
        </Router>

      </ChakraProvider>
    </div>
  );
}

export default App;
