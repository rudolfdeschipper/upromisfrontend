/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 27/Dec/2020 17:43:06
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactTable from 'react-table';
import { Utils } from '../../Utils';

import { IContractData, IPayments } from './ContractTypes';
import ContractPaymentForm from './ContractPaymentForm';

import { ISelectValue } from '../../GeneralTypes';
import { ContractAPI } from './ContractAPI';
import { UserContext } from '../../../context/UserContext';

interface IProps {
    currentData: IContractData;
    updatePaymentline: (values: IPayments, isAdding: boolean, currentIndex?: number) => void;
}

interface IState {
    modalAddIsOpen: boolean,
    modalEditIsOpen: boolean,
    modalDeleteIsOpen: boolean,
    currentPaymentRecord: IPayments | null,
    currentIndex?: number
}

class ContractPayment extends React.Component<IProps, IState> {

    static contextType = UserContext;

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            modalAddIsOpen: false,
            modalEditIsOpen: false,
            modalDeleteIsOpen: false,
            currentPaymentRecord: null,
        };

    }

    componentDidMount() {

    }


    private openAddModal = () => {
        this.setState({
            modalAddIsOpen: true,
            currentPaymentRecord: { 
                id : 0,
                description : '',
                plannedInvoiceDate : new Date(),
                actualInvoiceDate : new Date(),
                amount : 0.0,
            modifier: "Unchanged" }
        });
    }

    private closeAddModalNoSave = () => {
        this.setState({
            modalAddIsOpen: false,
            currentPaymentRecord: null
        });
    }

    private openEditModal = (row: { row: { _index: number; }; }) => {
        if (this.props.currentData.Payments) {
            this.setState({
                currentPaymentRecord: ((this.props.currentData.Payments[row.row._index]) as IPayments),
                modalEditIsOpen: true,
                currentIndex: row.row._index
            })
        }
    }

    private closeEditModalNoSave = () => {
        this.setState({
            modalEditIsOpen: false,
            currentPaymentRecord: null
        });
    }

    private openDeleteModal = (row: { row: { _index: number; }; }) => {
        if (this.props.currentData.Payments) {
            this.setState({
                currentPaymentRecord: ((this.props.currentData.Payments[row.row._index]) as IPayments),
                modalDeleteIsOpen: true,
                currentIndex: row.row._index
            })
        }
    }

    private closeDeleteModalNoSave = () => {
        this.setState({
            modalDeleteIsOpen: false,
            currentPaymentRecord: null
        });
    }

    private updatePaymentLine = (values: IPayments) => {
        // update the record
        if (values.modifier !== "Added") {
            values.modifier = "Modified";
        }
        this.props.updatePaymentline(values, false, this.state.currentIndex);

        this.setState({
            modalEditIsOpen: false,
            currentPaymentRecord: null
        });
    }

    private addPaymentLine = (values: IPayments) => {
        // add the record
        values.modifier = "Added";
        this.props.updatePaymentline(values, true, this.state.currentIndex);

        this.setState({
            modalAddIsOpen: false,
            currentPaymentRecord: null
        });
    }

    private deletePaymentLine = (values: IPayments) => {
        // add the record
        values.modifier = "Deleted";
        this.props.updatePaymentline(values, false, this.state.currentIndex);

        this.setState({
            modalDeleteIsOpen: false,
            currentPaymentRecord: null
        });
    }

    render() {
        const paymentcolumns = [
            {
                Header: 'Actions',
                Cell: (row: { row: { _index: number; }; }) => (
                    <div className="w3-bar">
                        <button className="w3-bar-item w3-button" title="Edit" onClick={() => { this.openEditModal(row); }}>
                            <i className="fa fa-pencil" ></i>
                        </button>
                        <button className="w3-bar-item w3-button" title="Delete" onClick={() => { this.openDeleteModal(row); }}>
                            <i className="fa fa-trash-o" ></i>
                        </button>
                    </div>
                ),
                sortable: false
            },
            {
                Header: 'ID',
				accessor: 'id',
                id: 'id',
                show: false
            } ,             {
                Header: 'Description',
				accessor: 'description',
                id: 'description',
                show: false
            } ,             {
                Header: 'Planned Invoice date',
                accessor: (d: IPayments) => Utils.formatDate(d.plannedInvoiceDate),
                // date sorting
                sortMethod: Utils.dateSorter,
                id: 'plannedInvoiceDate',
                show: true
            } ,             {
                Header: 'Actual Invoice date',
                accessor: (d: IPayments) => Utils.formatDate(d.actualInvoiceDate),
                // date sorting
                sortMethod: Utils.dateSorter,
                id: 'actualInvoiceDate',
                show: true
            } ,             {
                Header: 'Amount',
				accessor: (d: IPayments) => Utils.formatAmount(d.amount),
				style: { 'textAlign': "right" },
                id: 'amount',
                show: true
            }         ];

        const tabledata = this.props.currentData.Payments as IPayments[];
        //).filter(r => r.modifier != "Deleted") : this.props.currentData.Payments as IPayments[];

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
                <Modal isOpen={this.state.modalEditIsOpen} >
                    <ModalHeader toggle={this.closeEditModalNoSave} charCode="&times;" >Edit Payment</ModalHeader>
                    <ModalBody>
                        <ContractPaymentForm buttonText="Save" currentData={this.state.currentPaymentRecord as IPayments} updateValues={this.updatePaymentLine} 
                        
                        />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalAddIsOpen} >
                    <ModalHeader toggle={this.closeAddModalNoSave} charCode="&times;" >Add Payment</ModalHeader>
                    <ModalBody>
                        <ContractPaymentForm buttonText="Add" currentData={this.state.currentPaymentRecord as IPayments} updateValues={this.addPaymentLine} 
                        />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalDeleteIsOpen} >
                    <ModalHeader toggle={this.closeDeleteModalNoSave} charCode="&times;" >Delete Payment</ModalHeader>
                    <ModalBody>
                        <ContractPaymentForm buttonText="Delete" currentData={this.state.currentPaymentRecord as IPayments} updateValues={this.deletePaymentLine} 
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};

export default ContractPayment;

