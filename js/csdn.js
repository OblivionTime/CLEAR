/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-06-09 14:07:54
 * @LastEditors: solid
 * @LastEditTime: 2022-06-10 11:59:47
 */
//优化登陆后复制
$('code').css({ 'user-select': 'unset' })
$('#content_views pre').css({ 'user-select': 'unset' })
$('#content_views pre').css({ 'user-select': 'unset' })
//修改复制样式
$('.hljs-button').attr("data-title", "复制")
$('.hljs-button').attr("onclick", "hljs.copyCode(event)")
$('.hljs-button').attr("data-report-click", '{"spm":"1001.2101.3001.4259"}')
$('.hljs-button').on("click",function(e){
	setTimeout(function() {
		$('.hljs-button').attr("data-title", "复制")
    },3500)
})
$('#content_views pre code').attr("onclick", "mdcp.copyCode(event)")
//移除readmore按钮，并显示全文
$('.hide-article-box').remove();
$('.article_content').css({ 'height': 'initial' })
// 向页面注入JS
function injectCustomJs()
{
	jsPath ='js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.head.appendChild(temp);
}
injectCustomJs()