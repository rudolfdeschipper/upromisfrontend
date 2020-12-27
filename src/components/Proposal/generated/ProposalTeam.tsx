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

import { IProposalData, ITeammembers } from './ProposalTypes';
import ProposalTeamForm from './ProposalTeamForm';

import { ISelectValue } from '../../GeneralTypes';
import { ProposalAPI } from './ProposalAPI';
import { UserContext } from '../../../context/UserContext';

interface IProps {
    currentData: IProposalData;
    updateTeamline: (values: ITeammembers, isAdding: boolean, currentIndex?: number) => void;
}

interface IState {
    modalAddIsOpen: boolean,
    modalEditIsOpen: boolean,
    modalDeleteIsOpen: boolean,
    currentTeamRecord: ITeammembers | null,
    memberTypevalues : ISelectValue[], 
    currentIndex?: number
}

class ProposalTeam extends React.Component<IProps, IState> {

    static contextType = UserContext;

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = {
            modalAddIsOpen: false,
            modalEditIsOpen: false,
            modalDeleteIsOpen: false,
            currentTeamRecord: null,
            memberTypevalues : [], 
        };

    }

    componentDidMount() {
        ProposalAPI.loadDropdownValues("ProposalMemberType", this.context!.access_token)
            .then(res => {
                this.setState({ memberTypevalues: res.data });
            }
            );


    }


    private openAddModal = () => {
        this.setState({
            modalAddIsOpen: true,
            currentTeamRecord: { 
                id : 0,
                externalId : '',
                teammemberID : '',
                memberType : 'Reader',
                memberTypeLabel: '',
            modifier: "Unchanged" }
        });
    }

    private closeAddModalNoSave = () => {
        this.setState({
            modalAddIsOpen: false,
            currentTeamRecord: null
        });
    }

    private openEditModal = (row: { row: { _index: number; }; }) => {
        if (this.props.currentData.Teammembers) {
            this.setState({
                currentTeamRecord: ((this.props.currentData.Teammembers[row.row._index]) as ITeammembers),
                modalEditIsOpen: true,
                currentIndex: row.row._index
            })
        }
    }

    private closeEditModalNoSave = () => {
        this.setState({
            modalEditIsOpen: false,
            currentTeamRecord: null
        });
    }

    private openDeleteModal = (row: { row: { _index: number; }; }) => {
        if (this.props.currentData.Teammembers) {
            this.setState({
                currentTeamRecord: ((this.props.currentData.Teammembers[row.row._index]) as ITeammembers),
                modalDeleteIsOpen: true,
                currentIndex: row.row._index
            })
        }
    }

    private closeDeleteModalNoSave = () => {
        this.setState({
            modalDeleteIsOpen: false,
            currentTeamRecord: null
        });
    }

    private updateTeamLine = (values: ITeammembers) => {
        // update the record
        if (values.modifier !== "Added") {
            values.modifier = "Modified";
        }
        this.props.updateTeamline(values, false, this.state.currentIndex);

        this.setState({
            modalEditIsOpen: false,
            currentTeamRecord: null
        });
    }

    private addTeamLine = (values: ITeammembers) => {
        // add the record
        values.modifier = "Added";
        this.props.updateTeamline(values, true, this.state.currentIndex);

        this.setState({
            modalAddIsOpen: false,
            currentTeamRecord: null
        });
    }

    private deleteTeamLine = (values: ITeammembers) => {
        // add the record
        values.modifier = "Deleted";
        this.props.updateTeamline(values, false, this.state.currentIndex);

        this.setState({
            modalDeleteIsOpen: false,
            currentTeamRecord: null
        });
    }

    render() {
        const teamcolumns = [
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
                Header: 'External ID',
				accessor: 'externalId',
                id: 'externalId',
                show: false
            } ,             {
                Header: 'Team member',
				accessor: 'teammemberID',
                id: 'teammemberID',
                show: false
            } ,             {
                Header: 'Member Type',
				accessor: 'memberTypeLabel',
                id: 'memberType',
                show: true
            }         ];

        const tabledata = this.props.currentData.Teammembers as ITeammembers[];
        //).filter(r => r.modifier != "Deleted") : this.props.currentData.Teammembers as ITeammembers[];

        return (
            <div>
                <button className="w3-button w3-light-grey w3-round" onClick={this.openAddModal} title="Add new record">
                    <i className="fa fa-plus-circle" ></i>&nbsp;Add new
                </button>
                {this.props.currentData && (
                    <ReactTable className="-striped"
                        data={tabledata}
                        minRows={1}
                        columns={teamcolumns}
                    />)
                }
                <Modal isOpen={this.state.modalEditIsOpen} >
                    <ModalHeader toggle={this.closeEditModalNoSave} charCode="&times;" >Edit Team</ModalHeader>
                    <ModalBody>
                        <ProposalTeamForm buttonText="Save" currentData={this.state.currentTeamRecord as ITeammembers} updateValues={this.updateTeamLine} 
                            memberTypevalues = {this.state.memberTypevalues} 
                        
                        />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalAddIsOpen} >
                    <ModalHeader toggle={this.closeAddModalNoSave} charCode="&times;" >Add Team</ModalHeader>
                    <ModalBody>
                        <ProposalTeamForm buttonText="Add" currentData={this.state.currentTeamRecord as ITeammembers} updateValues={this.addTeamLine} 
                            memberTypevalues = {this.state.memberTypevalues} 
                        />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalDeleteIsOpen} >
                    <ModalHeader toggle={this.closeDeleteModalNoSave} charCode="&times;" >Delete Team</ModalHeader>
                    <ModalBody>
                        <ProposalTeamForm buttonText="Delete" currentData={this.state.currentTeamRecord as ITeammembers} updateValues={this.deleteTeamLine} 
                            memberTypevalues = {this.state.memberTypevalues} 
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};

export default ProposalTeam;

