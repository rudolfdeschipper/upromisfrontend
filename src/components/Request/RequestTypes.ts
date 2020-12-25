/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 25/Dec/2020 17:48:52
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

export interface IRequestData {

    id: number,
    code: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    requestStatus: string,
    requestStatusLabel: string,
    requestType: string,
    requestTypeLabel: string,
    Teammembers: ITeammembers[] | null,

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


