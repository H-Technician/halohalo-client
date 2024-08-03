// 互动 点赞关注
export interface InteractionLike {
    id: number
    vid: number
    uid: number
    left: number
    top: number
    timeStart: number
    timeEnd: number
}
// 互动 外链视频
export interface InteractionLink {
    id: number
    vid: number
    uid: number
    left: number
    top: number
    link_url: string
    link_content: string
    timeStart: number
    timeEnd: number
}
// 互动 投票
export interface InteractionVote {
    id: number
    vid: number
    uid: number
    left: number
    top: number
    question: string
    timeStart: number
    timeEnd: number
    VoteOptions: VoteOption[]
}
interface VoteOption {
    id: number
    voteid: number
    option_text: string
    anvote_count: number
}
