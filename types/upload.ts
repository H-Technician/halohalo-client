export interface FileChunk {
    identifier: string,
    skipUpload: boolean,
    uploaded: [],
}

export interface UploadProgress {
    startTime: number;
    bytesUploaded: number;
    totalSize: number;
}

export interface UploadCover {
    coverUrl4x3: string;
    coverpath4x3: string;
    coverUrl16x9: string;
    coverpath16x9: string;
}

export interface UploadVideo {
    original: string;
    title: string;
    type: number;
    auth: string;
    duration: number;
    category_id: number;
    sub_category_id: number;
    tags: string;
    descr: string;
    cover_url4x3: string;
    cover_url16x9: string;
}