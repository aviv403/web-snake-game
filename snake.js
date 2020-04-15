class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = scale;
        this.ySpeed = 0;
        this.total = 5;
        this.tail = [];
        this.lastDirection = "Right";
        this.biteSound = new Audio('./biting.mp3');
        this.tailImg = document.getElementById('tail');

        for(let i=5 ; i!==0 ; i--){
            this.tail.push({x: i, y: 0})
        }
        
        this.draw = () => {
            ctx.fillStyle = "green";

            // for(let i=0 ; i<this.tail.length ; i++){
            //     ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale)
            // }

            // ctx.fillRect(this.x, this.y, scale, scale);

            for(let i=0 ; i<this.tail.length ; i++){
                ctx.drawImage(this.tailImg, this.tail[i].x, this.tail[i].y, scale, scale);
            }
            ctx.drawImage(this.tailImg, this.x, this.y, scale, scale);

        };
        
        this.update = () => {
            for(let i=0 ; i<this.tail.length-1 ; i++){
                this.tail[i] = this.tail[i+1];
            }

            this.tail[this.total - 1] = { x: this.x, y: this.y }

            this.x += this.xSpeed;
            this.y += this.ySpeed;

            // Launches the snake to the 
             // other side of the board
            if (this.y > canvas.height - scale){
                this.y = 0
            }
            else if (this.y < 0){
                this.y = canvas.height - scale
            }
            else if (this.x > canvas.width - scale){
                this.x = 0
            }
            else if (this.x < 0){
                this.x = canvas.width - scale
            }
            
        };

        this.eat = function(fruit){
            if(this.x === fruit.x && this.y === fruit.y){
                this.biteSound.play();
                this.total++;
                return true;
            }
            return false;
        }
        this.touchTail = function(x, y){
            return this.tail.some(position => position.x === x && position.y === y)
        }

        this.touchBrick = function(x, y, bricks){
            return bricks.some(brick => brick.x === x && brick.y === y)
        }

        this.changeDirection = (direction) => {
            if(direction === "Down" && this.lastDirection !== "Up")
            {
                this.lastDirection = "Down"
                this.xSpeed = 0;
                this.ySpeed = scale;
            }
            else if (direction === "Up" && this.lastDirection !== "Down")
            {
                this.lastDirection = "Up"
                this.xSpeed = 0;
                this.ySpeed = -scale;
            }
            else if(direction === "Right" && this.lastDirection !== "Left")
            { 
                this.lastDirection = "Right"
                this.xSpeed = scale;
                this.ySpeed = 0;
            }
            else if (direction === "Left" && this.lastDirection !== "Right")
            {
                this.lastDirection = "Left"
                this.xSpeed = -scale;
                this.ySpeed = 0;
            }
        }
    }
}

