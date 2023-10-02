<template>
  <div id="app" class="container">
    <div class="row mt-4">
      <div class="col-12 col-md-6 d-flex flex-column">
        <h1 class="text-primary mb-4">Bilibili 评论转图片神器</h1>
        <div class="flex-grow-1">
          <img
            class="d-none d-md-block"
            src="./assets/images/j9rSZOk.png"
            alt=""
          />
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex flex-column">
        <p>
          此工具由
          <a href="https://github.com/circle-hotaru" target="_blank"
            >circlehotarux</a
          >
          开发可以将 Bilibili
          视频评论区里的评论转换成图片。应用场景如：呈现观众评论、评论互动、频道Q&A，将会陆续完善其他功能，敬请期待。
        </p>
        <h5>目前功能特色：</h5>
        <ul>
          <li>AI总结评论</li>
          <li>无评论获取数量上限</li>
          <li>自由修改评论外观</li>
          <li>ZIP压缩包打包下载</li>
          <li>评论内容为文件名</li>
        </ul>
      </div>
    </div>
    <hr />
    <div>
      <get-comments />
      <analysis />
      <main-area />
    </div>
  </div>
</template>

<script>
import GetComments from '@/components/GetComments.vue'
import MainArea from '@/components/MainArea.vue'
import Analysis from '@/components/Analysis.vue'

export default {
  name: 'App',
  components: {
    GetComments,
    MainArea,
    Analysis,
  },
}
</script>

<style>
.img-rounded-corners {
  border: 1px solid #00a1d6;
  border-radius: 10px;
  margin: 0.625rem 0;
  opacity: 0.5;
  width: 100%;
}
</style>
