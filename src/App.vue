<template>
  <div id="app" class="container">
    <div class="row mt-4">
      <div class="col-12 col-md-6 d-flex flex-column">
        <h1 class="text-primary mb-4">Bilibili评论转图片神器</h1>
        <div class="flex-grow-1">
          <img
            class="d-none d-md-block"
            src="./assets/images/j9rSZOk.png"
            alt=""
          />
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex flex-column">
        <img
          class="d-block img-rounded-corners"
          src="./assets/images/BilibiliBVId.gif"
          alt="获取BVID示例图"
        />
        <p>
          此工具由<a href="https://github.com/circle-hotaru" target="_blank"
            >circlehotarux</a
          >开发，可以实现将Bilibili视频评论区里的评论转换成PNG图片。应用场景如：呈现观众评论、评论互动、频道Q&amp;A，将会陆续完善其他功能，敬请期待。
        </p>
        <h5>目前功能特色：</h5>
        <ul>
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
      <main-area />
    </div>
  </div>
</template>

<script>
import GetComments from "@/components/GetComments.vue";
import MainArea from "@/components/MainArea.vue";

export default {
  name: "App",
  components: {
    GetComments,
    MainArea,
  },
};
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
