<template>
  <div
    class="comment"
    :class="{ 'comment-dark': sharedState.darkTheme }"
    :style="{ 'border-radius': sharedState.borderRadius + 'px' }"
  >
    <img class="author-thumbnail" :src="comment.member.avatar" alt="头像" />
    <div class="comment-main">
      <div
        class="user-name"
        :class="{ 'user-name-dark': sharedState.darkTheme }"
      >
        {{ comment.member.uname }}
      </div>
      <div
        class="content"
        :class="{ 'content-dark': sharedState.darkTheme }"
        v-html="message"
      ></div>
      <div class="published-time" v-if="sharedState.displayTime">
        {{ timestampFormat(comment.ctime) }}
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'comment-item',
  props: {
    comment: Object,
  },
  data() {
    return {
      sharedState: store.state,
    }
  },
  computed: {
    message() {
      const { message, emote } = this.comment?.content //eslint-disable-line
      let _message = message
      if (emote) {
        Object.keys(emote).map((item) => {
          const regex = new RegExp(`\\${item}`, 'g')
          _message = _message.replace(
            regex,
            `<img src="${emote[item].url}" style="width: 20px; height: 20px" />`
          )
        })
        return _message
      }
      return _message
    },
  },
  methods: {
    // 时间戳转化
    timestampFormat: function (timestamp) {
      function zeroize(num) {
        return (String(num).length == 1 ? '0' : '') + num
      }

      var curTimestamp = parseInt(new Date().getTime() / 1000) //当前时间戳
      var timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数

      var curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
      var tmDate = new Date(timestamp * 1000) // 参数时间戳转换成的日期对象

      var Y = tmDate.getFullYear(),
        m = tmDate.getMonth() + 1,
        d = tmDate.getDate()
      var H = tmDate.getHours(),
        i = tmDate.getMinutes()

      if (timestampDiff < 60) {
        // 一分钟以内
        return '刚刚'
      } else if (timestampDiff < 3600) {
        // 一小时前之内
        return Math.floor(timestampDiff / 60) + '分钟前'
      } else if (
        curDate.getFullYear() == Y &&
        curDate.getMonth() + 1 == m &&
        curDate.getDate() == d
      ) {
        return '今天' + zeroize(H) + ':' + zeroize(i)
      } else {
        var newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
        if (
          newDate.getFullYear() == Y &&
          newDate.getMonth() + 1 == m &&
          newDate.getDate() == d
        ) {
          return '昨天' + zeroize(H) + ':' + zeroize(i)
        } else if (curDate.getFullYear() == Y) {
          return (
            zeroize(m) +
            '月' +
            zeroize(d) +
            '日 ' +
            zeroize(H) +
            ':' +
            zeroize(i)
          )
        } else {
          return (
            Y +
            '年' +
            zeroize(m) +
            '月' +
            zeroize(d) +
            '日 ' +
            zeroize(H) +
            ':' +
            zeroize(i)
          )
        }
      }
    },
  },
}
</script>

<style>
.comment {
  background-color: var(--comment-general-background);
  display: flex;
  border-radius: 10px;
  margin: 4px;
  padding: 16px;
  width: 360px;
}

.comment-dark {
  background-color: var(--comment-dark-background);
}

.comment .author-thumbnail {
  border-radius: 50%;
  flex-shrink: 0;
  height: 40px;
  margin-right: 16px;
  width: 40px;
}

.comment .comment-main .user-name {
  color: var(--comment-text-primary);
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  display: block;
}

.comment .comment-main .user-name-dark {
  color: var(--comment-dark-text-primary);
}

.comment .comment-main .content {
  color: var(--comment-text-primary);
  line-height: 24px;
  padding: 2px 0;
  font-size: 14px;
  overflow: hidden;
}

.comment .comment-main .content-dark {
  color: var(--comment-dark-text-primary);
}

.comment .comment-main .published-time {
  color: var(--comment-text-secondary);
  line-height: 26px;
  font-size: 12px;
}
</style>
