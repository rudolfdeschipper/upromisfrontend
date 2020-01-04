import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, Datepicker, Input, SubmitBtn } from 'react-formik-ui'
import { IContractData, IPayment } from './ContractTypes';


interface IProps {
    currentData: IPayment;
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
                    plannedinvoicedate: Yup.date()
                        .required('Required'),
                    actualinvoicedate: Yup.date()
                        ,
                    amount: Yup.number()
                        .required('Required')
                })}

            >
                <Form className="w3-container" mode="themed">
                    <Input name="id" label="ID" disabled />
                    <Input name="description" label="Description" />
                    <div className="w3-cell-row">
                        <div className="w3-cell">
                            <Datepicker name="plannedinvoicedate" label="Planned/Actual date" className="w3-input w3-border" >
                            </Datepicker>
                        </div>
                        <div className="w3-cell">
                            <Datepicker name="actualinvoicedate" className="w3-input w3-border" >
                            </Datepicker>
                        </div>
                    </div>
                    <Input name="amount" label="Amount" type="number" step="0.01" />
                    <hr />
                    <SubmitBtn className="w3-button w3-light-grey w3-round" title="Saves this record" disabled={this.state.isSubmitting}>
                        <i className="fa fa-save" ></i>&nbsp;Save
                    </SubmitBtn>
                </Form>

            </Formik>
        );
    }
};
export default ContractPaymentForm;
