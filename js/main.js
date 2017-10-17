/**
 * Created by JackyVon on 2017/6/27.
 */



var gameBlock = new Block();
var gameBox = new GameBox(gameBlock);

// /*gameBox.randomCreateBlock();
gameBox.randomCreateBlock();
gameBox.randomCreateBlock();

//保存初始状态便于返回上一步操作
gameBox.saveBlocks();

insertScore();

console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");
console.log("0");

/*
with(gameBox){
    setBlockNum("block0_0", 2);
    setBlockNum("block0_1", 4);
    setBlockNum("block0_2", 8);
    setBlockNum("block1_0", 8);
    setBlockNum("block1_1", 2);
    setBlockNum("block1_2", 4);
    setBlockNum("block1_3", 16);
    setBlockNum("block2_0", 16);
    setBlockNum("block2_1", 8);
    setBlockNum("block2_2", 2);
    setBlockNum("block2_3", 8);
    setBlockNum("block3_0", 128);
    setBlockNum("block3_1", 16);
    setBlockNum("block3_2", 64);
    setBlockNum("block3_3", 2);

    hideBlock("block0_0", "show");
    hideBlock("block0_1", "show");
    hideBlock("block0_2", "show");
    hideBlock("block1_0", "show");
    hideBlock("block1_1", "show");
    hideBlock("block1_2", "show");
    hideBlock("block1_3", "show");
    hideBlock("block2_0", "show");
    hideBlock("block2_1", "show");
    hideBlock("block2_2", "show");
    hideBlock("block2_3", "show");
    hideBlock("block3_0", "show");
    hideBlock("block3_1", "show");
    hideBlock("block3_2", "show");
    hideBlock("block3_3", "show");
}
*/

// //【调试】：Block对象
// gameBox.setBlockNum("block0_0", 2);
// gameBox.setBlockNum("block0_1", 4);
// gameBox.setBlockNum("block0_2", 8);

// gameBox.setBlockNum("block0_3", 1024);

// gameBox.hideBlock("block0_0", "show");
// gameBox.hideBlock("block0_1", "show");
// gameBox.hideBlock("block0_2", "show");
// gameBox.hideBlock("block0_3", "show");



// gameBox.hideBlock("block0_0", "hide");
// console.log(gameBox.getBlockNum("block0_0"));
// console.log(!gameBox.isBlockHided("block0_1"));
// console.log("equ:"+gameBox.blockEqual("block0_0", "block0_1"));
// gameBox.moveBlock("block0_0", "block0_2");
// gameBox.combineBlock("block0_0", "block0_1");
