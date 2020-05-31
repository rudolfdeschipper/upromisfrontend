import React from 'react';
import { Formik } from 'formik';
import { Form, SubmitBtn, Input, Datepicker } from 'react-formik-ui'

import { IAttachmentData } from './AttachmentTypes';

interface IProps {
    currentData: IAttachmentData,
    buttonText: string;
    saveAction: (subaction: string, record: IAttachmentData) => void
}

interface IState {
    isSubmitting: boolean;
}

class AttachmentDeleteForm extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = { isSubmitting: false };
    }

    render() {
        return (
            <Formik
                initialValues={this.props.currentData as any}
                enableReinitialize={true}

                onSubmit={(values, { setSubmitting }) => {
                    this.props.saveAction("Delete", values);
                    setSubmitting(false);
                }}
            >
                <Form mode="themed">
                    <Input name="id" label="ID" disabled />
                    <Input name="fileName" label="File Name" disabled/>
                    <Input name="size" label="Size" disabled/>
                    <Datepicker name="uploadedOn" label="Uploaded On" disabled />
                    <Input name='uploadedBy' label='Uploaded By' disabled />
                    <hr />
                    <SubmitBtn className="w3-button w3-light-grey w3-round" title={this.props.buttonText + "s this record"} disabled={this.state.isSubmitting}>
                        <i className="fa fa-save" ></i>&nbsp;{this.props.buttonText}
                    </SubmitBtn>
                </Form>
            </Formik>
        );
    }
};
export default AttachmentDeleteForm;
