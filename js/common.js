var baseurl="http://applets.91yunshi.com";

// var baseurl='http://192.168.0.79:8098';

function objKeySort(arys)           //将关联数组按照key 字典序排序，返回值是排序后的数组。
{
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(arys).sort();
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = arys[newkey[i]];
    }
    return newObj;
}

function objToStr(obj){
       var str='';
       for(var key in obj){
            str+=key+'='+obj[key]+'&';   
       }
      str= str[str.length-1]=='&'?str.substr(0,str.length-1):str

      
       return str;
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var key='yun.shi.applets';
    var timestamp =+new Date();
    if (config.method == 'post') {
       
        if(config.url.indexOf('?')>-1){
            config.url=config.url+ '&timestamp='+timestamp+'&sign='+CryptoJS.MD5('timestamp='+timestamp+key).toString()
        }else{
            config.url=config.url+ '?timestamp='+timestamp+'&sign='+CryptoJS.MD5('timestamp='+timestamp+key).toString()
            // config.url=config.url+ '?timestamp='+timestamp+'&sign='+hex_md5(objToStr(objKeySort(config.data))+key) 
        }
          
        config.data = {
            ...config.data,          
        }
    } else if (config.method == 'get') {
    
      function getUrlParms(url){
        //首先获取地址
                  var url = url || window.location.href;
                  //获取传值
                  var arr = url.split("?");
                  //判断是否有传值
                  if (arr.length == 1) {
                      return {};
                  }
                  //获取get传值的个数
                  var value_arr = arr[1].split("&");
                  //循环生成返回的对象
                  var obj = {};
                  for (var i = 0; i < value_arr.length; i++) {
                      var key_val = value_arr[i].split("=");
                      obj[key_val[0]] = key_val[1];
                  }
                  return obj;
      }
      var obj=getUrlParms(config.url);
      obj.timestamp=timestamp;
     
      
      var objtostr= objToStr(objKeySort(obj));
      var keystore=  CryptoJS.MD5(objtostr+key).toString()
       
        
        config.params = {
            timestamp: timestamp,
            ...config.params,
            sign:keystore
        }
    }
     
    
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});