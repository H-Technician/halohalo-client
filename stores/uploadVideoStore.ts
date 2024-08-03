import { t } from '@wangeditor/editor';
import { defineStore } from 'pinia';

export const useUploadVideoStore = defineStore('uploadVideo', {
  state(): UploadVideo {
    return {
      identifier: '' as string, // 投稿视频唯一标识
      videoTitle: '' as string, // 视频标题
      type: '' as string, // 视频类型
      auth: '' as string, // 视频作者
      duration: 0 as number, // 视频时长
      category_id: 0 as number, // 主视频分类
      sub_category_id: 0 as number, // 子视频分类
      tags: '' as string, // 视频标签
      descr: '' as string, // 视频描述/简介
      cover_url4x3: '' as string, // 4:3封面
      cover_url16x9: '' as string, // 16:9封面
    };
  },
  actions: {
    setIdentifier(value: string) {
      this.identifier = value;
    },
    setVideoTitle(value: string) {
        this.videoTitle = value;
    },
    setType(value: string) {
        this.type = value;
    },
    setAuth(value: string) {
      this.auth = value;
    },
    setDuration(value: number) {
        this.duration = value;
    },
    setCategoryId(value: number) {
        this.category_id = value;
    },
    setSubCategoryId(value: number) {
        this.sub_category_id = value;
    },
    setTags(value: string) {
      this.tags = value;
    },
    setDescr(value: string) {
        this.descr = value;
    },
    setCover_url4x3(value: string) {
      this.cover_url4x3 = value;
    },
    setCover_url16x9(value: string) {
        this.cover_url16x9 = value;
    },
  },
  // 注意：persist定义要做判断，因为localStorage/sessionStorage是客户端参数，所以需要加process.client
  persist: process.client && {
    storage: localStorage,
  },
});

export const useIsSubmitUploadVideoStore = defineStore('submitVideo', {
  state(): CubmitVideo {
    return {
      submitVideo: true,
    };
  },
  actions: {
    setSubmitVideo(value: boolean) {
      this.submitVideo = value;
    },
  },
  persist: process.client && {
    storage: localStorage,
  },
});

interface UploadVideo {
    identifier: string;
    videoTitle: string;
    type: string;
    auth: string;
    duration: number;
    category_id: number;
    sub_category_id: number;
    tags: string;
    descr: string;
    cover_url4x3: string;
    cover_url16x9: string;
}

interface CubmitVideo {
  submitVideo: boolean;
}