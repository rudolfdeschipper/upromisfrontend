
export interface IListState<T> {
    data: T[],
    loading: boolean,
    pages: number,
    currentSort: any,
    currentFilter: any,
    pageSize: number,
    message: string,
    modalDeleteIsOpen: boolean,
    currentRecord: T | null
}

export interface ILoadResult<T>
{
    data: T[],
    pages: number
    message: string;
}

export interface ISaveMessage<T> {
    id: number,
    dataSubject: T,
    action: string,
    subaction: string,
    additionalData: object[]
}

export interface IAPIResult<T> {
    id: number;
    dataSubject: T;
    success: boolean;
    message: string;
}

export interface IListInfo {
    page: number,
    pageSize: number,
    sorted: any,
    filtered: any

}

export interface ISelectValue {
    label: string,
    value: string | number
}

export interface ISelectValueList {
    valueType: string,
    data: ISelectValue[],
}

