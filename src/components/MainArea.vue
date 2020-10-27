<template>
  <div>
    <div
      class="form-row justify-content-around align-items-center mx-0 mb-3 px-3 pt-3 pb-2 bg-white rounded-lg"
      v-if="!sharedState.fetching && sharedState.count > 0"
    >
      <div class="col-auto pb-2">
        <label class="mb-0" for="border-radius">调整圆角</label>
        <input
          type="range"
          id="border-radius"
          min="0"
          max="50"
          v-model="sharedState.borderRadius"
          :disabled="sharedState.pending"
        />
      </div>
      <div class="col-auto pb-2">
        <b-form-checkbox v-model="sharedState.displayTime" switch
          >显示时间</b-form-checkbox
        >
      </div>
      <div class="col-auto pb-2">
        <b-form-checkbox v-model="sharedState.darkTheme" switch
          >深色主题</b-form-checkbox
        >
      </div>
      <div class="col-auto pb-2">
        <select
          class="custom-select"
          v-model="sharedState.perPage"
          @change="getComments()"
          :disabled="sharedState.pending"
        >
          <option value="20">20人</option>
          <option value="40">40人</option>
        </select>
      </div>
      <div class="col-auto pb-2">
        <select
          class="custom-select"
          v-model="sharedState.mode"
          @change="getComments()"
          :disabled="sharedState.pending"
        >
          <option value="2">热度排序</option>
          <option value="0">时间排序</option>
        </select>
      </div>
      <div class="col-auto pb-2">
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="downloadComments()"
          :disabled="sharedState.pending"
        >
          <span class="align-middle">步骤3：下载图片(.zip)</span>
          <div
            class="spinner-border spinner-border-sm"
            role="status"
            v-if="sharedState.pending"
          >
            <span class="sr-only">处理中...</span>
          </div>
        </button>
      </div>
    </div>
    <b-pagination
      v-model="sharedState.currentPage"
      :total-rows="sharedState.count"
      :per-page="sharedState.perPage"
      prev-text="上一頁"
      next-text="下一頁"
      @change="getComments()"
      size="sm"
      v-if="sharedState.count > sharedState.perPage"
    >
    </b-pagination>
    <div class="d-flex flex-wrap align-items-start justify-content-center">
      <comment-item
        v-for="(comment, index) in sharedState.comments"
        :key="index"
        :comment="comment"
        ref="comment"
      />
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
import CommentItem from "@/components/CommentItem.vue";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

export default {
  name: "main-area",
  data() {
    return {
      sharedState: store.state,
    };
  },
  components: {
    CommentItem,
  },
  methods: {
    getComments() {
      store.getComments();
    },
    downloadComments() {
      this.$nextTick(() => {
        store.state.pending = true;
        let done = 0;
        // 初始化一个zip打包对象
        var zip = new JSZip();
        // 创建images文件夹用于存放图片
        var img = zip.folder(store.state.title);
        // 获取需要绘制的元素
        let comments = this.$refs.comment;
        for (let i = 0; i < comments.length; i++) {
          // 评论内容做图片名
          let imgName = comments[i].$el.innerText.split("\n")[1];
          // 返回元素的大小及其相对于视口的位置
          let rect = comments[i].$el.getBoundingClientRect();
          rect.x += 8.5;
          // 获取滚动轴滚动的长度
          let scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          html2canvas(comments[i].$el, {
            // 允许跨域（图片相关）
            allowTaint: true,
            // 允许跨域（图片相关）
            useCORS: true,
            // 截图的背景颜色
            backgroundColor: "transparent",
            // 图片x轴偏移量
            x: rect.x,
            scrollY: -scrollTop,
            // 放大2倍
            scale: 2,
            // 关闭日志
            logging: false,
          })
            .then(
              (canvas) => {
                let imgData = canvas
                  .toDataURL()
                  .split("data:image/png;base64,")[1];
                //这个images文件目录中创建一个base64数据为imgData的图像，图像名是上面获取的imaName
                img.file(imgName + ".png", imgData, { base64: true });
                done += 1;
              },
              function (error) {
                console.log(error);
                store.state.pending = false;
                alert("抱歉！出错啦w(ﾟДﾟ)w\n请重试(ノへ￣、)");
                return;
              }
            )
            .then(function () {
              // 把打包内容异步转成blob二进制格式
              // 判断循环结束，则开始下载压缩
              if (done === comments.length) {
                zip.generateAsync({ type: "blob" }).then(function (content) {
                  saveAs(content, store.state.title + ".zip");
                });
              } else return;
              store.state.pending = false;
            });
        }
      });
    },
  },
};
</script>

<style>
</style>