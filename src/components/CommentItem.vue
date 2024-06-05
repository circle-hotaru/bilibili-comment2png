<template>
  <!-- <div
    class="comment"
    :class="{ 'comment-dark': sharedState.darkTheme }"
    :style="{ 'border-radius': sharedState.borderRadius + 'px' }"
  >
    <img class="author-thumbnail" :src="comment.member.avatar" alt="头像" />
    <div class="comment-main">
      <div class="user-name" :class="{ 'user-name-dark': sharedState.darkTheme }">
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
  </div> -->
  <div>test</div>
</template>

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
