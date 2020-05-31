import { ILoadResult } from '../GeneralTypes';
import { IAttachmentData } from './AttachmentTypes';


export class AttachmentAPI {

    //private url: string = 'http://localhost:5011/api/attachment/';

    static loadList = (parentItem: string, page: number, pageSize: number, token: string) => fetch(
                    `http://localhost:5011/api/attachment/${encodeURIComponent(parentItem)}?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(response => {
                        return response.json() as Promise<ILoadResult<IAttachmentData>>;
                    });

    static deleteAttachment = async (id: string, token: string): Promise<IAttachmentData> => {
        const response = await fetch(`http://localhost:5011/api/attachment/${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res;
        })
            ;
        return response.json() as Promise<IAttachmentData>;
    };
}