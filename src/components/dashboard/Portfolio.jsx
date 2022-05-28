import { Table} from "reactstrap";
import { faTrashAlt, faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Portfolio = ({removeCompanyFromPortfolio, rowsData, openDetails}) => {

    const handleRemove = (item) => {
        removeCompanyFromPortfolio(item)
    };

    const openDetailsPage = (symbol) => {
        openDetails(symbol)
    }

    return(
        <Table striped>
            <thead>
                <tr>
                    <th> Company Name </th>
                    <th> Symbol </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {rowsData.map((data, index)=>{
                    const {name, symbol}= data;
                    return(
                        <tr key={index}>
                            <td>{name}</td>
                            <td>{symbol}</td>
                            <td>
                                <span style={{ cursor: "pointer"}} onClick={()=>(handleRemove(symbol))}>
                                    <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#00008f"/>
                                </span>
                                <span style={{ cursor: "pointer", marginLeft: "10px"}} onClick={()=>(openDetailsPage(symbol))}>
                                    <FontAwesomeIcon icon={faSearch} size="lg" color="#00008f"/>
                                </span>
                            </td>
                        </tr>
                    )})}
            </tbody>
        </Table>
    )
}
export default Portfolio