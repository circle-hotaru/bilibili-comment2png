var app = new Vue({
    el: '#app',
    data: {
        AVId: '',
        BVId: '',
        fetching: false,
        pending: false,
        comments: [],
        // 调整评论圆角
        borderRadius: 10,
        // 排序模式 0按时间，2按热度
        mode: 2,
        displayTime: true,
        darkTheme: false,
        limit: 20,
        // B站时间戳
        ctime: '',
        // 时间戳时间
        time: '',
        // 总评论数
        acount: '',
        // 一楼评论数
        count: '',
        // 当前页
        currentPage: 1,
        // 页面尺寸
        perPage: 20,
    },
    watch: {
        AVId: function (newval) {
            this.getComments(newval, this.currentPage, this.mode);
        },
        comments: function () {
            this.fetching = false;
            this.pending = false;
        },
        currentPage: function (newval) {
            this.getComments(this.AVId, newval, this.mode);
        },
        mode: function (newval) {
            this.getComments(this.AVId, this.currentPage, newval);
        },
    },
    methods: {
        getAVId: function (BVId) {
            var that = this;
            that.fetching = true;
            that.pending = true;
            axios.get("http://127.0.0.1:8089/api/v1/bv2av/?bvid=" + BVId)
                .then(function (response) {
                    that.AVId = response.data.data.aid;
                }, function (error) {
                    console.log(error);
                })
        },
        getComments: function (AVId, currentPage, mode) {
            var that = this;
            axios.get("http://127.0.0.1:8089/api/v1/comments/?oid=" + AVId + "&pn=" + currentPage + "&sort=" + mode)
                .then(function (response) {
                    that.comments = response.data.data.replies;
                    that.acount = response.data.data.page.acount;
                    that.count = response.data.data.page.count;
                    that.currentPage = response.data.data.page.num;
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
        // 下载图片
        downloadComments: function () {
            this.$nextTick(() => {
                setTimeout(() => {
                    // 解决滚动条对html2canvas造成的影响
                    window.scrollTo(0, 0);
                    // 获取需要绘制的元素
                    let comments = this.$refs.comment
                    for (let i = 0; i < comments.length; i++) {
                        html2canvas(comments[i], {
                            // 允许跨域（图片相关）
                            allowTaint: true,
                            // 允许跨域（图片相关）
                            useCORS: true,
                            // 截图的背景颜色
                            backgroundColor: 'transparent',
                            logging: false,
                        }).then(canvas => {
                            this.$refs.addimg.appendChild(canvas)
                        });
                    }
                }, 1000);
            })
        }
    },
})