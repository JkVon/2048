/*
 * 与事件监听和游戏控制有关
 * Created by JackyVon on 2017/6/26.
 */


/* 函数功能：在分数栏中为DOM中插入当前block值的总和 */
function insertScore() {
    document.getElementById("scoreBar").firstChild.nodeValue = gameBox.calculateTotalScore();
}

/*
 * 函数功能：以单行或单列为单位，以移动方向为x轴，由近到远的4个block依次编号为0、1、2、3，
 *      沿3、2、1、0方向两辆合并，然后再把block逐一移到x轴的最远端
 * 参数：依次为0、1、2、3这4个block的行、列值
 * 返回值：返回一个对象，包含两个属性，分别记录发生combine动作和move动作的次数
 */
function processBlock(block0_X, block0_Y, block1_X, block1_Y, block2_X, block2_Y, block3_X, block3_Y) {
    var i ,j = -1, k;

    /* 要返回的对象 */
    var result ={
            combineHappen: 0, // 记录此次操作发生的combineBlock动作的次数
            moveHappen: 0 // 记录此次操作发生的moveBlock动作的次数
        };

    var blockBox = [];
        blockBox[0] = gameBlock.convertToBlockId(block0_X, block0_Y);
        blockBox[1] = gameBlock.convertToBlockId(block1_X, block1_Y);
        blockBox[2] = gameBlock.convertToBlockId(block2_X, block2_Y);
        blockBox[3] = gameBlock.convertToBlockId(block3_X, block3_Y);

    /* 沿3、2、1、0方向两两合并，发生一次合并就跳出循环 */
    for(i = 3; i > -1; i--){
        if(!gameBlock.isHided(blockBox[i])){
            k = i;
            for(j = k - 1; j > -1; j--){
                if(!gameBlock.isHided(blockBox[j])){
                    if(gameBox.blockEqual(blockBox[j], blockBox[k])){
                        gameBox.combineBlock(blockBox[j], blockBox[k]);
                        result.combineHappen++;
                        break;
                    }else{
                        k = j;
                    }
                }
            }
            if(result.combineHappen){
                break;
            }
        }
    }

    /* 判断：如果第一次合并了2、3，则再判断是否可以继续合并0、1 */
    if( i === 3 && j === 2 ){
        if(!gameBlock.isHided(blockBox[0]) && !gameBlock.isHided(blockBox[1])){
            if(gameBox.blockEqual(blockBox[0], blockBox[1])){
                gameBox.combineBlock(blockBox[0], blockBox[1]);
                result.combineHappen++;
            }
        }
    }

    /* 沿0、1、2、3方向，逐一移动块2、1、0*/
    for(i = 2; i > -1; i--){
        if(!gameBlock.isHided(blockBox[i])){
            k = i;
            for(j = k + 1; j < 4; j++){
                if(gameBlock.isHided(blockBox[j])){
                    gameBox.moveBlock(blockBox[k], blockBox[j]);
                    k = j;
                    result.moveHappen++;
                }
            }
        }
    }

    return result;
}

/*
 * 函数功能：与processBlock函数原理一致，只是不会移动或者合并块，只是测试是否发生了移动或合并 */
function testProcessBlock(block0_X, block0_Y, block1_X, block1_Y, block2_X, block2_Y, block3_X, block3_Y) {
    var i ,j = -1, k;

    /* 要返回的对象 */
    var result ={
        combineHappen: 0, // 记录此次操作发生的combineBlock动作的次数
        moveHappen: 0 // 记录此次操作发生的moveBlock动作的次数
    };

    var blockBox = [];
    blockBox[0] = gameBlock.convertToBlockId(block0_X, block0_Y);
    blockBox[1] = gameBlock.convertToBlockId(block1_X, block1_Y);
    blockBox[2] = gameBlock.convertToBlockId(block2_X, block2_Y);
    blockBox[3] = gameBlock.convertToBlockId(block3_X, block3_Y);

    /* 沿3、2、1、0方向两两合并，发生一次合并就跳出循环 */
    for(i = 3; i > -1; i--){
        if(!gameBlock.isHided(blockBox[i])){
            k = i;
            for(j = k - 1; j > -1; j--){
                if(!gameBlock.isHided(blockBox[j])){
                    if(gameBox.blockEqual(blockBox[j], blockBox[k])){
                        result.combineHappen++;
                        break;
                    }else{
                        k = j;
                    }
                }
            }
            if(result.combineHappen){
                break;
            }
        }
    }

    /* 判断：如果第一次合并了2、3，则再判断是否可以继续合并0、1 */
    if( i === 3 && j === 2 ){
        if(!gameBlock.isHided(blockBox[0]) && !gameBlock.isHided(blockBox[1])){
            if(gameBox.blockEqual(blockBox[0], blockBox[1])){
                result.combineHappen++;
            }
        }
    }

    /* 沿0、1、2、3方向，逐一移动块2、1、0*/
    for(i = 2; i > -1; i--){
        if(!gameBlock.isHided(blockBox[i])){
            k = i;
            for(j = k + 1; j < 4; j++){
                if(gameBlock.isHided(blockBox[j])){
                    k = j;
                    result.moveHappen++;
                }
            }
        }
    }

    return result;
}

/* 【收获】：由于我的懒惰，我把20行代码写成了200行,而且还bug百出！！ */
function __XXX__processBlock(block0_X, block0_Y, block1_X, block1_Y, block2_X, block2_Y, block3_X, block3_Y) {

    /* 要返回的对象 */
    var result ={
        combineHappen: 0, // 记录此次操作发生的combineBlock动作的次数
        moveHappen: 0 // 记录此次操作发生的moveBlock动作的次数
    };

    if(!gameBlock.isHided(block3_X, block3_Y)){
        if(!gameBlock.isHided(block2_X, block2_Y)){
            if(gameBox.blockEqual(block2_X, block2_Y, block3_X, block3_Y)){
                gameBox.combineBlock(block2_X, block2_Y, block3_X, block3_Y);
                result.combineHappen++;
                if(!gameBlock.isHided(block1_X, block1_Y)){
                    if(!gameBlock.isHided(block0_X, block0_Y)){
                        if(gameBox.blockEqual(block0_X, block0_Y, block1_X, block1_Y)){
                            gameBox.combineBlock(block0_X, block0_Y, block1_X, block1_Y);
                            gameBox.moveBlock(block1_X, block1_Y, block2_X, block2_Y);
                            result.combineHappen++;
                            result.moveHappen++;
                        }else{
                            gameBox.moveBlock(block1_X, block1_Y, block2_X, block2_Y);
                            gameBox.moveBlock(block0_X, block0_Y, block1_X, block1_Y);
                            result.moveHappen++;
                        }
                    }else{
                        gameBox.moveBlock(block1_X, block1_Y, block2_X, block2_Y);
                        result.moveHappen++;
                    }
                }else{
                    if(!gameBlock.isHided(block0_X, block0_Y)){
                        gameBox.moveBlock(block0_X, block0_Y, block2_X, block2_Y);
                        result.moveHappen++;
                    }else{
                        // do nothing.
                    }
                }
            }else{
                if(!gameBlock.isHided(block1_X, block1_Y)){
                    if(gameBox.blockEqual(block1_X, block1_Y, block2_X, block2_Y)){
                        gameBox.combineBlock(block1_X, block1_Y, block2_X, block2_Y); //----------------
                        result.combineHappen++;
                        if(!gameBlock.isHided(block0_X, block0_Y)){
                            gameBox.moveBlock(block0_X, block0_Y, block1_X, block1_Y);
                            result.moveHappen++;
                        }else{
                            // do nothing.
                        }
                    }else{
                        if(!gameBlock.isHided(block0_X, block0_Y)){
                            if(gameBox.blockEqual(block0_X, block0_Y, block1_X, block1_Y)){
                                gameBox.combineBlock(block0_X, block0_Y, block1_X, block1_Y);
                                result.combineHappen++;
                            }else{
                                // do nothing.
                            }
                        }else{
                            // do nothing.
                        }
                    }
                }else{
                    if(!gameBlock.isHided(block0_X, block0_Y)){
                        if(gameBox.blockEqual(block0_X, block0_Y, block2_X, block2_Y)){
                            gameBox.combineBlock(block0_X, block0_Y, block2_X, block2_Y);
                            result.combineHappen++;
                        }else{
                            gameBox.moveBlock(block0_X, block0_Y, block1_X, block1_Y);
                            result.moveHappen++;
                        }
                    }else{
                        // do nothing.
                    }
                }
            }
        }else{
            if(!gameBlock.isHided(block1_X, block1_Y)){
                if(gameBox.blockEqual(block1_X, block1_Y, block3_X, block3_Y)){
                    gameBox.combineBlock(block1_X, block1_Y, block3_X, block3_Y);
                    result.combineHappen++;
                    if(!gameBlock.isHided(block0_X, block0_Y)){
                        gameBox.moveBlock(block0_X, block0_Y, block2_X, block2_Y);
                        result.moveHappen++;
                    }else{
                        // do nothing.
                    }
                }else{
                    gameBox.moveBlock(block1_X, block1_Y, block2_X, block2_Y);
                    result.moveHappen++;
                    if(!gameBlock.isHided(block0_X, block0_Y)){
                        gameBox.moveBlock(block0_X, block0_Y, block1_X, block1_Y);
                        result.moveHappen++;
                    }else{
                        // do nothing.
                    }
                }
            }else{
                if(!gameBlock.isHided(block0_X, block0_Y)){
                    if(gameBox.blockEqual(block0_X, block0_Y, block3_X, block3_Y)){
                        gameBox.combineBlock(block0_X, block0_Y, block3_X, block3_Y);
                        result.combineHappen++;
                    }else{
                        gameBox.moveBlock(block0_X, block0_Y, block2_X, block2_Y);
                        result.moveHappen++;
                    }

                }else{
                    // do nothing.
                }
            }
        }
    }else{
        if(!gameBlock.isHided(block2_X, block2_Y)){
            if(!gameBlock.isHided(block1_X, block1_Y)){
                if(gameBox.blockEqual(block1_X, block1_Y, block2_X, block2_Y)){
                    gameBox.combineBlock(block1_X, block1_Y, block2_X, block2_Y);
                    gameBox.moveBlock(block2_X, block2_Y, block3_X, block3_Y);
                    result.combineHappen++;
                    result.moveHappen++;
                }else{
                    if(!gameBlock.isHided(block0_X, block0_Y)){
                        if(gameBox.blockEqual(block0_X, block0_Y, block1_X, block1_Y)){
                            gameBox.combineBlock(block0_X, block0_Y, block1_X, block1_Y);
                            result.combineHappen++;
                            gameBox.moveBlock(block2_X, block2_Y, block3_X, block3_Y);
                            gameBox.moveBlock(block1_X, block1_Y, block2_X, block2_Y);
                            result.moveHappen++;
                        }else{
                            gameBox.moveBlock(block2_X, block2_Y, block3_X, block3_Y);
                            gameBox.moveBlock(block1_X, block1_Y, block2_X, block2_Y);
                            gameBox.moveBlock(block0_X, block0_Y, block1_X, block1_Y);
                        }
                    }else{

                    }
                }
            }else{
                if(!gameBlock.isHided(block0_X, block0_Y)){
                    if(gameBox.blockEqual(block0_X, block0_Y, block2_X, block2_Y)){
                        gameBox.combineBlock(block0_X, block0_Y, block2_X, block2_Y);
                        result.combineHappen++;
                        gameBox.moveBlock(block2_X, block2_Y, block3_X, block3_Y);
                        result.moveHappen++;
                    }else{
                        gameBox.moveBlock(block2_X, block2_Y, block3_X, block3_Y);
                        gameBox.moveBlock(block0_X, block0_Y, block2_X, block2_Y);
                        result.moveHappen++;
                    }
                }else{
                    gameBox.moveBlock(block2_X, block2_Y, block3_X, block3_Y);
                    result.moveHappen++;
                }
            }
        }else{
            if(!gameBlock.isHided(block1_X, block1_Y)){
                if(!gameBlock.isHided(block0_X, block0_Y)){
                    if(gameBox.blockEqual(block0_X, block0_Y, block1_X, block1_Y)){
                        gameBox.combineBlock(block0_X, block0_Y, block1_X, block1_Y);
                        gameBox.moveBlock(block1_X, block1_Y, block3_X, block3_Y);
                        result.combineHappen++;
                        result.moveHappen++;
                    }else{
                        gameBox.moveBlock(block1_X, block1_Y, block3_X, block3_Y);
                        gameBox.moveBlock(block0_X, block0_Y, block2_X, block2_Y);
                        result.moveHappen++;
                    }
                }else{
                    gameBox.moveBlock(block1_X, block1_Y, block3_X, block3_Y);
                    result.moveHappen++
                }
            }else{
                if(!gameBlock.isHided(block0_X, block0_Y)) {
                    gameBox.moveBlock(block0_X, block0_Y, block3_X, block3_Y);
                    result.moveHappen++;
                }else{
                    // do nothing.
                }
            }
        }
    }

    return result;
}

/*
 * 函数功能：根据操作方向决定如何处理block：移动/合并/生成
 * 参数：设移动方向为x轴，这里要传入轴上编号为0的block的行值、列值
 * 返回值：一个对象，等于processBlock的返回值
 */
function judgeDirection(block_row, block_column, moveDirection) {

    var result = null;  //用来保存processBlock方法返回的值

    switch (moveDirection) {
        case "up":
            result =processBlock(block_row, block_column, block_row - 1 ,block_column,
                block_row - 2, block_column, block_row - 3, block_column);
            break;

        case "down":
            result =processBlock(block_row, block_column, block_row + 1 ,block_column,
                block_row + 2, block_column, block_row + 3, block_column);
            break;

        case "left":
            result =processBlock(block_row, block_column, block_row, block_column - 1,
                block_row, block_column - 2, block_row, block_column - 3);
            break;

        case "right":
            result =processBlock(block_row, block_column, block_row, block_column + 1,
                block_row, block_column + 2, block_row, block_column + 3);
            break;

        //没有default
    }

    return result;
}

/*用于判断游戏是否已经结束，即所有的块无论哪个方向都无法发生移动了*/
function gameOver() {
    var judgeResult = null,  //用来存储judgeDirection的返回值
        result = {
            combineHappen: 0,
            moveHappen: 0
        },
        i;  //用来累加for循环中的4次judgeResult的值

    //上
    for (i = 0; i < 4; i++) {
        judgeResult = testProcessBlock(3, i, 2 ,i, 1, i, 0, i);
        result.moveHappen += judgeResult.moveHappen;
        result.combineHappen += judgeResult.combineHappen;

    }

    //下
    for (i = 0; i < 4; i++) {
        judgeResult = testProcessBlock(0, i, 1 ,i, 2, i, 3, i);
        result.moveHappen += judgeResult.moveHappen;
        result.combineHappen += judgeResult.combineHappen;
    }

    //左
    for (i = 0; i < 4; i++) {
        judgeResult = testProcessBlock(i, 3, i, 2, i, 1, i, 0);
        result.moveHappen += judgeResult.moveHappen;
        result.combineHappen += judgeResult.combineHappen;
    }

    //右
    for (i = 0; i < 4; i++) {
        judgeResult = testProcessBlock(i, 0, i, 1, i, 2, i, 3);
        result.moveHappen += judgeResult.moveHappen;
        result.combineHappen += judgeResult.combineHappen;
    }

    //如果上、下、左、右四个方向都无法发生合并或移动的话，说明游戏结束
    if ( (result.moveHappen === 0) && (result.combineHappen === 0) ){
        EventUtil.removeHandler(window, "keydown", processDirectionKey);
        alert("********** Game Over ! **********");
        // console.log("**********Game Over !***********");
    }
}

/* 方向键的事件处理程序 */
function processDirectionKey(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event),
        charCode = EventUtil.getCharCode(event),
        judgeResult = null,  //用来存储judgeDirection的返回值
        result = {
            combineHappen: 0,
            moveHappen: 0
        },  //用来累加for循环中的4次judgeResult的值
        i;  // for循环中使用

    // console.log(charCode);

    // 上
    if (charCode === 38 || charCode === 87) {
        //发生操作前保存状态
        gameBox.saveBlocks();

        for (i = 0; i < 4; i++) {
            judgeResult = judgeDirection(3, i, "up");
            result.moveHappen += judgeResult.moveHappen;
            result.combineHappen += judgeResult.combineHappen;
        }
    }

    // 下
    if (charCode === 40 || charCode === 83) {
        //发生操作前保存状态
        gameBox.saveBlocks();

        for (i = 0; i < 4; i++) {
            judgeResult = judgeDirection(0, i, "down");
            result.moveHappen += judgeResult.moveHappen;
            result.combineHappen += judgeResult.combineHappen;
        }
    }

    // 左
    if (charCode === 37 || charCode === 65) {
        //发生操作前保存状态
        gameBox.saveBlocks();

        for (i = 0; i < 4; i++) {
            judgeResult = judgeDirection(i, 3, "left");
            result.moveHappen += judgeResult.moveHappen;
            result.combineHappen += judgeResult.combineHappen;
        }
    }

    // 右
    if (charCode === 39 || charCode === 68) {
        //发生操作前保存状态
        gameBox.saveBlocks();

        for (i = 0; i < 4; i++) {
            judgeResult = judgeDirection(i, 0, "right");
            result.moveHappen += judgeResult.moveHappen;
            result.combineHappen += judgeResult.combineHappen;
        }
    }

    //如果发生了移动或合并的动作，就随机生成新block，接着计算总分，否则，判断是否输了
    if ( (result.moveHappen > 0) || (result.combineHappen > 0) ){

        //超时调用，是新生成的块晚一点出现，如过延时太长会导致跟不上操作
        setTimeout("gameBox.randomCreateBlock();insertScore();",80);
    }else{
        gameOver();
    }
}

/*
 * 函数功能：按钮快捷键的事件处理函数；
 * 如果和processDirectionKey()事件处理函数写到一起的话，就会在gameOver方法中移除事件的时候一起移除，
 * 导致重新开局的快捷键不能用
 */
function btnShortCutProcess(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event),
        charCode = EventUtil.getCharCode(event);

    // console.log(charCode);
    //重新开始的快捷键
    if (charCode === 82){
        gameBox.cleanAllBlocks();

        gameBox.randomCreateBlock();
        gameBox.randomCreateBlock();

        //保存初始状态便于返回上一步操作
        gameBox.saveBlocks();

        //重新计算总分
        insertScore();

        //重新添加事件
        EventUtil.addHandler(window, "keydown", processDirectionKey);
    }

    //返回上一步的快捷键，如果没有发生操作，则无法进行返回上一步的操作
    if (charCode === 66){
        gameBox.backState();

        //重新计算总分
        // console.log("score1:"+gameBox.calculateTotalScore());
        insertScore();
    }


    //“帮助”的快捷键
    if (charCode === 72){

    }

}

/* 绑定键盘事件 */
EventUtil.addHandler(window, "keydown", processDirectionKey);
EventUtil.addHandler(window, "keydown", btnShortCutProcess);

/* 绑定、添加鼠标click事件 */
EventUtil.addHandler(document.getElementById("menuBar"), "click" ,function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    switch(target.id){
        case "restartButton":
            gameBox.cleanAllBlocks();
            gameBox.randomCreateBlock();
            gameBox.randomCreateBlock();

            //保存初始状态便于返回上一步操作
            gameBox.saveBlocks();

            //重新计算总分
            insertScore();

            //重新添加事件
            EventUtil.addHandler(window, "keydown", processDirectionKey);
            break;

        case "backStateButton":
            gameBox.backState();

            //重新计算总分
            insertScore();
            break;

        case "helpButton":
            //gameBlock.hideBlock("block0_0", "show");
            break;

        //no default.
    }

});