import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactTable from 'react-table';
import { Utils } from '../Utils';

import { IContractData, IPayment } from './ContractTypes';
import ContractPaymentForm from './ContractPaymentForm';


interface IProps {
    currentData: IContractData;
    updatePaymentline: (values: IPayment, isAdding: boolean, currentIndex?: number) => void;
}

interface IState {
    modalAddIsOpen: boolean,
    modalEditIsOpen: boolean,
    modalDeleteIsOpen: boolean,
    currentPaymentRecord: IPayment | null,
    currentIndex?: number
}

class ContractPayment extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            modalAddIsOpen: false,
            modalEditIsOpen: false,
            modalDeleteIsOpen: false,
            currentPaymentRecord: null,
        };

    }

    private openAddModal = () => {
        this.setState({
            modalAddIsOpen: true,
            currentPaymentRecord: { id: -1, description: "", plannedinvoicedate: new Date(), actualinvoicedate: new Date(), amount: 0.0, modifier: "Unchanged" }
        });
    }

    private closeAddModalNoSave = () => {
        this.setState({
            modalAddIsOpen: false,
            currentPaymentRecord: null
        });
    }

    private openEditModal = (row: { row: { _index: number; }; }) => {
        if (this.props.currentData.paymentInfo) {
            this.setState({
                currentPaymentRecord: ((this.props.currentData.paymentInfo[row.row._index]) as IPayment),
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
        if (this.props.currentData.paymentInfo) {
            this.setState({
                currentPaymentRecord: ((this.props.currentData.paymentInfo[row.row._index]) as IPayment),
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

    private updatePaymentLine = (values: IPayment) => {
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

    private addPaymentLine = (values: IPayment) => {
        // add the record
        values.modifier = "Added";
        this.props.updatePaymentline(values, true, this.state.currentIndex);

        this.setState({
            modalAddIsOpen: false,
            currentPaymentRecord: null
        });
    }

    private deletePaymentLine = (values: IPayment) => {
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
                        <div className="w3-dropdown-hover">
                            <button className="w3-button" title="More actions...">...</button>
                            <div className="w3-dropdown-content w3-bar-block w3-card-4">
                                <a href="#" className="w3-bar-item w3-button" >Link 1</a>
                                <a href="#" className="w3-bar-item w3-button">Link 2</a>
                                <a href="#" className="w3-bar-item w3-button">Link 3</a>
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
        //).filter(r => r.modifier != "Deleted") : this.props.currentData.paymentInfo as IPayment[];

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
                        <ContractPaymentForm buttonText="Save" currentData={this.state.currentPaymentRecord as IPayment} updateValues={this.updatePaymentLine} />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalAddIsOpen} >
                    <ModalHeader toggle={this.closeAddModalNoSave} charCode="&times;" >Add Payment</ModalHeader>
                    <ModalBody>
                        <ContractPaymentForm buttonText="Add" currentData={this.state.currentPaymentRecord as IPayment} updateValues={this.addPaymentLine} />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalDeleteIsOpen} >
                    <ModalHeader toggle={this.closeDeleteModalNoSave} charCode="&times;" >Delete Payment</ModalHeader>
                    <ModalBody>
                        <ContractPaymentForm buttonText="Delete" currentData={this.state.currentPaymentRecord as IPayment} updateValues={this.deletePaymentLine} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};

export default ContractPayment;
