/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 09/Jan/2021 16:57:19
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import "react-table/react-table.css";
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IBusinessRuleResult, ISaveMessage, ISelectValue } from '../../GeneralTypes';
import { UserContext } from '../../../context/UserContext';

import ContractForm from './ContractForm';

import ContractPayment from './ContractPayment';
import { IPayments } from './ContractTypes';
import ContractTeam from './ContractTeam';
import { ITeammembers } from './ContractTypes';

import { IContractData } from './ContractTypes';
import { ContractAPI } from './ContractAPI';

import { Popup } from '../../Popup';
import Attachment from '../../Attachment/Attachment';

interface IState {
    currentData: IContractData;
    contractTypevalues: ISelectValue[],
    contractStatusvalues: ISelectValue[],
    proposalvalues: ISelectValue[],
    id: number,

    // popup stuff
    popupStyle: string,
    popupMessage: string,
    popupErrorList?: IBusinessRuleResult[],
    popupVisible: boolean;
}

class ContractDetails extends React.Component<RouteComponentProps<{ id?: string }>, IState> {
    static displayName = ContractDetails.name;

    static contextType = UserContext;

    constructor(props: Readonly<RouteComponentProps<{ id?: string }>>) {
        super(props);
        if (this.props.match.params.id && this.props.match.params.id !== "add") {
            this.state =
            {
                id: parseInt(this.props.match.params.id, 10),
                currentData: { 
                    
                    //id: 0, code: "", description: "", title: "", startdate: new Date(), enddate: new Date(), status: "", value: 0.0, paymentInfo: [], modifier: "Unchanged" 
                    id: 0,
                    code: '',
                    title: '',
                    description: '',
                    contractType: '',
                    contractTypeLabel: '',
                    contractStatus: '',
                    contractStatusLabel: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    budget: 0.0,
                    proposal: 0,
                    proposalLabel: '',
                    Payments: [],
                    Teammembers: [],

                    modifier: "Unchanged"
                },
                contractTypevalues: [],
                contractStatusvalues: [],
                proposalvalues: [],

                popupStyle: "",
                popupMessage: "",
                popupErrorList: [],
                popupVisible: false
            };
        } else {
            // adding
            this.state =
            {
                id: 0,
                currentData: 
                    this.props.history.location.state ? 
                    this.props.history.location.state as IContractData 
                    : { 
                    id: 0,
                    code: '',
                    title: '',
                    description: '',
                    contractType: '',
                    contractTypeLabel: '',
                    contractStatus: '',
                    contractStatusLabel: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    budget: 0.0,
                    proposal: 0,
                    proposalLabel: '',
                    Payments: [],
                    Teammembers: [],

                    modifier: "Added"
                    
                },
                contractTypevalues: [],
                contractStatusvalues: [],
                proposalvalues: [],

                popupStyle: "",
                popupMessage: "",
                popupErrorList: [],
                popupVisible: false
            };

        }
    }

    componentDidMount() {
        // fetch the record
        if (this.state.id !== 0) {
            ContractAPI.loadOneRecord(this.state.id, this.context!.access_token)
                .then((res) => {
                    // Update form values
                    this.setState({
                        currentData: { ...res.dataSubject!, modifier: "Modified" }
                    });
                })
                .catch(e => console.error(e));
        }
        ContractAPI.loadDropdownValues("ContractType", this.context!.access_token)
            .then(res => {
                this.setState({ contractTypevalues: res.data });
            }
            );

        ContractAPI.loadDropdownValues("ContractStatus", this.context!.access_token)
            .then(res => {
                this.setState({ contractStatusvalues: res.data });
            }
            );

        ContractAPI.loadDropdownValues("ProposalIdReference", this.context!.access_token)
            .then(res => {
                this.setState({ proposalvalues: res.data });
            }
            );

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
                                    Payments: this.state.currentData.Payments ,                                     Teammembers: this.state.currentData.Teammembers                             },
            subaction: subaction,
            additionalData: []
        };

        ContractAPI.saveRecord(toSave, this.context!.access_token)
            .then(result => {
                if (result.success) {
                    this.setState({ ...this.state, id: result.dataSubject!.id, currentData: result.dataSubject! })
                    // put a toast here
                    this.setState({ popupVisible: true, popupMessage: "Save result: " + result.message, popupErrorList: result.additionalInfo, popupStyle: "success" });
                    console.log("Save result: " + result.message)
                } else {
                    // put a toast here
                    console.error("Save failed " + JSON.stringify(result))
                    this.setState({ popupVisible: true, popupMessage: "Save failed: " + result.message, popupErrorList: result.additionalInfo, popupStyle: "danger" });
                }
            }
            )
            .catch(e => {
                console.error("saveRecord exception:");
                console.exception(e);
                this.setState({ popupVisible: true, popupMessage: "Save failed: " + e, popupErrorList: [], popupStyle: "danger" })
            })
            document!.getElementById('top')!.scrollIntoView();
    }

    private updatePaymentline = (values: IPayments, isAdding: boolean, currentIndex?: number) => {
        if (isAdding) {
            let newData = this.state.currentData;

            if(newData.Payments === undefined || newData.Payments === null)
            {
                newData.Payments = [];
            }
            newData.Payments.push(values);

            this.setState({ currentData: newData });
        } else {
            if (typeof (currentIndex) === "number" && this.state.currentData.Payments) {
                let newData = this.state.currentData;
                if (newData.Payments) {
                    // if we deleted a newly added element, just remove it from the list
                    if (values.modifier === "Deleted" && values.id === 0) {
                        newData.Payments.splice(currentIndex, 1);
                    } else {
                        newData.Payments[currentIndex] = values;
                    }
                    this.setState({ currentData: newData });
                }
            }
        }
        this.setState({ popupVisible: true, popupMessage: (isAdding ? "Added" : values.modifier) + " Payment line", popupErrorList: [],popupStyle: "info" });
        // alert("updatePaymentline " + (isAdding ? "Added" : values.modifier) + " " + JSON.stringify(this.state.currentData, null, 2));
    }
    private updateTeamline = (values: ITeammembers, isAdding: boolean, currentIndex?: number) => {
        if (isAdding) {
            let newData = this.state.currentData;

            if(newData.Teammembers === undefined || newData.Teammembers === null)
            {
                newData.Teammembers = [];
            }
            newData.Teammembers.push(values);

            this.setState({ currentData: newData });
        } else {
            if (typeof (currentIndex) === "number" && this.state.currentData.Teammembers) {
                let newData = this.state.currentData;
                if (newData.Teammembers) {
                    // if we deleted a newly added element, just remove it from the list
                    if (values.modifier === "Deleted" && values.id === 0) {
                        newData.Teammembers.splice(currentIndex, 1);
                    } else {
                        newData.Teammembers[currentIndex] = values;
                    }
                    this.setState({ currentData: newData });
                }
            }
        }
        this.setState({ popupVisible: true, popupMessage: (isAdding ? "Added" : values.modifier) + " Team line", popupErrorList: [],popupStyle: "info" });
        // alert("updateTeamline " + (isAdding ? "Added" : values.modifier) + " " + JSON.stringify(this.state.currentData, null, 2));
    }

    render() {
        return (
            <React.Fragment>
                <Link id='top' to={"/Contract"} className="w3-button w3-light-grey w3-round" title="Back to list">
                    <i className="fa fa-list" ></i>&nbsp;Back to List
                </Link>
                <h5>Contract details for {this.state.currentData.title}</h5>
                <hr/>
                <Popup visible={this.state.popupVisible} message={this.state.popupMessage} style={this.state.popupStyle} onDismiss={() => { this.setState({ popupVisible: false }) }} errorList={this.state.popupErrorList}/>
                <Tabs defaultActiveKey='details' id='detailstab'>
                    <Tab eventKey='details' title='Details'>
                        <ContractForm buttonText="Save" currentData={this.state.currentData} 
                            contractTypevalues={this.state.contractTypevalues}
                            contractStatusvalues={this.state.contractStatusvalues}
                            proposalvalues={this.state.proposalvalues}
                            saveAction={this.saveOneRecord} />
                    </Tab>
                    <Tab eventKey="paymenttab" title="Payments">
                        <ContractPayment currentData={this.state.currentData} updatePaymentline = {this.updatePaymentline} />
                    </Tab>
                    <Tab eventKey="teamtab" title="Team members">
                        <ContractTeam currentData={this.state.currentData} updateTeamline = {this.updateTeamline} />
                    </Tab>
                    <Tab eventKey="attachments" title="Attachments">
                        {
                            this.state.id === 0 ? <p>You shoud save the new Contract before adding attachments</p> :
                                <Attachment parentItem='00000000-0000-0000-0000-000000000000' uploadedBy={this.context!.profile.name} />
                        }
                    </Tab>
                </Tabs>
            </React.Fragment>
        );
    }


}

// required to have lazy loading
export default withRouter(ContractDetails);

