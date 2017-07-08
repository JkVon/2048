/*
 * Created by JackyVon on 2017/6/25.
 *
 */


/*
 * 对象：块处理对象
 * 构造方式：构造函数模式+原型模式
 *
 */
function Block() {

    /* 4*4的二维数组 */
    this.block = [[], [], [], []];

    this.block[0][0] = document.getElementById("block0_0");
    this.block[0][1] = document.getElementById("block0_1");
    this.block[0][2] = document.getElementById("block0_2");
    this.block[0][3] = document.getElementById("block0_3");
    this.block[1][0] = document.getElementById("block1_0");
    this.block[1][1] = document.getElementById("block1_1");
    this.block[1][2] = document.getElementById("block1_2");
    this.block[1][3] = document.getElementById("block1_3");
    this.block[2][0] = document.getElementById("block2_0");
    this.block[2][1] = document.getElementById("block2_1");
    this.block[2][2] = document.getElementById("block2_2");
    this.block[2][3] = document.getElementById("block2_3");
    this.block[3][0] = document.getElementById("block3_0");
    this.block[3][1] = document.getElementById("block3_1");
    this.block[3][2] = document.getElementById("block3_2");
    this.block[3][3] = document.getElementById("block3_3");

}
Block.prototype = {

    /*用该属性来判断创建的对象的类型*/
    constructor: Block,

    /* 
     * 函数功能：把形如（2， 0）的数值对，转换为block的id, 形如"block2_0"
     * 参数：形如（2， 0）的数值对
     */
    convertToBlockId: function (block_row, block_column) {

        return "block" + block_row.toString() + "_" + block_column.toString();
    },

    /*
     * 函数功能：设置block的背景色
     * 参数：块id、背景色
     * 返回值：无
     */
    setBlockColor: function (blockID, bgColor) {
        var blockSelector = "#" + blockID,
            sheet = null,   //样式表
            rules = null,   //规则集
            rule = null,    //规则
            i, j, len1, len2;    //for循环变量

        for (i = 0, len1 = document.styleSheets.length; i < len1; i++) {
            sheet = document.styleSheets[i];

            /*
             * 【疑问】：rules在服务器环境下正常获取，如果直接在文件夹里点击html打开的话，就无法获取样式表
             * 网上可能的答案：跨域了，webkit对于和html url地址不同域的css  cssRules都是null
             */
            rules = sheet.cssRules || sheet.rules;
            //console.log("-------------:"+rules);
            for (j = 0, len2 = rules.length; j < len2; j++) {
                rule = rules[j];
                if (rule.selectorText === blockSelector) {
                    rule.style.backgroundColor = bgColor;
                }
            }
        }
    },

    /*
     * 函数功能：设置block的数值
     * 参数：行值、列值、block数值
     * 返回值：无
     */
    setBlockNum: function (blockID, blockNum) {
        document.getElementById(blockID).firstChild.nodeValue = blockNum;

        switch (blockNum.toString()) {
            case "2":
                this.setBlockColor(blockID, "#D9D0C5");
                break;

            case "4":
                this.setBlockColor(blockID, "#D9CBB3");
                break;

            case "8":
                this.setBlockColor(blockID, "#E09D65");
                break;

            case "16":
                this.setBlockColor(blockID, "#E2814F");
                break;

            case "32":
                this.setBlockColor(blockID, "#E46B4B");
                break;

            case "64":
                this.setBlockColor(blockID, "#F85228");
                break;

            case "128":
                this.setBlockColor(blockID, "#dad189");
                break;

            case "256":
                this.setBlockColor(blockID, "#d9cf77");
                break;

            case "512":
                this.setBlockColor(blockID, "#dbcd54");
                break;

            case "1024":
                this.setBlockColor(blockID, "#df9e05");
                break;

            case "2048":
                this.setBlockColor(blockID, "#da7303");
                break;

            default :
                this.setBlockColor(blockID, "#f5ece7");

        }
    },

    /*
     * 函数功能：获block的数值
     * 参数：行值、列值
     * 返回值：无
     */
    getBlockNum: function (blockID) {
        return document.getElementById(blockID).firstChild.nodeValue;
    },

    /*
     * 函数功能：隐藏或显示block
     * 参数：行值、列值、隐藏或显示的选项（值为："hide","show"）
     * 返回值：返回true表示修改成功，false表示修改失败
     */
    hideBlock: function (blockID, hideOrShow) {
        var blockSelector = "#" + blockID,
            sheet = null,   //样式表
            rules = null,   //规则集
            rule = null,    //规则
            i = null, j = null,    //for循环变量
            returnVal = null;   //返回

        for (i = 0, len = document.styleSheets.length; i < len; i++) {
            sheet = document.styleSheets[i];
            rules = sheet.rules || sheet.cssRules;
            for (j = 0, len2 = rules.length; j < len2; j++) {
                rule = rules[j];
                if (rule.selectorText === blockSelector) {

                    // switcher为一个boolean值，为true时隐藏block
                    // 为false时，显示block
                    if (hideOrShow === "hide") {
                        if (rule.style.visibility !== "hidden") {
                            rule.style.visibility = "hidden";
                            this.setBlockNum(blockID, 0);
                            returnVal = true;
                        }
                        else {
                            returnVal = false;
                        }
                    } else if(hideOrShow === "show"){
                        if (rule.style.visibility !== "visible") {
                            rule.style.visibility = "visible";
                            returnVal = true;
                        }
                        else {
                            returnVal = false;
                        }
                    } else {
                        console.error("From Block.hideBlock() : 参数错误（hideOrShow）！");
                    }
                }
            }
        }
        return returnVal;
    },

    /*
     * 函数功能：判断block是否被隐藏
     * 参数：行值、列值
     * 返回值：true表示隐藏，false表示未隐藏
     *
     */
    isBlockHided: function (blockID) {
        var blockSelector = "#" + blockID,
            sheet = null,   //样式表
            rules = null,   //规则集
            rule = null,    //规则
            i = null, j = null;    //for循环变量

        for (i = 0, len = document.styleSheets.length; i < len; i++) {
            sheet = document.styleSheets[i];
            rules = sheet.rules || sheet.cssRules;
            for (j = 0, len2 = rules.length; j < len2; j++) {
                rule = rules[j];
                if (rule.selectorText === blockSelector) {
                    return !(rule.style.visibility === "visible");
                }
            }
        }
    }

};









