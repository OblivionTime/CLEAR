/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-06-09 16:35:38
 * @LastEditors: solid
 * @LastEditTime: 2022-06-11 22:44:26
 */
var bindClipboardEvent = function (clipboard) {
    clipboard.on("success", function (e) {
        $("#_copy").html("复制成功");
        setTimeout(function () { return $("#_copy").fadeOut(1000); }, 1000);
        e.clearSelection();
    });
    clipboard.on("error", function (e) {
        $("#_copy").html("复制失败");
        setTimeout(function () { return $("#_copy").fadeOut(1000); }, 1000);
        e.clearSelection();
    });
};
function copyToClip2() {
    $("#_copy").click()
}
function originalCopy(event) {
    const keyCode = event.keyCode || event.which || event.charCode; // 有些浏览器除了通过keyCode获取输入键code，还可以通过which，charCode获取，这么写是出于浏览器兼容性考虑
    const keyCombination = event.ctrlKey;
    if (keyCombination && keyCode == 67) {
        copyToClip2()
        event.stopImmediatePropagation()
    }
}
var copyTextLast = ""
//复制样式
function CopyPageText(clear, getSelectedText) {
    document.addEventListener("mouseup", (e) => {
        let copyText = getSelectedText();
        if (copyTextLast == copyText || copyText == "") {
            clear()
            $("#_copy").remove();
            return
        }
        copyTextLast = copyText
        clear()
        $("#_copy").remove();
        var template = "\n            <div id=\"_copy\"\n            style=\"left:".concat(e.pageX + 30, "px;top:").concat(e.pageY, "px;\"\n            data-clipboard-text=\"").concat(copyText.replace(/"/g, "&quot;"), "\">\u590D\u5236</div>\n        ");
        $("body").append(template);
        $("#_copy").on("mousedown", function (event) { return event.stopPropagation(); });
        $("#_copy").on("mouseup", function (event) { return event.stopPropagation(); });
        $("#_copy").on("click", (event) => {
            // copyToClip(copyText, event);
            var clipboard = new ClipboardJS("#_copy");
            bindClipboardEvent(clipboard);
        });
    });
}

//CSDN相关
var CSDN = {
    regexp: new RegExp("https://blog.csdn.net/*"),
    init: function () {
        if (hljs) {
            hljs.signin = ""
        }
        if (mdcp) {
            mdcp.signin = ""
        }
    }
}

//道客巴巴
var doc88 = {
    regexp: /.*doc88\.com\/.+/,
    path: "Core.Annotation.api._mf",
    init: function () {
        if (Config) {
            Config.vip = 1
            Config.logined = 1
        }
        // var cpFn = copyText.toString();
        // var fnResult = /<textarea[\s\S]*?>'\+([\S]*?)\+"<\/textarea>/.exec(cpFn);
        // this.path = fnResult[1];
        document.querySelectorAll("*").forEach(node =>
            node.addEventListener(
                "keydown",
                event => originalCopy(event),
                true
            )
        );
        CopyPageText(function () {
            $("#left-menu").remove();
        }, this.getSelectedText)
    },
    getSelectedText: () => {
        var select = window
        var path = "Core.Annotation.api._mf"
        path.split(".").forEach(function (v) {
            select = select[v];
        });
        return select
    },
}
//百度文库相关
var wenku = {
    regexp: new RegExp("https://wenku.baidu.com/*"),
    copyTextLast: "",
    init: function () {
        pageData.vipInfo.global_svip_status = 1;
        pageData.vipInfo.global_vip_status = 1;
        pageData.vipInfo.isVip = 1;
        pageData.vipInfo.isWenkuVip = 1;
        document.querySelectorAll("*").forEach(node =>
            node.addEventListener(
                "keydown",
                event => originalCopy(event),
                true
            )
        );
        CopyPageText(function () {
            $(".tips-wrap").remove();
        }, this.getSelectedText)
    },

    getSelectedText: function () {
        var result = /查看全部包含“([\s\S]*?)”的文档/.exec(document.body.innerHTML);
        if (result)
            return result[1];
        return "";
    }
};
var websites = [
    CSDN,
    wenku,
    doc88
];

var mather = function (regex, website) {
    if (regex.test(window.location.href)) {
        website.init();
        return true;
    }
    return false;
};
websites.some(function (website) {
    return mather(website.regexp, website);
});





