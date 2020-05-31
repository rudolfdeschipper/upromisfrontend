import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import "./Attachment.css";
import { Utils } from '../Utils';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { IListState } from '../GeneralTypes';
import { Icon } from '@iconify/react';
import baselineErrorOutline from '@iconify/icons-ic/baseline-error-outline';

import { IAttachmentData, IAttachmentKey, IFileUploadStatus } from './AttachmentTypes';
import { AttachmentAPI } from './AttachmentAPI';

import { Popup } from '../Popup';
import Dropzone from './dropzone/Dropzone';
import Progress from './progress/Progress';
import AttachmentDeleteForm from './AttachmentDeleteForm';

import { UserContext } from '../../context/UserContext';

interface IState {
    files: File[],
    uploadProgress: { [key: string]: IFileUploadStatus }
}

class Attachment extends React.Component<IAttachmentKey, IListState<IAttachmentData> & IState> {
    static displayName = Attachment.name;

    //Declare the User context to access the User properties.
    static contextType = UserContext;
    private User: any;

    constructor(props: Readonly<IAttachmentKey>) {
        super(props);
        this.state = {
            //List State
            data: [],
            loading: true,
            pages: -1,
            currentSort: null,
            currentFilter: null,
            pageSize: 10,
            message: "",
            modalDeleteIsOpen: false,
            currentRecord: null,

            //Files Upload state
            files: [],
            uploadProgress: {},

            // popup stuff
            popupStyle: "",
            popupMessage: "",
            popupVisible: false
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
    }

    UNSAFE_componentWillMount() {
        //TODO: find the proper way to get the user before the component mount.
        this.User = this.context;
    }


    onFilesAdded(files: File[]) {
        //Create the list of files to be displayed
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));

        //Process each files
        files.forEach(file => {
            this.uploadFile(file, this.User.access_token)
                .then(response => {
                    //add the created attachment to the list and remove the entry from the upload list
                    console.log(response);
                    this.setState(prevState => ({
                        data: prevState.data.concat(response),
                        files: prevState.files.filter(d => d.name !== file.name)
                    }));
                })
                .catch(err => {
                    console.log('There was an error: ', err);
                    const copy = { ...this.state.uploadProgress };
                    copy[file.name] = {
                        state: "error",
                        percentage: 0
                    };
                    this.setState({ uploadProgress: copy });
                })
        });
    }

    private uploadFile(file: File, token: string): Promise<IAttachmentData> {
        return new Promise<IAttachmentData>((resolve, reject) => {
            const req = new XMLHttpRequest();

            //Create Listener for handling the progress bar
            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    const copy = { ...this.state.uploadProgress };
                    copy[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    };
                    this.setState({ uploadProgress: copy });
                }
            });

            //Create the form data to be uploaded
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("UploadedBy", this.props.uploadedBy);
            formData.append("ParentItem", this.props.parentItem);

            req.open("POST", "http://localhost:5011/api/attachment");
            req.setRequestHeader("Authorization", "Bearer " + token);
            req.send(formData);
            req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE) {
                    // the upload is complete. Check the status code
                    if (req.status === 201) {
                        //File has been created successfully
                        resolve(JSON.parse(req.response));
                    } else {
                        reject(req.statusText);
                    }
                }
            }
        });
    }

    private openDeleteModal = (row: { row: { _index: number } }) => {
        this.setState(
            {
                modalDeleteIsOpen: true,
                currentRecord: { ...this.state.data[row.row._index] }
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

    private closeDeleteModalWithSave = (subaction: string, record: IAttachmentData) => {
        AttachmentAPI.deleteAttachment(record.id, this.User.access_token)
            .then(result => {
                this.setState({
                    popupVisible: true, popupMessage: "Attachment deleted ", popupStyle: "success",
                    data: this.state.data.filter(d => d.id !== result.id),
                    modalDeleteIsOpen: false
                });
            })
            .catch((error) => {
                this.setState({
                    popupVisible: true,
                    popupMessage: "Error while deleting " + error, popupStyle: "danger",
                    modalDeleteIsOpen: false, currentRecord: null
                });
            });
    }

    private loadData = (state: any) => {
        // show the loading overlay
        this.setState({ loading: true });

        // fetch your data
        AttachmentAPI.loadList(this.props.parentItem, state.page, state.pageSize, this.User.access_token)
            .then((res) => {
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

    renderProgress(file: File) {
        const uploadProgress = this.state.uploadProgress[file.name];
        return (
            <div className="ProgressWrapper" >
                <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
            </div>
        );
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
                        <button onClick={() => { this.openDeleteModal(row); }} className="w3-bar-item w3-button" title="Delete" >
                            <i className="fa fa-trash-o" ></i>
                        </button>
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
                Header: 'File Name',
                accessor: 'fileName'
            },
            {
                Header: 'Size',
                accessor: 'size'
            },
            {
                Header: 'Uploaded By',
                accessor: 'uploadedBy'
            },
            {
                id: 'uploadedon',
                Header: 'Uploaded On',
                accessor: (d: IAttachmentData) => Utils.formatDate(d.uploadedOn),
                // date sorting
                sortMethod: Utils.dateSorter
            }
        ];

        return (
            <div className="upromisContent">
                <Popup visible={this.state.popupVisible} message={this.state.popupMessage} style={this.state.popupStyle} onDismiss={() => { this.setState({ popupVisible: false }) }} />
                <div className="Upload">
                    <span className="Title">Upload Files</span>
                    <div className="Content">
                        <div>
                            <Dropzone onFilesAdded={this.onFilesAdded} />
                        </div>
                        <div className="Files">
                            {this.state.files.map(file => {
                                let uploadProgress = this.state.uploadProgress[file.name];
                                return (
                                    <div key={file.name} className="Row">
                                        {uploadProgress && uploadProgress.state === "error" ? <Icon icon={baselineErrorOutline} color="red" /> : ""}
                                        <span className="Filename">{file.name}</span>
                                        {this.renderProgress(file)}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
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
                <Modal isOpen={this.state.modalDeleteIsOpen} >
                    <ModalHeader toggle={this.closeDeleteModalNoSave} charCode="&times;" >Delete Contract</ModalHeader>
                    <ModalBody>
                        <AttachmentDeleteForm buttonText="Delete" currentData={this.state.currentRecord as IAttachmentData} saveAction={this.closeDeleteModalWithSave} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Attachment;
