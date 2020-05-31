
export interface IAttachmentData {
    id: string,
    fileName: string,
    size: string,
    uploadedOn: Date,
    uploadedBy: string
}

export interface IAttachmentKey {
    parentItem: string,
    uploadedBy: string
}

export interface IFileUploadStatus {
    state: string,
    percentage: number
}