import React, { Component } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Datepicker, SubmitBtn, Input, Textarea } from 'react-formik-ui'
import { Link } from 'react-router-dom';
import { IContractData, IPayment } from './ContractTypes';

interface IProps {
    currentData: IContractData,
    buttonText: string
}

interface IState {
    isSubmitting: boolean;
}

class ContractForm extends React.Component<IProps, IState> {

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
                    startdate: Yup.date()
                        .required('Required'),
                    enddate: Yup.date()
                        .required('Required'),
                    value: Yup.number()
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        values.modifier = "Modified";
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);

                }}
            >
                <Form mode="themed">
                    <Input name="id" label="ID" disabled />
                    <Input name="code" label="Code" />
                    <Input name="title" label="Title" />
                    <Textarea name="description" label="Description" />
                    <div className="w3-cell-row">
                        <div className="w3-cell">
                            <Datepicker name="startdate" label="Start/End date" />
                        </div>
                        <div className="w3-cell">
                            <Datepicker name="enddate" />
                        </div>
                    </div>
                    <Input name="value" type="number" label="Value" step="0.01" />
                    <hr />
                    <SubmitBtn className="w3-button w3-light-grey w3-round" title={this.props.buttonText + "s this record"} disabled={this.state.isSubmitting}>
                        <i className="fa fa-save" ></i>&nbsp;{this.props.buttonText}
                    </SubmitBtn>
                </Form>
            </Formik>
        );
    }
};
export default ContractForm;
