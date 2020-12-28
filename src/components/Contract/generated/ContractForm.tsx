/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 28/Dec/2020 15:38:10
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Datepicker, SubmitBtn, Input, Textarea, Select } from 'react-formik-ui'
import { ISelectValue } from '../../GeneralTypes';

import { IContractData } from './ContractTypes';

interface IProps {
    currentData: IContractData,
    contractTypevalues : ISelectValue[], 
    contractStatusvalues : ISelectValue[], 
    proposalvalues : ISelectValue[], 
    buttonText: string;
    saveAction: (subaction: string, record: IContractData) => void
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
                    contractType: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required')
                        .oneOf([
                        'FixedPrice',
                        'TandM',
                        'QTM',
                        'FrameContract',
                        ])
                    ,
                    contractStatus: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required')
                        .oneOf([
                        'Planned',
                        'Open',
                        'Closed',
                        'Cancelled',
                        ])
                    ,
                    startDate: Yup.date()
                    ,
                    endDate: Yup.date()
                    ,
                    budget: Yup.number()
                    ,
                    proposal: Yup.number()
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
                <Select name='contractType' label='Contract type' options={this.props.contractTypevalues} />
                <Select name='contractStatus' label='Status' options={this.props.contractStatusvalues} />
                <Datepicker name='startDate' label='Start date'  />
                <Datepicker name='endDate' label='End date'  />
                <Input name='budget' label='Budget' type='number' step='0.01' />
                <Select name='proposal' label='Proposal' options={this.props.proposalvalues} />
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

