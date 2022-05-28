import './App.css';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import CompanyDetails from './components/companyDetails/CompanyDetails';
import React from 'react';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: #00008f;
  border:2px solid;
  padding: 20px;
  margin-bottom:0px;
`;

const Content = styled.div`
  font-size: 20px;
  padding: 40px;
`;

function App() {
  return (
    <React.Fragment>
      <Title>SDH Frontend Homework</Title>
      <Router>
        <Content>
          <Routes>
            <Route exact path="/" element={<Dashboard/>}></Route>
            <Route path="/CompanyDetails">
              <Route path=":symbol" element={<CompanyDetails />} />
            </Route>
          </Routes>
        </Content>
      </Router>
    </React.Fragment>
  );
}

export default App;
