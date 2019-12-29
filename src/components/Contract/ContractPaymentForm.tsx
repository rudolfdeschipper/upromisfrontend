import React, { Component } from 'react';
import { Formik, Field } from 'formik';
//import * as Yup from 'yup';
import { Form, Datepicker } from 'react-formik-ui'
import {IContractData, IPayment} from './ContractTypes';



interface IProps {
    currentData: IPayment;
}

class ContractPaymentForm extends React.Component<IProps> {

    constructor(props: Readonly<IProps>) {
        super(props);
    }

    render() {
        return (
            <Formik
                initialValues={this.props.currentData as any}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);

                }}
            >
                <Form className="w3-container">
                    <label id="lID"  >ID: </label>
                    <Field name="id" type="number" className="w3-input w3-border" disabled />
                    <label id="lDescription"  >Description: </label>
                    <Field name="description" type="text" className="w3-input w3-border" />
                    <label id="lplannedInvoiceDate" >Start/End date: </label>
                    <div className="w3-cell-row">
                        <div className="w3-cell">
                            <Datepicker name="plannedinvoiceDate" className="w3-input w3-border" >
                            </Datepicker>
                        </div>
                        <div className="w3-cell">
                            <Datepicker name="actualinvoiceDate" className="w3-input w3-border" >
                            </Datepicker>
                        </div>
                    </div>
                    <label id="lAmount"  >Value: </label>
                    <Field name="amount" type="number" className="w3-input w3-border" />
                    <hr />
                    <div className="w3-bar">
                        <button type="submit" className="w3-button w3-light-grey w3-round" title="Saves this record" >
                            <i className="fa fa-save" ></i>&nbsp;Save
                        </button>
                    </div>
                </Form>

            </Formik>
        );
    }
};
export default ContractPaymentForm;
