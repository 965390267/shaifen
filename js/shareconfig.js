var myurl = location.href.split('#')[0];
myurl = encodeURIComponent(myurl);
fetch('http://pay.91yunshi.com/payment/sign/signUrl?url=' + myurl).then(function(res){
    return res.json()
}).then(function(res){
   var  data = res.data;

        wx.config({
            debug: false,
            appId: 'wxc40a603712f455e0',
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'hideMenuItems',
                'showMenuItems'
            ]
        });

        setShareInfo({
            title: '晒分测进面',
            summary: "分享晒出你的分数查看历年最高分吧！",
            pic: 'http://store.91yunshi.com/storage/guagua/44*44*34fe1a998ca98d116a903d4727d878b4.jpg',
            url: 'http://pay.91yunshi.com/shaifen/index.html',
            WXconfig: {
                swapTitleInWX: true,
                appId: 'wxc40a603712f455e0',
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
            }
        });
})
// $.ajax({
//     url: 'http://pay.91yunshi.com/payment/sign/signUrl?url=' + myurl,
//     data: {
    
//     },
//     success: function(data) {

//         var data = JSON.parse(data)
    

//     },
//     error: function(data) {
        

//     },
//     async: false
// });
var shareConfig = {
    title: '晒分测进面',
    desc: "分享晒出你的分数查看历年最高分吧！", // 分享描述
    link: 'http://pay.91yunshi.com/shaifen/index.html',
    imgUrl: 'http://store.91yunshi.com/storage/guagua/44*44*34fe1a998ca98d116a903d4727d878b4.jpg', // 分享图标

};

wx.ready(function() {
    wx.checkJsApi({
        jsApiList: [
            "onMenuShareTimeline", //分享给好友 
            "onMenuShareAppMessage", //分享到朋友圈 
            "onMenuShareQQ", //分享到QQ 
            "onMenuShareWeibo" //分享到微博 
        ],
        success: function(res) {
            // alert('分享成功')
        }
    });
    wx.onMenuShareAppMessage(shareConfig);
    wx.onMenuShareTimeline(shareConfig);
    wx.onMenuShareQQ(shareConfig);
    wx.onMenuShareWeibo(shareConfig);

});