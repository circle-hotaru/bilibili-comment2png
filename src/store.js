const axios = require('axios');
const baseUrl = "http://127.0.0.1:8089";

export const store = {
    state: {
        AVId: "",
        BVId: "",
        // 视频名
        title: "",
        fetching: false,
        pending: false,
        // 评论
        comments: [],
        // 排序模式 0按时间，2按热度
        mode: 2,
        // 调整评论样式圆角
        borderRadius: 10,
        // 是否显示时间
        displayTime: true,
        // 深色模式
        darkTheme: false,
        // 评论数
        count: 0,
        // 当前页
        currentPage: 1,
        // 页面尺寸
        perPage: 20,
        // 下载评论开关
        download: false
    },
    getId() {
        this.state.fetching = true
        axios
            .get(
                baseUrl + "/api/v1/bv2av/?bvid=" +
                this.state.BVId
            )
            .then((response) => {
                this.state.AVId = response.data.data.aid;
                this.state.title = response.data.data.title;
                this.getComments()
            })
            .catch((error) => console.error(error));
    },
    // 获取评论
    getComments() {
        axios
            .get(
                baseUrl + "/api/v1/comments/?oid=" +
                this.state.AVId +
                "&pn=" +
                this.state.currentPage +
                "&ps=" +
                this.state.perPage +
                "&sort=" +
                this.state.mode
            )
            .then((response) => {
                this.state.comments = response.data.data.replies;
                this.state.count = response.data.data.page.count;
                this.state.fetching = false;
            })
            .catch((error) => console.error(error))
    },
    downloadComments() {
        this.state.download = true
    }
}