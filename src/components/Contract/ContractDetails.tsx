import React from 'react';
import "react-table/react-table.css";
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ISaveMessage, ISelectValue } from '../GeneralTypes';
import { UserContext } from '../../context/UserContext';

import ContractForm from './ContractForm';
import ContractPayment from './ContractPayment';
import { IContractData, IPayment } from './ContractTypes';
import { ContractAPI } from './ContractAPI';
import { Popup } from '../Popup';

import Attachment from '../Attachment/Attachment';

interface IState {
    currentData: IContractData;
    statusvalues: ISelectValue[],
    typevalues: ISelectValue[],
    id: number,

    // popup stuff
    popupStyle: string,
    popupMessage: string,
    popupVisible: boolean;
}

class ContractDetails extends React.Component<RouteComponentProps<{ id?: string }>, IState> {
    static displayName = ContractDetails.name;

    // normalised structure:
    // list - links to details page, and actions in the rows
    // details page contains tabs
    // with details on tab 1
    // and sub-lists in tab 2 - n+1
    // this component just contains the list
    // sublists are also tabs with modal forms to add and edit
    // (as in previous version)

    //Declare the User context to access the User properties.
    static contextType = UserContext;

    constructor(props: Readonly<RouteComponentProps<{ id?: string }>>) {
        super(props);

        if (this.props.match.params.id && this.props.match.params.id !== "add") {
            this.state =
            {
                id: parseInt(this.props.match.params.id, 10),
                currentData: { id: 0, code: "", description: "", title: "", createdOn: new Date(), createdBy: "", updatedOn: new Date(), updatedBy: "", startDate: new Date(), endDate: new Date(), status: "", contractType: 0, value: 0.0, accountInfoId: 0, parentContractId: 0, paymentInfo: [], teamComposition: [], modifier: "Unchanged" },
                statusvalues: [],
                typevalues: [],

                popupStyle: "",
                popupMessage: "",
                popupVisible: false
            };
        } else {
            // adding
            this.state =
            {
                id: -1,
                currentData: { id: -1, code: "", description: "", title: "", createdOn: new Date(), createdBy: "", updatedOn: new Date(), updatedBy: "", startDate: new Date(), endDate: new Date(), status: "", contractType: 0, value: 0.0, accountInfoId: 0, parentContractId: 0, paymentInfo: [], teamComposition: [], modifier: "Added" },
                statusvalues: [],
                typevalues: [],

                popupStyle: "",
                popupMessage: "",
                popupVisible: false
            };

        }
    }

    componentDidMount() {
        // fetch the record
        if (this.state.id !== -1) {
            ContractAPI.loadOneRecord(this.state.id)
                .then((res) => {
                    // Update form values
                    this.setState({
                        currentData: { ...res.dataSubject, modifier: "Modified" }
                    });
                })
                .catch(e => console.error(e));
        }
        ContractAPI.loadDropdownValues("ContractStatus")
            .then(res => {
                this.setState({ statusvalues: res.data });
            }
            );
        ContractAPI.loadDropdownValues("ContractType")
            .then(res => {
                this.setState({ typevalues: res.data });
            }
            )
    }

    private saveOneRecord = (subaction: string, record: IContractData) => {
        const action = (record.modifier === "Added") ? "POST" : (record.modifier === "Deleted") ? "DELETE" : "PUT";

        const toSave: ISaveMessage<IContractData> =
        {
            id: record.id,
            action: action,
            dataSubject:
            {
                ...record,
                // don't forget to take the sublists as well:
                teamComposition: this.state.currentData.teamComposition,
                paymentInfo: this.state.currentData.paymentInfo
            },
            subaction: subaction,
            additionalData: []
        };

        ContractAPI.saveRecord(toSave)
            .then(result => {
                if (result.success) {
                    this.setState({ ...this.state, currentData: result.dataSubject })
                    // put a toast here
                    this.setState({ popupVisible: true, popupMessage: "Save result: " + result.message, popupStyle: "success" });
                    //alert("Save result: " + result.message)
                } else {
                    // put a toast here
                    //alert("Save failed " + result.message)
                    this.setState({ popupVisible: true, popupMessage: "Save failed: " + result.message, popupStyle: "danger" });
                }
            }
            )
            .catch(e => alert("Unexpected error: " + e))
    }

    private updatePaymentline = (values: IPayment, isAdding: boolean, currentIndex?: number) => {

        //alert("Adding: " + isAdding + " Values: " + JSON.stringify(values) + "Row number: "+ currentIndex);

        if (isAdding) {
            let newData = this.state.currentData;

            // const _ = newData.paymentInfo?.push(values);

            this.setState({ currentData: newData });
        } else {
            if (typeof (currentIndex) === "number" && this.state.currentData.paymentInfo) {
                const newData = this.state.currentData;
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
        this.setState({ popupVisible: true, popupMessage: (isAdding ? "Added" : values.modifier) + " paymentline", popupStyle: "info" });
        //alert("updatePaymentline " + (isAdding ? "Added" : values.modifier) + " " + JSON.stringify(this.state.currentData));
    }

    render() {
        return (
            <React.Fragment>
                <Link to={"/contract"} className="w3-button w3-light-grey w3-round" title="Back to list">
                    <i className="fa fa-list" ></i>&nbsp;Back to List
                </Link> <hr />
                <Popup visible={this.state.popupVisible} message={this.state.popupMessage} style={this.state.popupStyle} onDismiss={() => { this.setState({ popupVisible: false }) }} />
                <Tabs defaultActiveKey='details' id='detailstab'>
                    <Tab eventKey='details' title='Details'>
                        <ContractForm buttonText="Save" currentData={this.state.currentData} statusvalues={this.state.statusvalues} typevalues={this.state.typevalues} saveAction={this.saveOneRecord} />
                    </Tab>
                    <Tab eventKey="payments" title="Payments">
                        <ContractPayment currentData={this.state.currentData} updatePaymentline={this.updatePaymentline} />
                    </Tab>
                    <Tab eventKey="attachments" title="Attachments">
                        {
                            this.state.id === -1 ? <p>You shoud save the new Contract before adding attachments</p> :
                                <Attachment parentItem='00000000-0000-0000-0000-000000000000' uploadedBy={this.context.profile.name} />
                        }
                    </Tab>
                </Tabs>
            </React.Fragment>
        );
    }


}

// required to have lazy loading
export default ContractDetails;
