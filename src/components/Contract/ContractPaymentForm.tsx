import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Datepicker, Input, SubmitBtn, Select } from 'react-formik-ui'

import { IPayment } from './ContractTypes';
import { ISelectValue } from '../GeneralTypes';


interface IProps {
    currentData: IPayment;
    buttonText: string;
    paymentstatusvalues : ISelectValue[];
    updateValues:  (values: IPayment) => void;
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
                    description: Yup.string()
                        .required('Required'),
                    plannedInvoiceDate: Yup.date()
                        .required('Required'),
                    actualInvoiceDate: Yup.date()
                        ,
                    amount: Yup.number()
                        .required('Required')
                        ,
                    paymentStatus: Yup.number()
                        .required('Required')
                })}

            >
                <Form className="w3-container" mode="themed">
                    <Input name="id" label="ID" disabled />
                    <Input name="description" label="Description" />
                    <div className="w3-cell-row">
                        <div className="w3-cell">
                            <Datepicker name="plannedInvoiceDate" label="Planned/Actual date" className="w3-input w3-border" >
                            </Datepicker>
                        </div>
                        <div className="w3-cell">
                            <Datepicker name="actualInvoiceDate" className="w3-input w3-border" >
                            </Datepicker>
                        </div>
                    </div>
                    <Input name="amount" label="Amount" type="number" step="0.01" />
                    <Select name='paymentStatus' label='Status' options={this.props.paymentstatusvalues} />
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
