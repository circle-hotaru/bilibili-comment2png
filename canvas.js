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
        fetching: '',
        pending: '',
        comments: [],
        // 用户头像
        avatar: ''
    },
    watch: {
        AVId: function (newId) {
            this.getComments(newId);
        }
    },
    methods: {
        getAVId: function (BVId) {
            var that = this;
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
        }
    }
})