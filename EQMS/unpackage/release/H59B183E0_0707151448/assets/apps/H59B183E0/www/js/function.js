//mui.ajax请求数据
function mAjax(url, params, callback){
	mui.ajax(url,{
		data: params,
		dataType: 'json',
		type: 'post',
		success:function(data){
			
		},
		error: function(xhr,type,errorThrown){
			consola.log(xhr);
			consola.log(type);
			mui.toast("请求异常")
		}
	})
}

function dateFormat(date, formatStr){
	var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
  
    str=str.replace(/yyyy|YYYY/,date.getFullYear());   
    str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
  
    str=str.replace(/MM/,(date.getMonth()+1) >9 ? (date.getMonth()+1).toString():'0' + (date.getMonth()+1));   
    str=str.replace(/M/g,(date.getMonth()+1));   
  
    str=str.replace(/w|W/g,Week[date.getDay()]);   
  
    str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
    str=str.replace(/d|D/g,date.getDate());   
  
    str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
    str=str.replace(/h|H/g,date.getHours());   
    str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
    str=str.replace(/m/g,date.getMinutes());   
  
    str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
    str=str.replace(/s|S/g,date.getSeconds());   
  
    return str;   
}

//获取配置信息
function getConfig(){
    return window.config;
}

//获取appTitle
function getAppName(){
    return getConfig().appTitle;
}

/****************************LocalStorage操作********************************/
/**
 * 获取localStorage存储的key，前面加上MES-
 * @param  {String} key 原始key
 * @return {String}     前面加了MES-的key
 */
function getLsKey(key){
    if(key == null) return '';
    return getAppName() + '-' + key;
}
/**
 * 根据key获取localStorage的值
 * @param  {String} key 键
 * @return {String}     值
 */
function getLsItem(key){
    return localStorage.getItem(this.getLsKey(key));
}
/**
 * 根据key获取localStorage的值
 * @param  {String} key 键
 * @param  {String} value 值
 */
function setLsItem(key, value){
    localStorage.setItem(this.getLsKey(key), value);
}
/**
 * 根据key移除localStorage的值
 * @param  {String} key 键
 */
function removeLsItem(key){
    localStorage.removeItem(this.getLsKey(key));
}


//初始化访问地址
function initHost(){
	//判断缓存中是否存在host
	var _host = getLsItem("host");
	if(_host == null || _host == ''){
		var hosts = getConfig().initialServers;
	
		hosts.forEach(function(value, index, array){
			if(value.isdemo){
				setLsItem("host", value.host)
			}
		});
	}
}

//获取单选按钮值
function getRadioRes(className){
    var rdsObj = document.getElementsByClassName(className);
    var checkVal = null;
    for(i = 0; i < rdsObj.length; i++){
        if(rdsObj[i].checked){
        	checkVal = rdsObj[i].value;
        }
    }
    return checkVal;
}

//右滑返回
function touClass() {
	// 公有方法
	this.touch = function(fn1, fn2) {
		this.addEventListener('touchstart', function(event) {
			var touch = event.targetTouches[0];
			// 开始坐标
			this.startx = touch.pageX;
			this.starty = touch.pageY;
		})
		this.addEventListener('touchmove', function(event) {
			var touch = event.targetTouches[0];
			// 结束坐标
			this.endx = touch.pageX;
			this.endy = touch.pageY;
			var x = this.endx - this.startx;
			var y = this.endy - this.starty;
			var w = x < 0 ? x - 1 : x; //x轴的滑动值, w为x的绝对值
			var h = y < 0 ? y - 1 : y; //y轴的滑动值
			if(w > h) { //如果是在x轴中滑动,阻止默认事件
				event.preventDefault(); // 解决微信touchmove冲突并实现上下可滑动
			}
		})
		this.addEventListener('touchend', function(event) {
			if((this.startx - this.endx) >= 100 && fn1) {
				// 执行左滑回调
				fn1();
			}
			if((this.endx - this.startx) >= 100 && fn2) {
				// 执行右滑回调
				fn2();
			}
		})
	}
}

//将图片压缩转成base64 
function getBase64Image(img) { 
    var canvas = document.createElement("canvas");
    var width = img.width;
    var height = img.height;
    // calculate the width and height, constraining the proportions 
    if (width > height) { 
        if (width > 100) { 
            height = Math.round(height *= 100 / width); 
            width = 100; 
        } 
    } else { 
        if (height > 100) { 
            width = Math.round(width *= 100 / height); 
            height = 100; 
        }
    } 
    canvas.width = width;   /*设置新的图片的宽度*/
    canvas.height = height; /*设置新的图片的长度*/
    var ctx = canvas.getContext("2d"); 
    ctx.drawImage(img, 0, 0, width, height); /*绘图*/ 
    var dataURL = canvas.toDataURL("image/png", 0.8);
    return dataURL.replace("data:image/png;base64,", ""); 
}

//自动检查更新
/*
 * json格式：
 * 	{
		"state": "yes",
    	"mark": "1.0.6",
    	"url": "http:\/\/192.168.3.171:9999\/middol\/H5696B796_0307145309.apk"
	}
 **/
function svn(t) {
    var xhr_svn = new plus.net.XMLHttpRequest();
    xhr_svn.onreadystatechange = function() {
        if (xhr_svn.readyState == 4) {
            if (xhr_svn.status == 200) {  
                var res = JSON.parse(xhr_svn.responseText);  
                if (res.state == 'yes') {  
                    if (res.mark != t) {  
                        var upr;  
                        plus.nativeUI.confirm( "有新版本发布了，是否件更新？", function(e){  
                            upr=(e.index==0)?"Y":"N";  
                            if(upr=="Y"){  
                            var wt = plus.nativeUI.showWaiting('下载更新中，请勿关闭');  
                            var url = res.url; // 下载文件地址  
                            var dtask = plus.downloader.createDownload(url, {}, function(d, status) {  
                                if (status == 200) { // 下载成功 
                                    var path = d.filename;
                                    plus.runtime.install(path);
                                } else { //下载失败 
                                    alert("Download failed: " + status);
                                }  
                            });  
                            dtask.start();  
                            }else{  
                                  
                            }  
                        }, "EQMS系统", ["确认","取消"] );
                    } else {  
                        console.log('最新');  
                    }  
                }  
            } else { 
//              plus.nativeUI.toast("网络连接错误！");
				console.log("网络连接错误！");
            }  
        }  
    }  
    xhr_svn.open("GET", "http://192.168.3.171:9999/middol/update.json");//这里的地址是上面json文件的地址  
    xhr_svn.send();
}