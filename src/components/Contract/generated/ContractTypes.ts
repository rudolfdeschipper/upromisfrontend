/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 27/Dec/2020 17:43:06
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

export interface IContractData {

    id: number,
    code: string,
    title: string,
    description: string,
    contractType: string,
    contractTypeLabel: string,
    contractStatus: string,
    contractStatusLabel: string,
    startDate: Date,
    endDate: Date,
    budget: number,
    proposal: number,
    proposalLabel: string,
    Payments: IPayments[] | null,
    Teammembers: ITeammembers[] | null,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface IPayments {
    id : number,
    description : string,
    plannedInvoiceDate : Date,
    actualInvoiceDate : Date,
    amount : number,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface ITeammembers {
    id : number,
    teammemberID : string,
    memberType : string,
    memberTypeLabel: string,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}


