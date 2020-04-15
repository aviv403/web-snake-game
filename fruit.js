class Fruit {
    constructor() {
        this.x;
        this.y;
        var img = document.getElementById("image");
        this.pickLocation = function () {
            var x = Math.floor(Math.random() * (columns - 1)) * scale;
            var y = Math.floor(Math.random() * (rows - 1)) * scale;
            while (snake.tail.some(location => location.x === x && location.y === y) || 
                    brick.bricks.some(location => location.x === x && location.y === y)) {
                x = Math.floor(Math.random() * (columns - 1)) * scale;
                y = Math.floor(Math.random() * (rows - 1)) * scale;
            }
            this.x = x;
            this.y = y;
        };
        this.draw = function () {
            // ctx.fillStyle = "yellow";
            // ctx.fillRect(this.x, this.y, scale, scale);
            ctx.drawImage(img, this.x, this.y, scale, scale);
        };
    }
}
