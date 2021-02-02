import { ILoadResult } from '../GeneralTypes';
import { IAttachmentData } from './AttachmentTypes';
import { http } from '../http';


export class AttachmentAPI {

    //private url: string = 'http://localhost:5011/api/attachment/';
    static webAPIUrl: string = 'http://localhost:5011/api';
    static debug : boolean = true;


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

    static downloadAttachment = async (id: string, fileName: string, token: string)  : Promise<void> => 
    {
        try {
            const result = await http<any, any>(
                AttachmentAPI.webAPIUrl,
                {
                    path: `/attachment/download/${encodeURIComponent(id)}`,
                    accessToken: token
                }
            )
            result.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    a.remove();
                });
        } catch (ex) {
            if(AttachmentAPI.debug) console.error(ex);
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