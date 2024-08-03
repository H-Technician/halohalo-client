// 判断图片文件格式类型
export function isCoverFile (file: File): boolean {
    const imgTypes = [
        'image/jpg', 
        'image/jpeg', 
        'image/png',  
        'image/webp', 
        ]; // 示例图片MIME类型
    return imgTypes.includes(file.type);
};