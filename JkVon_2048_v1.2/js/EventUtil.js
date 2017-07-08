/*
 * 兼容性的事件处理对象
 * Created by JackyVon on 2017/6/26.
 */

var EventUtil = {

    //获取兼容性event对象
    getEvent: function (event) {
        return event ? event : window.event;
    },

    //获取兼容性target
    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    //兼容性方式添加事件监听
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    //兼容性方式移除事件监听
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    //兼容性方式阻止事件默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    //获取按键字符编码charCode
    getCharCode: function (event) {
        return event.keyCode;

        //event.charCode 已经被规范弃用了！！！
        //if (typeof event.charCode === "number")

    }
};
