import axios from 'axios'
import { SYSTEM_MESSAGE } from './constants'

export const store = {
  state: {
    AVId: '',
    BVId: '',
    title: '',
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
    fetchingAnalysis: false,
    analysis: undefined,
  },
  getId() {
    this.state.fetching = true

    const rawBVID = this.state.BVId
    const regex = /BV[0-9A-Z]+/i
    const matches = rawBVID.match(regex)
    const realBVID = matches ? matches[0].replace(/^BV/, '') : rawBVID

    const url = `/bili.api/x/web-interface/view?bvid=${realBVID}`
    axios
      .get(url)
      .then((response) => {
        const { data } = response
        this.state.AVId = data.data.aid
        this.state.title = data.data.title
        this.getComments()
      })
      .catch((error) => console.error(error))
  },
  getComments() {
    const url = `/bili.api/x/v2/reply?type=1&oid=${this.state.AVId}&sort=${this.state.mode}&pn=${this.state.currentPage}&ps=${this.state.perPage}&nohot=1`
    axios
      .get(url)
      .then((response) => {
        const { data } = response
        if (data.code === 0) {
          this.state.comments = data.data.replies
          this.state.count = data.data.page.count
          this.state.fetching = false
        } else {
          this.state.fetching = false
          console.log(data.message)
        }
      })
      .catch((error) => {
        this.state.fetching = false
        console.error(error)
      })
  },
  downloadComments() {
    this.state.download = true
  },
  getAnalysis() {
    this.state.fetchingAnalysis = true
    const comments = this.state.comments
      .map((comment) => comment.content.message)
      .join(';')
    const apiURL = `${process.env.VUE_APP_OPENAI_API_URL}/v1/chat/completions`
    const messages = [
      {
        role: 'system',
        content: SYSTEM_MESSAGE,
      },
      {
        role: 'user',
        content: comments,
      },
    ]
    axios
      .post(
        apiURL,
        {
          model: 'gpt-4o-2024-05-13',
          messages: messages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`,
          },
        }
      )
      .then(({ data }) => {
        this.state.fetchingAnalysis = false
        this.state.analysis = data.choices[0].message.content
      })
      .catch((error) => {
        this.state.fetchingAnalysis = false
        console.error(error)
      })
  },
}
