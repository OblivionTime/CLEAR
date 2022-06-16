/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-06-09 17:25:06
 * @LastEditors: solid
 * @LastEditTime: 2022-06-16 15:41:34
 */
// setTimeout(function () {
//     $('.Modal-closeButton').click()
// }, 2000)
function getXpath(xpath, contextNode, doc = document) {
    contextNode = contextNode || doc;
    try {
        const result = doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        // 应该总是返回一个元素节点
        return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
    } catch (err) {
        throw new Error(`无效 Xpath: ${xpath}`);
    }
}

// 知乎免登录
function removeLogin() {
    const removeLoginModal = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                if (target.querySelector('.signFlowModal')) {
                    let button = target.querySelector('.Button.Modal-closeButton.Button--plain');
                    if (button) button.click();
                } else if (getXpath('//button[text()="立即登录/注册"]', target)) {
                    target.remove();
                }
            }
        }
    };

    // 未登录时才会监听并移除登录弹窗
    if (location.hostname === 'zhuanlan.zhihu.com') { // 如果是文章页
        if (!document.querySelector('.ColumnPageHeader-profile>.AppHeader-menu')) { // 未登录
            const observer = new MutationObserver(removeLoginModal);
            observer.observe(document, { childList: true, subtree: true });
            if (getXpath('//button[text()="登录/注册"]')) getXpath('//button[text()="登录/注册"]').outerHTML = '<a class="Button AppHeader-login Button--blue" href="https://www.zhihu.com/signin" target="_blank">登录/注册</a>'; // [登录] 按钮跳转至登录页面
        }
    } else { // 不是文章页
        if (!document.querySelector('.AppHeader-profile>.AppHeader-menu')) { // 未登录
            const observer = new MutationObserver(removeLoginModal);
            observer.observe(document, { childList: true, subtree: true });
            document.lastElementChild.appendChild(document.createElement('style')).textContent = '.Question-mainColumnLogin, button.AppHeader-login {display: none !important;}'; // 屏蔽问题页中间的登录提示
            if (getXpath('//button[text()="登录/注册"]')) getXpath('//button[text()="登录/注册"]').outerHTML = '<a class="Button AppHeader-login Button--blue" href="https://www.zhihu.com/signin" target="_blank">登录/注册</a>'; // [登录] 按钮跳转至登录页面
        }
    }
}
removeLogin()