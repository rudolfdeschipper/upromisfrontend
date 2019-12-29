
export interface IListState<T> {
    data: T[],
    loading: boolean,
    pages: number,
    currentSort: any,
    currentFilter: any,
    pageSize: number
}

export interface ILoadResult<T>
{
    data: T[],
    pages: number
}

