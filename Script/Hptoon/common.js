document.addEventListener('plusready', function () {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function () {
        webview.canBack(function (e) {
            if (e.canBack) {
                webview.back();
            } else {
                //webview.close(); //hide,quit
                //plus.runtime.quit();
                mui.plusReady(function () {
                    //首页返回键处理
                    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                    var first = null;
                    plus.key.addEventListener('backbutton', function () {
                        //首次按键，提示‘再按一次退出应用’
                        if (!first) {
                            first = new Date().getTime();
                            mui.toast('再按一次退出应用');
                            setTimeout(function () {
                                first = null;
                            }, 1000);
                        } else {
                            if (new Date().getTime() - first < 1500) {
                                plus.runtime.quit();
                            }
                        }
                    }, false);
                });
            }
        })
    });
});
var action_size = 0;

/*获取cookie*/
function getCookie(name) {
    if ($.cookie) {
        return $.cookie(name);
    } else {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return decodeURIComponent(arr[2]);
        else
            return null;
    }
}
/*设置cookie*/
function setCookie(name, val, path, expires) {
    if ($.cookie) {
        $.cookie(name, val, { path: path, expires: expires });
    } else {
        var exp = new Date();
        exp.setTime(exp.getTime() + expires);
        var gmts = exp.toGMTString();
        document.cookie = name + '=' + val + " ;expires=" + gmts + ' ;path=' + path;
    }
}

/*登录cookie*/
function UserCookie() {
    //先读cookie
    var reaua = getCookie("reauamluserid");
    //cookie读不到就读localStorage
    if (!reaua) {
        if (localStorage.myCookies != undefined) {
            myCookie = JSON.parse(localStorage.myCookies);
            if (myCookie.reaua != undefined) {
                reaua = myCookie.reaua;
                setCookie("reaua", myCookie.reaua, "/", 99999);
                setCookie("reauath3", myCookie.reauath3, "/", 99999);
                setCookie("reauathb", myCookie.reauathb, "/", 99999);
                setCookie("reauathe", myCookie.reauathe, "/", 99999);
                setCookie("reauathf", myCookie.reauathf, "/", 99999);
                setCookie("reauathj", myCookie.reauathj, "/", 99999);
                setCookie("reauathn", myCookie.reauathn, "/", 99999);
                setCookie("reauatho", myCookie.reauatho, "/", 99999);
                setCookie("reauathp", myCookie.reauathp, "/", 99999);
                setCookie("reauathq", myCookie.reauathq, "/", 99999);
                setCookie("reauathx", myCookie.reauathx, "/", 99999);
                setCookie("reauava", myCookie.reauava, "/", 99999);
            }
        }
    } else {
        //有了就写入localStorage
        var reauath3 = getCookie("reauath3");
        var reauathb = getCookie("reauathb");
        var reauathe = getCookie("reauathe");
        var reauathf = getCookie("reauathf");
        var reauathj = getCookie("reauathj");
        var reauathn = getCookie("reauathn");
        var reauatho = getCookie("reauatho");
        var reauathp = getCookie("reauathp");
        var reauathq = getCookie("reauathq");
        var reauathx = getCookie("reauathx");
        var reauava = getCookie("reauava");
        if (
            reauath3 &&
            reauathb &&
            reauathe &&
            reauathf &&
            reauathj &&
            reauathn &&
            reauatho &&
            reauathp &&
            reauathq &&
            reauathx &&
            reauava
        ) {
            localStorage.myCookies = JSON.stringify({
                reaua: reaua,
                reauath3: reauath3,
                reauathb: reauathb,
                reauathe: reauathe,
                reauathf: reauathf,
                reauathj: reauathj,
                reauathn: reauathn,
                reauatho: reauatho,
                reauathp: reauathp,
                reauathq: reauathq,
                reauathx: reauathx,
                reauava: reauava
            });
        }
    }
    if (getCookie("reauamluserid")) {
        m_global.userId = getCookie("reauamluserid");
        m_global.username = getCookie("reauamluserid");
        m_global.isLogin = true;
        //登录后存储订阅信息
        // if(localStorage.mySubscribeData==undefined){
        //var url = '/api/mysubscribe';
        //T.restGet(url, {}, function (resjson) {
        // 存储
        // if(resjson.code == 0){
        // if(resjson.data.comics.length>0){
        // localStorage.mySubscribeData = JSON.stringify(resjson.data.comics);
        // }else{
        // localStorage.mySubscribeData = [];
        //}
        //}

        //});
        //}
    } else {
        //没取到就从map找取cookie的方法
        if (window.ccm != undefined) {
            if (window.ccm[document.domain] != undefined) {
                $.ajax({
                    type: "post",
                    url: window.ccm[document.domain] + '/api/cookie',
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function (json) {
                        if (json.code == 0 && json.data.cookies != undefined) {
                            for (var key in json.data.cookies) {
                                if (json.data.cookies[key] == null) {
                                    return;
                                }
                            }
                            localStorage.myCookies = JSON.stringify(json.data.cookies);
                            for (var key in json.data.cookies) {
                                setCookie(key, json.data.cookies[key], "/", 99999);
                            }
                            //再自动登录
                            T.restGet('/api', {}, function (resjson) { });
                        }
                    },
                    error: function () {
                        //获取不到 不处理
                    }
                });
            }
        }

    }
}
//订阅消息
function subscribeUnread() {
    var url = '/subscribeUnread';
    T.restGet(url, {}, function (data) {
        if (data.unreadCount != 0 && m_global.isLogin == true) {
            $("#subscribe").show();
        } else {
            $("#subscribe").hide();
        }
    })
}

//用户名转码
function URLdecode(str) {
    var ret = "";
    for (var i = 0; i < str.length; i++) {
        var chr = str.charAt(i);
        if (chr == "+") {
            ret += " ";
        } else if (chr == "%") {
            var asc = str.substring(i + 1, i + 3);
            if (parseInt("0x" + asc) > 0x7f) {
                ret += decodeURI("%" + str.substring(i + 1, i + 9));
                i += 8;
            } else {
                ret += String.fromCharCode(parseInt("0x" + asc));
                i += 2;
            }
        } else {
            ret += chr;
        }
    }
    return ret;
}

/*退出登录*/
function userSubmit() {
    localStorage.removeItem("mySubscribeData");
    $.cookie("reaua", null);
    location.href = (m_global.crcck.length > 0 ? ("/" + m_global.crcck) : "") + '/index';
}

//全局
var m_global = {
    document_hei: 200,
    crcck: "", //渠道
    userPhoto: "",//用户头像
    username: "",//用户名
    userId: "",//用户ID
    isLogin: false,//是否登录
    isHead: false,
    comicId: "",//订阅漫画Id
    Open: function (obj) {
        $('#' + obj).show();
    },
    closed: function (obj) {
        $('#' + obj).hide();
        $("#HotTag").hide();
        $("#hotTit").hide();
        $("#messagelist").hide();
        $("#searInput").val("");
        $(".show").remove();
        $(".messagSjr").css("padding-bottom", "0px");
    },
    //点开搜索
    serchAction: function (obj) {
        $("body").append("<div class='show'></div>");
        $(".show").show().css("top", "92px");
        $("#hotTit").show();
        $("#HotTag").show();
        $('#' + obj).show();
        headSerch("#searInput");
        $(".messagSjr").css("padding-bottom", "20px");
        hotTag();
    },
    //返回顶部
    toTop: function () {
        $("html,body").animate({
            "scrollTop": $("body").offset().top
        })
    },
    //个人首页点击我的订阅进入订阅页面
    subAction: function () {
        UserCookie();
        location.href = (m_global.crcck.length > 0 ? ("/" + m_global.crcck) : "") + '/subscribe';
    },
    //截取标题长度方法
    character: function (obj, maxstr) {
        $("." + obj).each(function () {
            var maxwidth = maxstr;
            if ($(this).text().length > maxwidth) {
                $(this).text($(this).text().substring(0, maxwidth));
            }
        })
    },
    headPhotoClick: function () {
        UserCookie();
        location.href = (m_global.crcck.length > 0 ? ("/" + m_global.crcck) : "") + "/my";
        /*
         if(m_global.isLogin==true){
         location.href=(m_global.crcck.length>0?("/"+m_global.crcck):"")+"/my"
         }else{
         $.cookie("ismy",1,{path:"/",domain:'.papaman.net'});
         location.href=(m_global.crcck.length>0?("/"+m_global.crcck):"") + "/login";
         }
         */

    },
    //导航样式
    navStyle: function (index) {
        switch (index) {
            case 0: {
                $(".nav li").eq(0).find("a").addClass("cur").parent("li").siblings().find("a").removeClass("cur");
                break;
            }
            case 1: {
                $(".nav li").eq(1).find("a").addClass("cur").parent("li").siblings().find("a").removeClass("cur");
                break;
            }
            case 2: {
                $(".nav li").eq(2).find("a").addClass("cur").parent("li").siblings().find("a").removeClass("cur");
                break;
            }
            case 3: {
                $(".nav li").eq(3).find("a").addClass("cur").parent("li").siblings().find("a").removeClass("cur");
                break;
            }
            case 4: {
                $(".nav li").eq(4).find("a").addClass("cur").parent("li").siblings().find("a").removeClass("cur");
                break;
            }
            case 5: {
                $(".nav li").find("a").removeClass("cur");
                break;
            }
        }
    }
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


Array.prototype.lastObject = function () {
    var arr_len = this.length;
    if (arr_len == 0) {
        return null;
    }

    return this[arr_len - 1];
};

Array.prototype.firstObject = function () {
    var arr_len = this.length;
    if (arr_len == 0) {
        return null;
    }
    return this[0];
};

//删除数组元素
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


//弹层定位
function openwindow(html) {
    var showBg = $('<div class="show">')
    var layerHtml = $('<div class="layer">');
    $("body").append(showBg).append(layerHtml);
    var top = ($(window).height() - layerHtml.height()) / 2;
    var left = ($(window).width() - layerHtml.width()) / 2;
    layerHtml.css({ top: top, left: left });
    showBg.show();
    layerHtml.show().append(html);
    /*
     }else if(cla==2){//订阅弹层
     layerHtml.append($('<div>').addClass("layerIcon02"))
     .addClass("layerz")
     .append('<p class="LinHei">您确定要取消该漫画订阅吗？</p>')
     .append('<a class="PubBtn look" id=okBtn>确定</a><a class="PubBtn can" id="Cancel">取消</a>')
     }else if(cla==3){//清空浏览记录
     layerHtml.append($('<div>').addClass("layerIcon03"))
     .addClass("layerz")
     .append('<p class="LinHei">您确定要清空所有浏览记录吗？</p>')
     .append('<a class="PubBtn look" id=okBtn>确定</a><a class="PubBtn can" id="Cancel">取消</a>')
     }else if(cla==4){//删除书签
     layerHtml.append($('<div>').addClass("layerIcon04"))
     .addClass("layerz")
     .append('<p class="LinHei">您确定要删除书签吗？</p>')
     .append('<a class="PubBtn look" id=okBtn>确定</a><a class="PubBtn can" id="Cancel">取消</a>')
     }else if(cla==5){//删除收藏书单
     layerHtml.append($('<div>').addClass("layerIcon05"))
     .addClass("layerz")
     .append('<p class="LinHei">您确定要删除该书单收藏吗？</p>')
     .append('<a class="PubBtn look" id=okBtn>确定</a><a class="PubBtn can" id="Cancel">取消</a>')
     }*/
    layerHtml.find("#Cancel").click(function () {
        showBg.remove();
        layerHtml.remove();
    })
}


//分享弹层
function sharwindow() {
    var showBg = $('<div class="show" id="sharwndbg">');
    var sharWin = $(".sharWin");
    var window_h = $(window).height();
    var window_w = $(window).width();
    $("body").append(showBg);
    showBg.show();
    var top = (window_h - sharWin.height()) / 2;
    var left = (window_w - sharWin.width()) / 2;
    sharWin.css({ top: top }).css({ left: left }).show().addClass("layerz");
    sharWin.find(".sharClose").click(function () {
        $(".sharWin").removeClass("layerz").hide();
        showBg.remove();
    })
}

//图片尺寸
function imgStyle() {
    var divWidth = $(".imgBox li").width();
    var divHeight = Math.floor(divWidth / 0.76);
    $(".imgBox li img").css("height", divHeight);
}

//选项卡函数
function tab(titId, conId, titClass, conClass, showbg, type) {
    var tabTits = $('#' + titId).children(),
        tabCons = $('#' + conId).children(),
        len = tabTits.length;
    $('.' + showbg).height($(document).height());
    for (var i = 0; i < len; i++) {
        tabTits[i].index = i;
        tabTits[i].onclick = function () {
            $('#' + conId).show();
            for (var i = 0; i < len; i++) {
                tabTits[i].className = '';
                tabCons[i].className = '';
            };
            tabTits[this.index].className = titClass;
            tabCons[this.index].className = conClass;
            $('.' + showbg).show();
        };
        $('.' + showbg).click(function () {
            if (type == 1) {
                $('#' + titId).parent().hide();
                $('.' + showbg).hide()
            } else {
                $('#' + conId).hide();
                $('.' + showbg).hide();
            }
        })
    }
}
