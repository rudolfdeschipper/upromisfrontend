/*
**             ------ IMPORTANT ------
** This file was generated by ZeroCode2 on 24/Oct/2020 13:53:14
** DO NOT MODIFY IT, as it can be regenerated at any moment.
** If you need this file changed, change the underlying model or its template.
*/

export interface IRequestData {

    id: number,
    externalId: string,
    code: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    requestStatus: string,
    requestType: string,
    teamInfo: ITeam[] | null,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}

export interface ITeam {
    id : number,
    externalId : string,
    teammemberID : string,
    memberType : string,

    modifier: "Unchanged" | "Added" | "Modified" | "Deleted"
}


