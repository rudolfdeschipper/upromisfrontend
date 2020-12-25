/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 25/Dec/2020 17:48:51
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Datepicker, Input, Textarea, SubmitBtn, Select } from 'react-formik-ui'

import { IPayments } from './ContractTypes';
import { ISelectValue } from '../GeneralTypes';
import { UserContext } from '../../context/UserContext';


interface IProps {
    currentData: IPayments;
    buttonText: string;
    updateValues:  (values: IPayments) => void;
}

interface IState {
    isSubmitting: boolean
}

class ContractPaymentForm extends React.Component<IProps, IState> {

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
                    this.props.updateValues({...values});
                    setSubmitting(false);
                }}
                validationSchema={Yup.object({
                    id: Yup.number()
                        .required('Required')
,                     description: Yup.string()
,                     plannedInvoiceDate: Yup.date()
,                     actualInvoiceDate: Yup.date()
,                     amount: Yup.number()
                })}

            >
                <Form className="w3-container" mode="themed">
                    <Input name='id' label='ID' disabled
                     />
                    <Textarea name='description' label='Description' 
                     />
                    <Datepicker name='plannedInvoiceDate' label='Planned Invoice date' 
                     />
                    <Datepicker name='actualInvoiceDate' label='Actual Invoice date' 
                     />
                    <Input name='amount' label='Amount' type='number' step='0.01'
                     />
                    <hr />
                    <SubmitBtn className="w3-button w3-light-grey w3-round" title={this.props.buttonText + "s this record"} disabled={this.state.isSubmitting}>
                        <i className="fa fa-save" ></i>&nbsp;{this.props.buttonText}
                    </SubmitBtn>
                </Form>
            </Formik>
        );
    }
};
export default ContractPaymentForm;

