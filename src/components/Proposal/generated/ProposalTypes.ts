/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 29/Dec/2020 21:56:58
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

export interface IProposalData {

    id: number,
    code: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    proposalStatus: string,
    proposalStatusLabel: string,
    proposalType: string,
    proposalTypeLabel: string,
    Payments: IPayments[] | null,
    Teammembers: ITeammembers[] | null,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface IPayments {
    id : number,
    externalId : string,
    description : string,
    plannedInvoiceDate : Date,
    amount : number,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface ITeammembers {
    id : number,
    externalId : string,
    teammemberID : string,
    memberType : string,
    memberTypeLabel: string,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

