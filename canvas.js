var app = new Vue({
    el: '#app',
    data: {
        AVId: '',
        BVId: '',
        fetching: false,
        pending: false,
        comments: [],
        // 调整评论样式圆角
        borderRadius: 10,
        // 排序模式 0按时间，2按热度
        mode: 2,
        // 是否显示时间
        displayTime: true,
        limit: 20,
        // 时间戳
        ctime: '',
        // 深色模式
        darkTheme: false,
        // 总评论数
        acount: '',
        // 一楼评论数
        count: '',
        // 当前页
        currentPage: 1,
        // 页面尺寸
        perPage: 20,
        // 画图进度
        done1: 0,
        // 压缩进度
        done2: 0
    },
    watch: {
        AVId: function (newval) {
            this.getComments(newval, 1, this.perPage, this.mode);
        },
        perPage: function (newval) {
            this.getComments(this.AVId, 1, newval, this.mode);
        },
        comments: function () {
            this.fetching = false;
            this.pending = false;
        },
        currentPage: function (newval) {
            // 如果只是当前页发生变化，那只需更新部分数据即可
            this.getComments2(this.AVId, newval, this.perPage, this.mode);
        },
        mode: function (newval) {
            this.getComments(this.AVId, 1, this.perPage, newval);
        },
    },
    methods: {
        // 通过BVId获取AVId
        getAVId: function (BVId) {
            var that = this;
            that.fetching = true;
            axios.get("http://127.0.0.1:8089/api/v1/bv2av/?bvid=" + BVId)
                .then(function (response) {
                    that.AVId = response.data.data.aid;
                }, function (error) {
                    console.log(error);
                })
        },
        // 获取评论
        getComments: function (AVId, currentPage, perPage, mode) {
            var that = this;
            axios.get("http://127.0.0.1:8089/api/v1/comments/?oid=" + AVId + "&pn=" + currentPage + "&ps=" + perPage + "&sort=" + mode)
                .then(function (response) {
                    that.comments = response.data.data.replies;
                    that.acount = response.data.data.page.acount;
                    that.count = response.data.data.page.count;
                    that.currentPage = response.data.data.page.num;
                    that.fetching = false;
                }, function (error) {
                    console.log(error);
                })
        },
        // 更改当前页获取评论
        getComments2: function (AVId, currentPage, perPage, mode) {
            var that = this;
            axios.get("http://127.0.0.1:8089/api/v1/comments/?oid=" + AVId + "&pn=" + currentPage + "&ps=" + perPage + "&sort=" + mode)
                .then(function (response) {
                    that.comments = response.data.data.replies;
                    that.currentPage = response.data.data.page.num;
                    that.fetching = false;
                }, function (error) {
                    console.log(error);
                })
        },
        // 时间戳转化
        timestampFormat: function (timestamp) {
            function zeroize(num) {
                return (String(num).length == 1 ? '0' : '') + num;
            }

            var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
            var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

            var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
            var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象

            var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
            var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

            if (timestampDiff < 60) { // 一分钟以内
                return "刚刚";
            } else if (timestampDiff < 3600) { // 一小时前之内
                return Math.floor(timestampDiff / 60) + "分钟前";
            } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
                return '今天' + zeroize(H) + ':' + zeroize(i);
            } else {
                var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
                if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
                    return '昨天' + zeroize(H) + ':' + zeroize(i);
                } else if (curDate.getFullYear() == Y) {
                    return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
                } else {
                    return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
                }
            }
        },
        // 下载评论
        downloadComments: function () {
            var that = this;
            that.pending = true;
            // 初始化一个zip打包对象
            var zip = new JSZip();
            // 创建images文件夹用于存放图片
            var img = zip.folder("images");
            that.done = 0;
            that.done1 = 0;
            that.done2 = 0;
            this.$nextTick(() => {
                setTimeout(() => {
                    // 解决滚动条对html2canvas造成的影响
                    // window.scrollTo(0, 0);
                    // document.documentElement.style.position = 'fixed';
                    // 获取需要绘制的元素
                    let comments = this.$refs.comment;
                    for (let i = 0; i < comments.length; i++) {
                        // 评论内容做图片名
                        let imgName = comments[i].innerText.split("\n")[1];
                        // 返回元素的大小及其相对于视口的位置
                        let rect = comments[i].getBoundingClientRect();
                        rect.x += 8.5;
                        // 获取滚动轴滚动的长度
                        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                        let width = comments[i].offsetWidth // 获取dom 宽度
                        let height = comments[i].offsetHeight // 获取dom 高度
                        html2canvas(comments[i], {
                            // 允许跨域（图片相关）
                            allowTaint: true,
                            // 允许跨域（图片相关）
                            useCORS: true,
                            // 截图的背景颜色
                            backgroundColor: 'transparent',
                            // 图片x轴偏移量
                            x: rect.x,
                            // 图片宽度
                            width: width,
                            // 图片高度
                            height: height,
                            // y轴滚动
                            scrollY: -scrollTop,
                            // 放大2倍
                            scale: 2,
                            // 关闭日志
                            logging: false,
                        }).then(canvas => {
                            let imgData = canvas.toDataURL().split('data:image/png;base64,')[1];
                            //这个images文件目录中创建一个base64数据为imgData的图像，图像名是上面获取的imaName
                            img.file(imgName + '.png', imgData, { base64: true });
                            that.done1 += 1;
                            console.log("添加图片" + i);
                        }).then(function () {
                            // 把打包内容异步转成blob二进制格式
                            // 判断循环结束，则开始下载压缩
                            if (that.done1 == comments.length) {
                                console.log("开始压缩下载！")
                                zip.generateAsync({ type: "blob" }, function updateCallback(metadata) {
                                    // that.done2 = metadata.percent;
                                    // that.done2 += (metadata.percent * comments.length) / 100;
                                    // that.done1 += that.done2;
                                }).then(function (content) {
                                    saveAs(content, "example.zip");
                                });
                            } else return;
                            that.pending = false;
                        });
                    };
                }, 1000);
            });
        }
    },
    // 计算下载进度
    // computed: {
    //     done: function () {
    //         return ((this.done1 * 50 / this.comments.length) + this.done2 / 2).toFixed(0);
    //     }
    // }
})