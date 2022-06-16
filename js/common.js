/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-06-09 17:15:06
 * @LastEditors: solid
 * @LastEditTime: 2022-06-09 17:15:21
 */
//删除所有复制后小尾巴
document.querySelectorAll('*').forEach(item => {
    item.oncopy = function (e) {
        e.stopPropagation();
    }
})
