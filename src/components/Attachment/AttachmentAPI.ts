import { ILoadResult } from '../GeneralTypes';
import { IAttachmentData } from './AttachmentTypes';
import { http } from '../http';


export class AttachmentAPI {

    //private url: string = 'http://localhost:5011/api/attachment/';
    static webAPIUrl: string = 'http://localhost:5011/api';

    static loadList = async (parentItem: string, page: number, pageSize: number, token: string) : Promise<ILoadResult<IAttachmentData>> => {
        try {
            const result = await http<undefined, ILoadResult<IAttachmentData>>(
                AttachmentAPI.webAPIUrl,
                {
                    path: `/attachment/${encodeURIComponent(parentItem)}?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`,
                    accessToken: token
                }
            )
            if (result.ok && result.parsedBody) {
                return { ...result.parsedBody };
            } else {
                return { data: [], pages: 0, message: result.statusText };
            }
        } catch (ex) {
            console.error(ex);
            return { data: [], pages: 0, message: ex };
        }
    }

    static deleteAttachment = async (id: string, token: string): Promise<IAttachmentData> => {
        try {
            const result = await http<undefined, IAttachmentData>(
                AttachmentAPI.webAPIUrl,
                {
                    path: `/attachment/${encodeURIComponent(id)}`,
                    method: "delete",
                    accessToken: token
                }
            )
            if (result.ok && result.parsedBody) {
                return { ...result.parsedBody };
            } else {
                return { id: id, fileName: "", size: "0", uploadedBy: "", uploadedOn: new Date() };
            }
        } catch (ex) {
            console.error(ex);
            return { id: id, fileName: "", size: "0", uploadedBy: "", uploadedOn: new Date() };
        }
   };
}