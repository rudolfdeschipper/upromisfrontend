/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 25/Dec/2020 17:30:09
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Utils } from '../Utils';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { IListState, ISaveMessage, IAPIResult } from '../GeneralTypes';
import { Popup } from '../Popup';
import { UserContext } from '../../context/UserContext';

import ContractDeleteForm from './ContractDeleteForm';
import { IContractData } from './ContractTypes';
import { ContractAPI } from './ContractAPI';

import { ContractActioncopy } from './ContractActioncopy';
import { ContractActionclose } from './ContractActionclose';


class Contract extends React.Component<RouteComponentProps<{}>, IListState<IContractData>> {
    static displayName = Contract.name;

    static contextType = UserContext;

    constructor(props: Readonly<RouteComponentProps<{}>>) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            pages: -1,
            currentSort: null,
            currentFilter: null,
            pageSize: 10,
            message: "",
            modalDeleteIsOpen: false,
            currentRecord: undefined,

            // popup stuff
            popupStyle: "",
            popupMessage: "",
            popupVisible: false
        };

    }

    private openDeleteModal = (row: { row: { _index: number } }) => {
        this.setState(
            {
                modalDeleteIsOpen: true,
                currentRecord: { ...this.state.data[row.row._index], modifier: "Deleted" }
            });
    }

    private closeDeleteModalNoSave = () => {
        this.setState(
            {
                modalDeleteIsOpen: false,
                currentRecord: undefined
            }
        )
    }

    private closeDeleteModalWithSave = (subaction: string, record: IContractData) => {
        this.saveOneRecord(subaction, record)
            .then(() =>
            {
                this.loadData({ page: 0, pageSize: this.state.pageSize, sorted: this.state.currentSort, filtered: this.state.currentFilter });
                this.setState(
                    {
                        modalDeleteIsOpen: false,
                        currentRecord: undefined
                    }
                )
            }
            )
            .catch(e => alert(e))
    }

    private saveOneRecord = (subaction: string, record: IContractData): Promise<IAPIResult<IContractData>> => {

        const action = (record.modifier === "Added") ? "POST" : (record.modifier === "Deleted") ? "DELETE" : "PUT";
        const toSave: ISaveMessage<IContractData> = { id: record.id, action: action, dataSubject: { ...record }, subaction: subaction, additionalData: [] };

        // alert("saveOneRecord " + JSON.stringify(toSave));

        return (ContractAPI.saveRecord(toSave, this.context!.access_token)
            .then(result => {
                if (result.success) {
                    this.setState({ ...this.state, currentRecord: result.dataSubject })
                    this.setState({ popupVisible: true, popupMessage: "Save result: " + result.message, popupStyle: "success" });
                } else {
                    this.setState({ popupVisible: true, popupMessage: "Save failed.", popupStyle: "danger" });
                }
                return result;
            }
            )
        );
    }

    private loadData = (state: any) => {
        // show the loading overlay
        this.setState({ loading: true })
        // fetch your data

        ContractAPI.loadList({ page: state.page, pageSize: state.pageSize, sorted: state.sorted, filtered: state.filtered }, this.context!.access_token)
            .then(res => {
                // Update react-table
                this.setState({
                    data: res.data,
                    pages: res.pages,
                    currentFilter: state.filtered,
                    currentSort: state.sorted,
                    message: res.message ? res.message : this.state.message
                })
            })
            .catch(e => console.error(e))
            .finally(() => this.setState({ loading: false }))
    }

    downloadToExcel = () => {
        ContractAPI.loadListForExport("Contract data", { page: 1, pageSize: this.state.pageSize, sorted: this.state.currentSort, filtered: this.state.currentFilter }, this.context!.access_token);
    }



    //
    // w3-styles are used to have properly behaving dropdown menu in the react-table 
    //
    render() {
        const columns = [
            {
                Header: 'Actions',
                Cell: (row: { row: { id: any, _index: number; }; }) => (
                    <div className="w3-bar">
                        <Link to={"/Contractdetails/" + row.row.id} className="w3-bar-item w3-button" title="Edit">
                            <i className="fa fa-pencil" ></i>
                        </Link>
                        <button onClick={() => { this.openDeleteModal(row); }} className="w3-bar-item w3-button" title="Delete" >
                            <i className="fa fa-trash-o" ></i>
                        </button>
                        <div className="w3-dropdown-hover">
                            <button className="w3-button" title="More actions...">...</button>
                            <div className="w3-dropdown-content w3-bar-block w3-card-4">
                                <a onClick={() => { this.performActioncopy(row); }} className="w3-bar-item w3-button" >Copy</a>
                                <a onClick={() => { this.performActionclose(row); }} className="w3-bar-item w3-button" >Close</a>
                            </div>
                        </div>
                    </div>
                ),
                sortable: false
            },
            {
                Header: 'ID',
   				accessor: 'id',
   				id: 'id',
                show: false
            }
,             {
                Header: 'Code',
   				accessor: 'code',
   				id: 'code',
                show: true
            }
,             {
                Header: 'Title',
   				accessor: 'title',
   				id: 'title',
                show: true
            }
,             {
                Header: 'Description',
   				accessor: 'description',
   				id: 'description',
                show: false
            }
,             {
                Header: 'Contract type',
   				accessor: 'contractTypeLabel',
   				id: 'contractType',
                show: true
            }
,             {
                Header: 'Status',
   				accessor: 'contractStatusLabel',
   				id: 'contractStatus',
                show: true
            }
,             {
                Header: 'Start date',
                accessor: (d: IContractData) => Utils.formatDate(d.startDate),
                // date sorting
                sortMethod: Utils.dateSorter,
				id: 'startDate',
                show: true
            }
,             {
                Header: 'End date',
                accessor: (d: IContractData) => Utils.formatDate(d.endDate),
                // date sorting
                sortMethod: Utils.dateSorter,
				id: 'endDate',
                show: true
            }
,             {
                Header: 'Budget',
 				accessor: (d: IContractData) => Utils.formatAmount(d.budget),
				style: { 'textAlign': "right" },
 				id: 'budget',
                show: true
            }
,             {
                Header: 'Proposal',
   				accessor: 'proposalLabel',
   				id: 'proposal',
                show: true
            }
        ];


        return (
            <div className="upromisContent">
                <h5>List of Contracts</h5>
                <Link className="w3-button w3-light-grey w3-round" title="Add new record" to="/Contractdetails/add" >
                    <i className="fa fa-plus-circle" ></i>&nbsp;Add new
                </Link>
                <Popup visible={this.state.popupVisible} message={this.state.popupMessage} style={this.state.popupStyle} onDismiss={() => { this.setState({ popupVisible: false }) }} />
                <ReactTable className="-striped"
                    data={this.state.data}
                    pages={this.state.pages}
                    loading={this.state.loading}
                    manual
                    filterable
                    minRows={1}
                    onFetchData={this.loadData}
                    columns={columns}
                />
                <p />
                <button className="w3-button w3-light-grey w3-round" onClick={this.downloadToExcel} title="Export to Excel" >
                    <i className="fa fa-file-excel-o" ></i>&nbsp;Export
                </button>
                <Modal isOpen={this.state.modalDeleteIsOpen} >
                    <ModalHeader toggle={this.closeDeleteModalNoSave} charCode="&times;" >Delete Contract</ModalHeader>
                    <ModalBody>
                        <ContractDeleteForm buttonText="Delete" currentData={this.state.currentRecord as IContractData}  saveAction={this.closeDeleteModalWithSave} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    performActioncopy = async (row: { row: { id: any; _index: number; }; }) => {
        // alert("perform Action 1: on " + JSON.stringify(this.state.data[row.row._index]));
        await ContractActioncopy.perform(row.row.id,this.context!.access_token)
        .then( value => {
            this.saveOneRecord(value.subaction, value.dataSubject);
            this.loadData({ page: 0, pageSize: this.state.pageSize, sorted: this.state.currentSort, filtered: this.state.currentFilter });
        })
        .catch( ex => 
            this.setState({ popupVisible: true, popupMessage: "Action failed: " + ex.message, popupStyle: "error" })
        );
    }
    
    performActionclose = async (row: { row: { id: any; _index: number; }; }) => {
        // alert("perform Action 1: on " + JSON.stringify(this.state.data[row.row._index]));
        await ContractActionclose.perform(row.row.id,this.context!.access_token)
        .then( value => {
            this.saveOneRecord(value.subaction, value.dataSubject);
            this.loadData({ page: 0, pageSize: this.state.pageSize, sorted: this.state.currentSort, filtered: this.state.currentFilter });
        })
        .catch( ex => 
            this.setState({ popupVisible: true, popupMessage: "Action failed: " + ex.message, popupStyle: "error" })
        );
    }
    
}

// required to have lazy loading
export default Contract;

