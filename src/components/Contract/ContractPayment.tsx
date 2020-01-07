import React, { Component } from 'react';
import { Utils } from '../Utils';
import ReactTable from 'react-table';
import { IContractData, IPayment } from './ContractTypes';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ContractPaymentForm from './ContractPaymentForm';


interface IProps {
    currentData: IContractData;
    updatePaymentline: (values: IPayment, isAdding: boolean, currentIndex? : number) => void;
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

        this.openEditModal = this.openEditModal.bind(this);
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
        this.setState({
            modalAddIsOpen: true,
            currentPaymentRecord: { id: -1, description: "", plannedinvoicedate: new Date(), actualinvoicedate: new Date(), amount: 0.0, modifier: "Unchanged" }
        });
    }

    afterOpenAddModal() {
        // references are now sync'd and can be accessed.
    }

    closeAddModal() {
        this.setState({ modalAddIsOpen: false });
    }

    closeAddModalNoSave() {
        this.setState({
            modalAddIsOpen: false,
            currentPaymentRecord: null
        });
    }


    openEditModal(row: { row: { _index: number; }; }) {
        alert(JSON.stringify(row))
            if (this.props.currentData.paymentInfo) {
            this.setState({
                currentPaymentRecord: ((this.props.currentData.paymentInfo[row.row._index]) as IPayment),
                modalEditIsOpen: true,
                currentIndex: row.row._index
            })
        }
    }

    private updatePaymentLine = (values: IPayment) => {
        // update the record
        if(values.modifier != "Added") {
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


    closeEditModalNoSave() {
        this.setState({
            modalEditIsOpen: false,
            currentPaymentRecord: null
        });
    }

    openDeleteModal(row: { row: { _index: number; }; }) {
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
                <Modal isOpen={this.state.modalEditIsOpen} >
                    <ModalHeader toggle={this.closeEditModalNoSave} charCode="&times;" >Edit Payment</ModalHeader>
                    <ModalBody>
                        <ContractPaymentForm currentData={this.state.currentPaymentRecord as IPayment} updateValues={this.updatePaymentLine} />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalAddIsOpen} >
                    <ModalHeader toggle={this.closeAddModalNoSave} charCode="&times;" >Add Payment</ModalHeader>
                    <ModalBody>
                        <ContractPaymentForm currentData={this.state.currentPaymentRecord as IPayment} updateValues={this.addPaymentLine} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};

export default ContractPayment;
