import React, { useEffect, useState} from "react";
import Portfolio from './Portfolio';
import { Row, Col, Input} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Label = styled.span`
    font-weight: bold;
    font-size: 1em;
    margin-bottom: 20px;
`;

const ActionButton = styled.span`
    cursor: pointer; 
    display: block;
    float: right;
    margin-right: 10px;
`;

const Results = styled.p`
    margin-left: 10px;
`;

const ResultsBox = styled.div`
    border: 2px solid;
`;

const Dashboard = () => {
    const [searchedResults, setSearchedResults] = useState([])
    const [companiesAddedToPortfolio, setCompaniesAddedToPortfolio] = useState([])
    const [searchText, setSearchText] = useState("")
    let navigate = useNavigate();
    const KEY = 'TUI8THT836KCPDJT';

    useEffect(()=>{
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${KEY}`)
        .then(resp => resp.json())
        .then((response) => {
            setSearchedResults(response?.bestMatches?.map((x, index)=> {
                return {
                    name: x['2. name'],
                    symbol: x['1. symbol'],
                    key: index
                };
            }))
        })
        
    },[searchText])

    const handleAddCompany = (companyItem) => {
        if(companiesAddedToPortfolio.includes(companyItem)){
            alert("Company is already in your portfolio")
        }
        else{
            const companies = [...companiesAddedToPortfolio, companyItem];
            setCompaniesAddedToPortfolio(companies)
        }
    }

    const removeCompanyFromPortfolio = (item) => {
        const companies = companiesAddedToPortfolio.filter(x => x.symbol !== item)
        setCompaniesAddedToPortfolio(companies)
    }

    const openDetails = (symbol) => {
        navigate(`/CompanyDetails/${symbol}`, { replace: true });
    }

    return(
        <>
            <Row>
                <Col xs="6">
                    <Label>Company Name</Label>
                    <Input 
                        type="search" 
                        onChange={(e)=>setTimeout(function() {setSearchText(e.target.value)}, 2000)} 
                        placeholder="Example: Apple" 
                    />
                    <Label>Search results</Label>
                    <ResultsBox>
                        {searchedResults?.map((x, index)=>{
                            return(
                                <Results key={index}>
                                    {x.symbol + " - " + x.name + " "}
                                    <ActionButton onClick={()=>(handleAddCompany(x))}>
                                        <FontAwesomeIcon icon={faPlus} size="lg" color="#00008f"/>
                                    </ActionButton>
                                </Results>
                            )
                        })} 
                    </ResultsBox>
                </Col>
                <Col xs="6">
                    <Portfolio removeCompanyFromPortfolio={removeCompanyFromPortfolio} rowsData={companiesAddedToPortfolio} openDetails={openDetails}/>
                </Col>
            </Row>
        </>
    )

}
export default Dashboard