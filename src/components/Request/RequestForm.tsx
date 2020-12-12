/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 12/Dec/2020 22:52:10
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Datepicker, SubmitBtn, Input, Textarea, Select } from 'react-formik-ui'
import { ISelectValue } from '../GeneralTypes';

import { IRequestData } from './RequestTypes';

interface IProps {
    currentData: IRequestData,
    requestStatusvalues : ISelectValue[], 
    requestTypevalues : ISelectValue[], 
    buttonText: string;
    saveAction: (subaction: string, record: IRequestData) => void
}

interface IState {
    isSubmitting: boolean;
}

class RequestForm extends React.Component<IProps, IState> {

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
                    id: Yup.number()
                        .required('Required')
                    ,
                    code: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required')
                    ,
                    title: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .required('Required')
                    ,
                    description: Yup.string()
                    ,
                    startDate: Yup.date()
                    ,
                    endDate: Yup.date()
                    ,
                    requestStatus: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required')
                        .oneOf([
                        'Planned',
                        'Open',
                        'Closed',
                        'Cancelled',
                        ])
                    ,
                    requestType: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required')
                        .oneOf([
                        'FixedPrice',
                        'TandM',
                        'QTM',
                        'FrameContract',
                        ])
                })}
                onSubmit={(values, { setSubmitting }) => {
                    this.props.saveAction("", values);
                    setSubmitting(false);
                }}
            >
                <Form mode="themed">
                <Input name='id' label='ID' disabled />
                <Input name='code' label='Code'  />
                <Textarea name='title' label='Title'  />
                <Textarea name='description' label='Description'  />
                <Datepicker name='startDate' label='Start date'  />
                <Datepicker name='endDate' label='End date'  />
                <Select name='requestStatus' label='Status' options={this.props.requestStatusvalues} />
                <Select name='requestType' label='Request type' options={this.props.requestTypevalues} />
                    <hr />
                    <SubmitBtn className="w3-button w3-light-grey w3-round" title={this.props.buttonText + "s this record"} disabled={this.state.isSubmitting}>
                        <i className="fa fa-save" ></i>&nbsp;{this.props.buttonText}
                    </SubmitBtn>
                </Form>
            </Formik>
        );
    }
};
export default RequestForm;

