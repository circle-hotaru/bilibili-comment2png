//html转图片
//function generatorImage() {
//     html2canvas(document.querySelector("#capture")).then(canvas => {
//         document.body.appendChild(canvas)
//     });
// }

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
        // 排序模式
        mode: 'hotlist',
        displayTime: true,
        darkTheme: false,
        limit: 20,
        // B站时间戳
        ctime: '',
        // 时间戳时间
        time: ''
    },
    watch: {
        AVId: function (newId) {
            this.getComments(newId);
        },
        comments: function () {
            this.fetching = false;
            this.pending = false;
        }
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
        getComments: function (AVId) {
            var that = this;
            axios.get("http://127.0.0.1:8089/api/v1/comments/?oid=" + AVId)
                .then(function (response) {
                    that.comments = response.data.data.replies;
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
        downloadComments: function () {
            var that = this;

        }
    },
    computed: {

    }
})