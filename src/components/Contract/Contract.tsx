
import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {Utils} from '../Utils';
import { Link } from 'react-router-dom';
import {IContractData, IPayment} from './ContractTypes';

interface IState {
    data: IContractData[],
    loading: boolean,
    pages: number,
    currentSort: any,
    currentFilter: any,
    pageSize: number
}

interface ILoadResult
{
    data: IContractData[],
    pages: number
}


class Contract extends Component<{}, IState> {
    static displayName = Contract.name;

    // normalised structure:
    // list - links to details page, and actions in the rows
    // details page contains tabs
    // with details on tab 1
    // and sub-lists in tab 2 - n+1
    // this component just contains the list
    // sublists are also tabs with modal forms to add and edit
    // (as in previous version)


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            pages: -1,
            currentSort: null,
            currentFilter: null,
            pageSize: 10
        };

    }

    downloadToExcel = () => {
        fetch('https://localhost:5001/api/home/getcontractdataexport', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: 1,
                pageSize: this.state.pageSize,
                sorted: this.state.currentSort,
                filtered: this.state.currentFilter
            })
        })
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    let filename = "Contractdata - " + Utils.formatDate(Date.now()).replace(/\//g, "-") + ".xlsx";
                    a.href = url;
                    a.download = filename;
                    a.click();
                    a.remove();
                });
            });
    }

    //
    // w3-styles are used to have properly behaving dropdown menu in the react-table 
    //
    render() {
        const columns = [
            {
                Header: 'Actions',
                Cell: (row: { row: { id: any; }; }) => (
                    <div className="w3-bar">
                        <button className="w3-bar-item w3-button" title="Details" >
                            <i className="fa fa-file-text-o" ></i>
                        </button>
                        <Link to={"/contractdetails/" + row.row.id }  className="w3-bar-item w3-button" title="Edit">
                            <i className="fa fa-pencil" ></i>
                        </Link>
                        <Link to={"/contractdetails/" + row.row.id } className="w3-bar-item w3-button" title="Delete" >
                            <i className="fa fa-trash-o" ></i>
                        </Link>
                        <div className="w3-dropdown-hover">
                            <button className="w3-button" title="More actions...">...</button>
                            <div className="w3-dropdown-content w3-bar-block w3-card-4">
                                <a href="#" className="w3-bar-item w3-button" >Link 1</a>
                                <a href="#" className="w3-bar-item w3-button">Link 2</a>
                                <a href="#" className="w3-bar-item w3-button">Link 3</a>
                            </div>
                        </div>
                    </div>
                )
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
                accessor: (d: IContractData) => Utils.formatDate(d.startdate),
                // date sorting
                sortMethod: Utils.dateSorter
            },
            {
                id: 'enddate',
                Header: 'End date',
                accessor: (d: IContractData) => Utils.formatDate(d.enddate),
                // date sorting
                sortMethod: Utils.dateSorter
            }
        ];
      

        return (
            <div className="upromisContent">
                <button className="w3-button w3-light-grey w3-round" title="Add new record">
                    <i className="fa fa-plus-circle" ></i>&nbsp;Add new
                </button>
                <ReactTable className="-striped"
                    data={this.state.data}
                    pages={this.state.pages}
                    loading={this.state.loading}
                    manual
                    filterable
                    minRows={1}
                    onFetchData={(state, instance) => {
                        // show the loading overlay
                        this.setState({ loading: true })
                        // fetch your data

                        fetch('https://localhost:5001/api/home/getcontractdata', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            body: JSON.stringify({
                                page: state.page,
                                pageSize: state.pageSize,
                                sorted: state.sorted,
                                filtered: state.filtered
                            })
                        })
                            .then(response => {
                                return response.json() as Promise<ILoadResult>;
                            })
                            .then(res => {
                                // Update react-table
                                this.setState({
                                    data: res.data,
                                    pages: res.pages,
                                    loading: false,
                                    currentFilter: state.filtered,
                                    currentSort: state.sorted
                                })
                            })
                            .catch(e => console.error(e))
                    }}
                    columns={columns}
                />
                <p />
                <button className="w3-button w3-light-grey w3-round" onClick={this.downloadToExcel} title="Export to Excel" >
                    <i className="fa fa-file-excel-o" ></i>&nbsp;Export
                </button>

            </div>
        );
    }
}

// required to have lazy loading
export default Contract;
