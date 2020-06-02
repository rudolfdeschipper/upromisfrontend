import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Utils } from '../Utils';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { IListState, ISaveMessage, IAPIResult } from '../GeneralTypes';
import ContractDeleteForm from './ContractDeleteForm';
import { IContractData } from './ContractTypes';
import { ContractAPI } from './ContractAPI';
import { Popup } from '../Popup';

class Contract extends React.Component<RouteComponentProps<{}>, IListState<IContractData>> {
    static displayName = Contract.name;

    // normalised structure:
    // list - links to details page, and actions in the rows
    // details page contains tabs
    // with details on tab 1
    // and sub-lists in tab 2 - n+1
    // this component just contains the list
    // sublists are also tabs with modal forms to add and edit
    // (as in previous version)


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
            currentRecord: null,

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
                currentRecord: null
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
                        currentRecord: null
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

        const res = (ContractAPI.saveRecord(toSave)
            .then(result => {
                if (result.success) {
                    this.setState({ ...this.state, currentRecord: result.dataSubject })
                    this.setState({ popupVisible: true, popupMessage: "Save result: " + result.message, popupStyle: "success" });
                } else {
                    this.setState({ popupVisible: true, popupMessage: "Save failed: " + result.message, popupStyle: "danger" });
                }
            }
            )
        ) as Promise<IAPIResult<IContractData>>;
        return res;
    }

    private loadData = (state: any) => {
        // show the loading overlay
        this.setState({ loading: true })
        // fetch your data

        ContractAPI.loadList({ page: state.page, pageSize: state.pageSize, sorted: state.sorted, filtered: state.filtered })
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
        ContractAPI.loadListForExport("Contract data", { page: 1, pageSize: this.state.pageSize, sorted: this.state.currentSort, filtered: this.state.currentFilter })
            ;
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
                        <Link to={"/contractdetails/" + row.row.id} className="w3-bar-item w3-button" title="Edit">
                            <i className="fa fa-pencil" ></i>
                        </Link>
                        <button onClick={() => { this.openDeleteModal(row); }} className="w3-bar-item w3-button" title="Delete" >
                            <i className="fa fa-trash-o" ></i>
                        </button>
                        <div className="w3-dropdown-hover">
                            <button className="w3-button" title="More actions...">...</button>
                            <div className="w3-dropdown-content w3-bar-block w3-card-4">
                            <button onClick={() => { this.performAction1(row); }} className="w3-bar-item w3-button" >Action 1</button>
                            <button onClick={() => { return false; }} className="w3-bar-item w3-button" >Link 2</button>
                            <button onClick={() => { return false; }} className="w3-bar-item w3-button" >Link 3</button>
                            </div>
                        </div>
                    </div>
                ),
                sortable: false
            },
            {
                Header: 'ID',
                accessor: 'id',
                show: false
            },
            {
                Header: 'Code',
                accessor: 'code'
            },
            {
                Header: 'Title',
                accessor: 'title'
            },
            {
                Header: 'Status',
                accessor: 'status'
            },
            {
                Header: 'Description',
                accessor: 'description'
            },
            {
                id: 'value',
                Header: 'Value',
                accessor: (d: IContractData) => Utils.formatAmount(d.value),
                style: { 'textAlign': "right" }
            },
            {
                id: 'startdate',
                Header: 'Start date',
                accessor: (d: IContractData) => Utils.formatDate(d.startDate),
                // date sorting
                sortMethod: Utils.dateSorter
            },
            {
                id: 'enddate',
                Header: 'End date',
                accessor: (d: IContractData) => Utils.formatDate(d.endDate),
                // date sorting
                sortMethod: Utils.dateSorter
            }
        ];


        return (
            <div className="upromisContent">
                <Link className="w3-button w3-light-grey w3-round" title="Add new record" to="/contractdetails/add" >
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
                        <ContractDeleteForm buttonText="Delete" currentData={this.state.currentRecord as IContractData} saveAction={this.closeDeleteModalWithSave} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    performAction1 = (row: { row: { id: any; _index: number; }; }) => {
        // alert("perform Action 1: on " + JSON.stringify(this.state.data[row.row._index]));
        this.saveOneRecord("Action 1", this.state.data[row.row._index]);
    }
}

// required to have lazy loading
export default Contract;
