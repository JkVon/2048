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
     * 函数功能：设置block的数值
     * 参数：行值、列值、block数值
     * 返回值：无
     */
    setBlockNum: function (blockID, blockNum) {
        var block= null,
            len = null, i;    //for循环变量

        block = document.getElementById(blockID);
        document.getElementById(blockID).firstChild.nodeValue = blockNum;
        for(i=0; i<block.classList.length; i++){
            if(/block--\d+/.test(block.classList[i])){
                block.classList.remove(block.classList[i]);
            }
        }
        block.classList.add("block--" + blockNum.toString());
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
        var block = document.getElementById(blockID);
            returnVal = null;   //返回
            if (hideOrShow === "hide") {

                // if block was show then hide it
                if(block.classList.contains("block--show")) {
                    block.classList.remove("block--show");
                    block.classList.add("block--hide");
                    this.setBlockNum(blockID, "");
                    returnVal = true;
                }
                else {
                    returnVal = false;
                }
            } else if(hideOrShow === "show"){

                // if block was hidden
                if (block.classList.contains("block--hide")) {
                    block.classList.remove("block--hide");
                    block.classList.add("block--show");
                    returnVal = true;
                }
                else {
                    returnVal = false;
                }
            } else {
                console.error("From Block.hideBlock() : 参数错误（hideOrShow）！");
            }
        
        return returnVal;
    },

    /*
     * 函数功能：判断block是否被隐藏
     * 参数：行值、列值
     * 返回值：true表示隐藏，false表示未隐藏
     *
     */
    isHided: function (blockID) {
        return document.getElementById(blockID).classList.contains("block--hide");
    }

};