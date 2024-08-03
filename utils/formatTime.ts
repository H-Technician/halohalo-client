// 格式化时间显示
export function formatTime(seconds: number) {
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const secondsFormatted = date.getUTCSeconds().toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secondsFormatted}`;
    } else {
        return `${minutes}:${secondsFormatted}`;
    }
};