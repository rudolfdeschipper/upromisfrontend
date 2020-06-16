import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, SubmitBtn, Input, Textarea, Datepicker } from 'react-formik-ui'

import { IContractData } from './ContractTypes';

interface IProps {
    currentData: IContractData,
    buttonText: string;
    saveAction: (subaction: string, record: IContractData) => void
}

interface IState {
    isSubmitting: boolean;
}

class ContractDeleteForm extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = { isSubmitting: false };
    }

    render() {
        return (
            <Formik
                initialValues={this.props.currentData as any}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    code: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    title: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .required('Required'),
                    description: Yup.string()
                        .required('Required'),
                    startDate: Yup.date()
                        .required('Required'),
                    endDate: Yup.date()
                        .required('Required'),
                    status: Yup.string()
                        .required('Required')
                        .oneOf(['Planned', 'Open', 'Closed']),
                    value: Yup.number()
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    this.props.saveAction("Delete", values);
                    setSubmitting(false);
                }}
            >
                <Form mode="themed">
                    <Input name="id" label="ID" disabled />
                    <Input name="code" label="Code" disabled/>
                    <Input name="title" label="Title" disabled/>
                    <Textarea name="description" label="Description" disabled />
                    <div className="w3-cell-row">
                        <div className="w3-cell">
                            <Datepicker name="startDate" label="Start/End date" disabled />
                        </div>
                        <div className="w3-cell">
                            <Datepicker name="endDate"  disabled/>
                        </div>
                    </div>
                    <Input name='status' label='Status' disabled />
                    <Input name="value" type="number" label="Value" step="0.01" disabled />
                    <hr />
                    <SubmitBtn className="w3-button w3-light-grey w3-round" title={this.props.buttonText + "s this record"} disabled={this.state.isSubmitting}>
                        <i className="fa fa-save" ></i>&nbsp;{this.props.buttonText}
                    </SubmitBtn>
                </Form>
            </Formik>
        );
    }
};
export default ContractDeleteForm;
