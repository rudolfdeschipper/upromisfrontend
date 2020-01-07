import React, { Component } from 'react';
import "react-table/react-table.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ContractForm from './ContractForm';
import ContractPayment from './ContractPayment';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { IContractData, IPayment } from './ContractTypes';
import { IAPIResult } from '../GeneralTypes';


interface IState {
    currentData: IContractData;
    id: number;
}

class ContractDetails extends React.Component<RouteComponentProps<{ id: string }>, IState> {
    static displayName = ContractDetails.name;

    // normalised structure:
    // list - links to details page, and actions in the rows
    // details page contains tabs
    // with details on tab 1
    // and sub-lists in tab 2 - n+1
    // this component just contains the list
    // sublists are also tabs with modal forms to add and edit
    // (as in previous version)


    constructor(props: Readonly<RouteComponentProps<{ id: string }>>) {
        super(props);
        this.state =
        {
            id: parseInt(this.props.match.params.id, 10),
            currentData: { id: 0, code: "", description: "", title: "", startdate: new Date(), enddate: new Date(), value: 0.0, paymentInfo: [], modifier: "Unchanged" }
        }
            ;
    }

    componentDidMount() {
        // fetch the record
        fetch('https://localhost:5001/api/home/getonecontractdata', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: this.state.id
            })
        })
            .then(response => {
                return response.json() as Promise<IAPIResult<IContractData>>;
            })
            .then((res) => {
                // Update form values
                console.log(res);
                this.setState({
                    currentData: res.dataSubject,
                });
            })
            .catch(e => console.error(e))

    }

    private updatePaymentline = (values: IPayment, isAdding: boolean, currentIndex?: number) => {
        if (isAdding) {
            let newData = this.state.currentData;
            const newLen = newData.paymentInfo?.push(values);

            this.setState({ currentData: newData });
        } else {
            if (currentIndex && this.state.currentData.paymentInfo) {
                let newData = this.state.currentData;
                if (newData.paymentInfo) {
                    // if we deleted a newly added element, just remove it from the list
                    if (values.modifier === "Deleted" && values.id === -1) {
                        newData.paymentInfo.splice(currentIndex, 1);
                    } else {
                        newData.paymentInfo[currentIndex] = values;
                    }
                    this.setState({ currentData: newData });
                }
            }
        }
        alert((isAdding ? "Added" : values.modifier) + " " + JSON.stringify(values, null, 2));
    }

    render() {
        return (
            <React.Fragment>
                <Link to={"/contract"} className="w3-button w3-light-grey w3-round" title="Back to list">
                    <i className="fa fa-list" ></i>&nbsp;Back to List
                </Link> <hr />
                <Tabs defaultActiveKey='details' id='detailstab'>
                    <Tab eventKey='details' title='Details'>
                        <ContractForm currentData={this.state.currentData} />
                    </Tab>
                    <Tab eventKey="payments" title="Payments">
                        <ContractPayment currentData={this.state.currentData} updatePaymentline={this.updatePaymentline} />
                    </Tab>
                </Tabs>
            </React.Fragment>
        );
    }


}

// required to have lazy loading
export default ContractDetails;
