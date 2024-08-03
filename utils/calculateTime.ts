interface TimelineIntervals {
    interval: number;
    totalIntervals: number;
}

export function calculateTimelineIntervals(videoDurationInSeconds: number): TimelineIntervals {
    let interval: number;
    let totalIntervals: number;

if (videoDurationInSeconds <= 60) { // 1 分钟或更短
    interval = 0.5;
} else if (videoDurationInSeconds <= 600) { // 1 分钟到 10 分钟
    interval = 1;
} else if (videoDurationInSeconds <= 1800) { // 10 分钟到 30 分钟
    interval = 2;
} else if (videoDurationInSeconds <= 3600) { // 30 分钟到 1 小时
    interval = 60; // 1 分钟
} else { // 超过 1 小时
    interval = 120; // 2 分钟
}

    totalIntervals = Math.ceil(videoDurationInSeconds / interval);

return { interval, totalIntervals };
}