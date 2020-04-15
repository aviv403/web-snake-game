class Brick {
    constructor() {
        // this.x;
        // this.y;
        var img = document.getElementById("brick");
        this.bricks = [];

        this.pickLocation = function (level) {
            this.bricks = [];
            while(level){
                var x = Math.floor(Math.random() * (columns - 1)) * scale;
                var y = Math.floor(Math.random() * (rows - 1)) * scale;
                var squareSize = Math.floor(Math.random() * 10) * scale;
                !squareSize && (squareSize = 10);
                for(let i=x ; i<x+squareSize ; i+=10){
                    for(let j=y ; j<y+squareSize ; j+=10){
                         this.bricks.push({x: i, y: j})
                    }
                 }
                 level--;
            }
        };
        this.draw = function () {

            for(let i=0 ; i<this.bricks.length ; i++){
                ctx.drawImage(img, this.bricks[i].x, this.bricks[i].y, scale, scale);
            }

        };
    }
}
