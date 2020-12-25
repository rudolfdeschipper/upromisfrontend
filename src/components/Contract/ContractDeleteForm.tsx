/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 25/Dec/2020 17:48:50
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

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
                onSubmit={(values, { setSubmitting }) => {
                    this.props.saveAction("Delete", values);
                    setSubmitting(false);
                }}
            >
                <Form mode="themed">
  
                <Input name='id' label='ID' disabled />
  
                <Input name='code' label='Code' disabled />
  
                <Textarea name='title' label='Title' disbabled  />
  
                <Textarea name='description' label='Description' disbabled  />
  
                <Input name='contractTypeLabel' label='Contract type' disabled  />
  
                <Input name='contractStatusLabel' label='Status' disabled  />
  
                <Datepicker name='startDate' label='Start date' disabled  />
  
                <Datepicker name='endDate' label='End date' disabled  />
  
                <Input name='budget' label='Budget' type='number' step='0.01' disabled  />
  
                <Input name='proposalLabel' label='Proposal' disabled  />
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

