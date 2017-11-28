/**
 * Created by JackyVon on 2017/6/27.
 */

var gameBlock = new Block();
var gameBox = new GameBox(gameBlock);

gameBox.randomCreateBlock();
gameBox.randomCreateBlock();

//保存初始状态便于返回上一步操作
gameBox.saveBlocks();

insertScore();