import React, { Component } from 'react';
import { Formik, Field } from 'formik';
//import * as Yup from 'yup';
import { Form, Datepicker } from 'react-formik-ui'
import { Utils } from '../Utils';
import ReactTable from 'react-table';
import {IContractData, IPayment} from './ContractTypes';


interface IProps {
    currentData: IContractData;
}

interface IState {
    modalAddIsOpen: boolean,
    modalEditIsOpen: boolean,
    modalDeleteIsOpen: boolean,
    currentPaymentRecord: IPayment | null
}

class ContractPayment extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            modalAddIsOpen: false,
            modalEditIsOpen: false,
            modalDeleteIsOpen: false,
            currentPaymentRecord: null
        };

        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.closeEditModalNoSave = this.closeEditModalNoSave.bind(this);

        this.openAddModal = this.openAddModal.bind(this);
        this.afterOpenAddModal = this.afterOpenAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);

        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.afterOpenDeleteModal = this.afterOpenDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.setValue = this.setValue.bind(this);
    }

    openAddModal() {
        this.setState({ modalAddIsOpen: true });
    }

    afterOpenAddModal() {
        // references are now sync'd and can be accessed.
    }

    closeAddModal() {
        this.setState({ modalAddIsOpen: false });
    }

    openEditModal(row: { row: { id: any; }; }) {
        fetch('https://localhost:5001/api/home/getonecontractpaymentdata', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: row.row.id
            })
        })
            .then(response => response.json())
            .then((res) => {
                // Update form values
                // currentData: { ...res, startdate: this.formatDateForEdit(res.startdate), enddate: this.formatDateForEdit(res.enddate) },
                this.setState({
                    currentPaymentRecord: { ...res },
                    modalEditIsOpen: true,
                })
            })
            .catch(e => console.error(e))
    }

    closeEditModal(e: Event) {
        // update the record
        fetch('https://localhost:5001/api/home/putonecontractpaymentdata', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { ...this.state.currentPaymentRecord })
        }
        )
            .then(response => response.json())
            .then((res) => {
                alert(res.statusCode.toString());
                e.preventDefault();
            })
            .catch(e => console.error(e))

        this.setState({ 
            modalEditIsOpen: false, 
            currentPaymentRecord: null });
    }

    closeEditModalNoSave() {
        this.setState({ 
            modalEditIsOpen: false, 
            currentPaymentRecord: null });
    }

    openDeleteModal(row: { row: { id: any; }; }) {
        this.setState({ modalDeleteIsOpen: true });
    }

    afterOpenDeleteModal() {
        // references are now sync'd and can be accessed.
    }

    closeDeleteModal() {
        this.setState({ modalDeleteIsOpen: false });
    }

    setValue(property: string, value: any) {
        let cd = this.state.currentPaymentRecord as any;
        cd[property] = value;

        this.setState({ currentPaymentRecord: cd });
    }

    render() {
        const paymentcolumns = [
            {
                Header: 'Actions',
                Cell: (row: { row: { id: any; }; }) => (
                    <div className="w3-bar">
                        <button className="w3-bar-item w3-button" title="Details" >
                            <i className="fa fa-file-text-o" ></i>
                        </button>
                        <button className="w3-bar-item w3-button" title="Edit" onClick={() => { this.openEditModal(row); }}>
                            <i className="fa fa-pencil" ></i>
                        </button>
                        <button className="w3-bar-item w3-button" title="Delete" onClick={() => { this.openDeleteModal(row); }}>
                            <i className="fa fa-trash-o" ></i>
                        </button>
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
                Header: 'Description',
                accessor: 'description'
            },
            {
                id: 'plannedinvoicedate',
                Header: 'Planned date',
                accessor: (d: any) => Utils.formatDate(d.plannedinvoicedate),
                // date sorting
                sortMethod: Utils.dateSorter
            },
            {
                id: 'actualinvoicedate',
                Header: 'Actual date',
                accessor: (d: any) => Utils.formatDate(d.actualinvoicedate),
                // date sorting
                sortMethod: Utils.dateSorter
            },
            {
                id: 'amount',
                Header: 'Amount',
                accessor: (d: any) => Utils.formatAmount(d.amount),
                style: { 'textAlign': "right" }
            }
        ];

        const tabledata = this.props.currentData.paymentInfo as IPayment[];
        
        return (
            <div>
            <button className="w3-button w3-light-grey w3-round" onClick={this.openAddModal} title="Add new record">
                <i className="fa fa-plus-circle" ></i>&nbsp;Add new
            </button>
            {this.props.currentData && (
                <ReactTable className="-striped"
                    data={tabledata}
                    minRows={1}
                    columns={paymentcolumns}
                />)
            }
        </div>
                );
    }
};

export default ContractPayment;
