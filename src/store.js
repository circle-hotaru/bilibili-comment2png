const axios = require("axios");
const corsUrl = "https://incircles-cors-server.herokuapp.com/";
const baseUrl = "http://api.bilibili.com";

export const store = {
  state: {
    AVId: "",
    BVId: "",
    title: "",
    fetching: false,
    pending: false,
    comments: [],
    // 排序模式 0按时间，2按热度
    mode: 2,
    // 调整评论样式圆角
    borderRadius: 10,
    displayTime: true,
    darkTheme: false,
    // 评论数
    count: 0,
    // 当前页
    currentPage: 1,
    // 页面尺寸
    perPage: 20,
    // 下载评论开关
    download: false,
  },
  getId() {
    this.state.fetching = true;
    const url = `${corsUrl}${baseUrl}/x/web-interface/view?bvid=${this.state.BVId}`;
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        this.state.AVId = data.data.aid;
        this.state.title = data.data.title;
        this.getComments();
      })
      .catch((error) => console.error(error));
  },
  getComments() {
    const url = `${corsUrl}${baseUrl}/x/v2/reply?type=1&oid=${this.state.AVId}&sort=${this.state.mode}&pn=${this.state.currentPage}&ps=${this.state.perPage}&nohot=1`;
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        this.state.comments = data.data.replies;
        this.state.count = data.data.page.count;
        this.state.fetching = false;
      })
      .catch((error) => console.error(error));
  },
  downloadComments() {
    this.state.download = true;
  },
};
