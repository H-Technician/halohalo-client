export async function imgBlob(imgDataUrl: string) {
    const byteString = atob(imgDataUrl.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let j = 0; j < byteString.length; j++) {
        int8Array[j] = byteString.charCodeAt(j);
    }
    const blob = new Blob([int8Array], { type: 'image/webp' });
    return blob;
}