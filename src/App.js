import { ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import Form from './components/Form';
import Login from './components/Login';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import QueryBuilder from './components/QueryBuilder';
import FloatingButton from './FloatingButton';
import Footer from './components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
          <Route path="/searchform" element={ isAuthenticated ? <Form/> : <Login setIsAuthenticated={setIsAuthenticated} /> }/>
          <Route path="/querybuilder" element={ <QueryBuilder/> }/>
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
