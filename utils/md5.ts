import SparkMD5 from 'spark-md5'
export async function getFileMD5(file: File) {
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.onload = (e: ProgressEvent<FileReader>):void => {
        if (e.target?.result instanceof ArrayBuffer) {
            spark.append(e.target.result);
        } else {
            // 处理非ArrayBuffer的情况，例如忽略或报错
            throw new Error('读取文件MD5值错误');
        }
        resolve(spark.end())
        }
        fileReader.onerror = () => {
        reject('')
        }
        fileReader.readAsArrayBuffer(file)
    })
}

export async function calculateBlobMD5(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result instanceof ArrayBuffer) {
          const spark = new SparkMD5.ArrayBuffer();
          spark.append(e.target.result);
          const md5Value = spark.end();
          resolve(md5Value);
        } else {
          reject('读取blob对象文件MD5值错误');
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
}

// 读取一部分视频片段的MD5 读取前面20MB的Md5如果文件小于20MB就读取全部
export async function calculatePartialOrFullMD5(file: File, fileSize: number): Promise<string> {
    const chunkSize = 1024 * 1024; // 每次读取1MB
    const maxBytesToRead = 20 * chunkSize; // 目标读取20MB
    
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    return new Promise<string>((resolve, reject) => {
        let loaded = 0;
        fileReader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.readyState === FileReader.DONE) {
                spark.append(e.target.result as ArrayBuffer);
                loaded += (e.target.result as ArrayBuffer).byteLength;
                if (loaded < maxBytesToRead && loaded < fileSize) {
                    const nextReadStart = loaded;
                    const blobSlice = file.slice(nextReadStart, nextReadStart + chunkSize);
                    fileReader.readAsArrayBuffer(blobSlice);
                } else {
                    resolve(spark.end());
                }
            }
        };

        fileReader.onerror = (error: Event) => reject(error);

        // 根据文件大小决定读取策略
        const readSize = Math.min(maxBytesToRead, fileSize);
        fileReader.readAsArrayBuffer(file.slice(0, readSize));
    });
}

// 通过分段的方式读取文件片段的MD5
async function readFileChunk(file: File, start: number, end: number): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target?.result instanceof ArrayBuffer) {
                resolve(event.target.result);
            } else {
                reject(new Error('Failed to read file chunk'));
            }
        };
        reader.onerror = () => {
            reject(new Error('Error reading file chunk'));
        };
        const blobSlice = file.slice(start, end);
        reader.readAsArrayBuffer(blobSlice);
    });
}
// 通过分段的方式读取文件片段的MD5
export async function getFileMD5ByChunks(file: File, chunkSize = 10 * 1024 * 1024 /* 10MB */) {
    const spark = new SparkMD5.ArrayBuffer();
    let loadedSize = 0;
    
    while (loadedSize < file.size) {
        const chunkEnd = Math.min(loadedSize + chunkSize, file.size);
        const chunk = await readFileChunk(file, loadedSize, chunkEnd);
        spark.append(chunk);
        loadedSize += chunkSize;
    }
    
    return spark.end();
}