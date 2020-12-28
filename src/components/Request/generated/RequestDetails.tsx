/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 28/Dec/2020 15:38:14
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import "react-table/react-table.css";
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ISaveMessage, ISelectValue } from '../../GeneralTypes';
import { UserContext } from '../../../context/UserContext';

import RequestForm from './RequestForm';

import RequestTeam from './RequestTeam';
import { ITeammembers } from './RequestTypes';

import { IRequestData } from './RequestTypes';
import { RequestAPI } from './RequestAPI';

import { Popup } from '../../Popup';
import Attachment from '../../Attachment/Attachment';

interface IState {
    currentData: IRequestData;
    requestStatusvalues: ISelectValue[],
    requestTypevalues: ISelectValue[],
    id: number,

    // popup stuff
    popupStyle: string,
    popupMessage: string,
    popupVisible: boolean;
}

class RequestDetails extends React.Component<RouteComponentProps<{ id?: string }>, IState> {
    static displayName = RequestDetails.name;

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
                    startDate: new Date(),
                    endDate: new Date(),
                    requestStatus: '',
                    requestStatusLabel: '',
                    requestType: '',
                    requestTypeLabel: '',
                    Teammembers: [],

                    modifier: "Unchanged"
                },
                requestStatusvalues: [],
                requestTypevalues: [],

                popupStyle: "",
                popupMessage: "",
                popupVisible: false
            };
        } else {
            // adding
            this.state =
            {
                id: 0,
                currentData: { 
                    //id: 0, code: "", description: "", title: "", startdate: new Date(), enddate: new Date(), status: "", value: 0.0, paymentInfo: [], modifier: "Added" 
                    id: 0,
                    code: '',
                    title: '',
                    description: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    requestStatus: '',
                    requestStatusLabel: '',
                    requestType: '',
                    requestTypeLabel: '',
                    Teammembers: [],

                    modifier: "Added"
                    
                },
                requestStatusvalues: [],
                requestTypevalues: [],

                popupStyle: "",
                popupMessage: "",
                popupVisible: false
            };

        }
    }

    componentDidMount() {
        // fetch the record
        if (this.state.id !== 0) {
            RequestAPI.loadOneRecord(this.state.id, this.context!.access_token)
                .then((res) => {
                    // Update form values
                    this.setState({
                        currentData: { ...res.dataSubject!, modifier: "Modified" }
                    });
                })
                .catch(e => console.error(e));
        }
        RequestAPI.loadDropdownValues("RequestStatus", this.context!.access_token)
            .then(res => {
                this.setState({ requestStatusvalues: res.data });
            }
            );

        RequestAPI.loadDropdownValues("RequestType", this.context!.access_token)
            .then(res => {
                this.setState({ requestTypevalues: res.data });
            }
            );

    }

    private saveOneRecord = (subaction: string, record: IRequestData) => {
        const action = (record.modifier === "Added") ? "POST" : (record.modifier === "Deleted") ? "DELETE" : "PUT";

        const toSave: ISaveMessage<IRequestData> =
        {
            id: record.id,
            action: action,
            dataSubject:
            {
                ...record,
                // don't forget to take the sublists as well:
                                    Teammembers: this.state.currentData.Teammembers                             },
            subaction: subaction,
            additionalData: []
        };

        RequestAPI.saveRecord(toSave, this.context!.access_token)
            .then(result => {
                if (result.success) {
                    this.setState({ ...this.state, id: result.dataSubject!.id, currentData: result.dataSubject! })
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
            .catch(e => this.setState({ popupVisible: true, popupMessage: "Save failed: " + e, popupStyle: "danger" }))
            document!.getElementById('top')!.scrollIntoView();
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
        this.setState({ popupVisible: true, popupMessage: (isAdding ? "Added" : values.modifier) + " Team line", popupStyle: "info" });
        // alert("updateTeamline " + (isAdding ? "Added" : values.modifier) + " " + JSON.stringify(this.state.currentData, null, 2));
    }

    render() {
        return (
            <React.Fragment>
                <Link id='top' to={"/Request"} className="w3-button w3-light-grey w3-round" title="Back to list">
                    <i className="fa fa-list" ></i>&nbsp;Back to List
                </Link>
                <h5>Request details for {this.state.currentData.title}</h5>
                <hr/>
                <Popup visible={this.state.popupVisible} message={this.state.popupMessage} style={this.state.popupStyle} onDismiss={() => { this.setState({ popupVisible: false }) }} />
                <Tabs defaultActiveKey='details' id='detailstab'>
                    <Tab eventKey='details' title='Details'>
                        <RequestForm buttonText="Save" currentData={this.state.currentData} 
                            requestStatusvalues={this.state.requestStatusvalues}
                            requestTypevalues={this.state.requestTypevalues}
                            saveAction={this.saveOneRecord} />
                    </Tab>
                    <Tab eventKey="teamtab" title="Team members">
                        <RequestTeam currentData={this.state.currentData} updateTeamline = {this.updateTeamline} />
                    </Tab>
                    <Tab eventKey="attachments" title="Attachments">
                        {
                            this.state.id === 0 ? <p>You shoud save the new Request before adding attachments</p> :
                                <Attachment parentItem='00000000-0000-0000-0000-000000000000' uploadedBy={this.context!.profile.name} />
                        }
                    </Tab>
                </Tabs>
            </React.Fragment>
        );
    }


}

// required to have lazy loading
export default RequestDetails;

