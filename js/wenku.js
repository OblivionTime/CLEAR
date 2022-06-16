/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-06-09 19:06:54
 * @LastEditors: solid
 * @LastEditTime: 2022-06-11 22:27:54
 */
// 向页面注入JS
function injectCustomJs() {
    jsPath = 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}
function clipboardJs() {
    jsPath = 'js/clipboard.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}
injectCustomJs()
clipboardJs()