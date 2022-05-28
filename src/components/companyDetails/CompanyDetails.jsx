import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
background-color: white;
color: #00008f;
padding: 0.5rem;
font-size: 1em;
border: 2px solid #00008f;
margin-bottom: 20px;
`;

const Label = styled.span`
font-weight: bold;
font-size: 1em;
`;

const Title = styled.h1`
font-weight: bold;
...
`;

const Description = styled.p`
margin-top:"20px"
`;

const CompanyDetails = () => {
    const [company, setCompany] = useState()
    
    const KEY = 'TUI8THT836KCPDJT';
    let navigate = useNavigate();
    let params = useParams();

    useEffect(()=>{
        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${params.symbol}&apikey=${KEY}`)
        .then(resp => resp.json())
        .then((response) => {
            if(!response.Note){
                if(Object.keys(response).length !==0){
                    setCompany({Name: response.Name, Address: response.Address, MarketCapitalization: response.MarketCapitalization, Description: response.Description})
                }
            }
        })
    },[params])

    const handleClick = () => {
        navigate('/');
    }

    return(
        <>
            <Button onClick={handleClick}>Go Back</Button>
            {company?
            <>
                <Title>{company.Name}</Title>
                <Label>Address: </Label>
                <p>{company.Address}</p>
                <Label>MarketCapitalization: </Label>
                <p>{company.MarketCapitalization}</p>

                <Description>{company.Description}</Description>
            </>
            :
            <Title>No data avaliable</Title> 
            } 
        </>
    )
}
export default CompanyDetails