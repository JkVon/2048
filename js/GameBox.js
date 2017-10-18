/**
 * Created by jkvon on 2017/7/7.
 */

/*
 * 类功能：实现对16个block的生成、合并等操作
 * 构造方式：构造函数模式+原型模式
 */
function GameBox(block) {
    
    var gameBlock = block;

    //保存前一状态
    this.lastState = [[], [], [], []];
    this.lastState[0][0] = null;
    this.lastState[0][1] = null;
    this.lastState[0][2] = null;
    this.lastState[0][3] = null;
    this.lastState[1][0] = null;
    this.lastState[1][1] = null;
    this.lastState[1][2] = null;
    this.lastState[1][3] = null;
    this.lastState[2][0] = null;
    this.lastState[2][1] = null;
    this.lastState[2][2] = null;
    this.lastState[2][3] = null;
    this.lastState[3][0] = null;
    this.lastState[3][1] = null;
    this.lastState[3][2] = null;
    this.lastState[3][3] = null;
}
GameBox.prototype = {

    /*用该属性来判断创建的对象的类型*/
    constructor: GameBox,

    /*
     * 函数功能：随机生成值为2或4的block
     * 参数：无
     * 返回值：一个包含新行、列值的对象
     */
    randomCreateBlock: function () {
        var block_row = Math.floor(Math.random() * 4),
            block_column = Math.floor(Math.random() * 4),
            blockID = gameBlock.convertToBlockId(block_row, block_column),
            blockNum_2Or4 = Math.floor(Math.random() * 2 + 1) * 2;

        //如果该block已经显示，说明修改失败，需要重新生成随机数
        while (!gameBlock.isBlockHided(blockID)) {
            block_row = Math.floor(Math.random() * 4);
            block_column = Math.floor(Math.random() * 4);
            blockID = gameBlock.convertToBlockId(block_row, block_column);

            console.log("!!!!!!!!!!!!!!Recreate!!!!!!!!!!!!!!!!!");
        }

        gameBlock.setBlockNum(blockID, blockNum_2Or4);


        //先确保已经移除过渡动画，才能添加过渡动画成功
        gameBlock.hideBlock(blockID, "show");
        // console.log("ok");
        return blockID;
    },

    /*
     * 函数功能：把所有的块都隐藏
     * 参数：无
     * 返回值：无
     */
    cleanAllBlocks: function () {
        var i,j;

        for(i = 0; i < 4; i++){
            for(j = 0; j < 4; j++) {
                if (!gameBlock.isBlockHided(gameBlock.convertToBlockId(i, j))) {
                    gameBlock.hideBlock(gameBlock.convertToBlockId(i, j), "hide");
                }
            }
        }
    },

    /*
     * 函数功能：判断两个block的值是否相等；
     * 参数：blockA的行、列值，blockB的行、列值
     * 返回值：true表示相等，false表示不等
     */
    blockEqual: function (block1ID, block2Id) {
        return (gameBlock.getBlockNum(block1ID) === gameBlock.getBlockNum(block2Id));
    },

    /*
     * 函数功能：计算当前所有block值的总和
     * 参数：无
     * 返回值：整型数
     */
    calculateTotalScore : function () {
        var totalScore = 0,
            i,j;

        for(i = 0; i < 4; i++){
            for(j = 0; j < 4; j++) {
                if (!gameBlock.isBlockHided(gameBlock.convertToBlockId(i, j))) {
                    totalScore += parseInt(gameBlock.getBlockNum(gameBlock.convertToBlockId(i, j)));
                }
            }
        }
        return totalScore;
    },

    /*
     * 函数功能：把block从一个点移到另一个点
     *
     */
    moveBlock: function (fromBlockID, toBlockID) {
        var blockVal = document.getElementById(fromBlockID).firstChild.nodeValue;

        gameBlock.hideBlock(fromBlockID, "hide");
        gameBlock.setBlockNum(toBlockID, blockVal);
        gameBlock.hideBlock(toBlockID, "show");
    },

    /*
     * 函数功能：把block的值乘以2，然后再移动到另一个点
     *
     */
    combineBlock: function (fromBlockID, toBlockID) {
        var blockVal = document.getElementById(fromBlockID).firstChild.nodeValue *2;

        gameBlock.hideBlock(fromBlockID, "hide");
        gameBlock.setBlockNum(toBlockID, blockVal);
        gameBlock.hideBlock(toBlockID, "show");
    },

    /* 函数功能： 调用该方法，逐一保存16个块的当前状态——当前显示的数值 或 null */
    saveBlocks: function () {
        var i,j;

        for(i = 0; i < 4; i++){
            for(j = 0; j < 4; j++){
                if(!gameBlock.isBlockHided(gameBlock.convertToBlockId(i, j))){
                    this.lastState[i][j] = gameBlock.getBlockNum(gameBlock.convertToBlockId(i, j));
                }else{
                    this.lastState[i][j] = null;
                }
            }
        }
    },

    /* 返回上一次操作后的状态，包括颜色和数值 */
    backState: function () {
        var i,j;

        for(i = 0; i < 4; i++){
            for(j = 0; j < 4; j++){
                if(this.lastState[i][j] !== null){
                    gameBlock.setBlockNum(gameBlock.convertToBlockId(i, j), this.lastState[i][j]);
                    gameBlock.hideBlock(gameBlock.convertToBlockId(i, j), "show");
                }else{
                    gameBlock.hideBlock(gameBlock.convertToBlockId(i, j), "hide");
                }
            }
        }
    }


};