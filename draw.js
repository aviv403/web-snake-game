function Draw(){
    canvas = document.getElementById('ng-canvas');
    ctx = canvas.getContext("2d");
    scale = 10;
    rows = canvas.height / scale;
    columns = canvas.width / scale;
    var level = 1;
    var life = 3;
    var heart = '<img src="./life.jpg" width="50" height="30">';
    var score = 0;
    var scoreLimit = 5;
    var timer = 0;
    var s = document.getElementById('score');
    var t = document.getElementsByClassName("timer");
    var gameOverSound = new Audio('./game-over.mp3')
    var bricksCollision = new Audio('./brick.mp3');
    var successLevel = new Audio('./success.mp3');
    document.getElementsByTagName('button')[0].onclick = handleClick;

    var interval;

    var time = setInterval(() => showTime(), 1000);

    function showTime(){
        timer++;
        t[0].innerText = "Time: " + timer;
        
    }

    this.setup = () => {
        snake = new Snake();
        fruit = new Fruit();
        brick = new Brick();
        brick.pickLocation(level);
        fruit.pickLocation();

        interval = window.setInterval(() =>  {
            ctx.clearRect(0, 0, canvas.width, canvas.height) //clear old snake location
            snake.update();
            fruit.draw();
            brick.draw();
            snake.draw();

            if(life === 3){
                document.getElementsByClassName('life')[0].innerHTML = heart + heart + heart
            }
            else if (life === 2){
                document.getElementsByClassName('life')[0].innerHTML = heart + heart
            }
            else{
                document.getElementsByClassName('life')[0].innerHTML = heart
            }

            if(snake.eat(fruit)){
                score++;
                fruit.pickLocation()

                if(score === scoreLimit){
                    delete snake;
                    snake = new Snake();
                    successLevel.play();
                    score = 0;
                    level++;
                    scoreLimit = 5*level;
                    document.getElementsByClassName('level')[0].innerText = 'Level ' + level;
                    brick.pickLocation(level);
                    fruit.pickLocation();
                    
                }
            }

            s.innerText = score + ' / ' + scoreLimit;

            var isBricksCollision = snake.touchBrick(snake.x, snake.y, brick.bricks);
            
            //when its game-over/failed
            if(snake.touchTail(snake.x, snake.y) || isBricksCollision){
                isBricksCollision ? bricksCollision.play() : gameOverSound.play();

                life--;
                if(life === 0){
                    level = 1;
                    document.getElementsByClassName('level')[0].innerText = 'Level ' + level;
                    timer = 0;
                    score = 0;
                    scoreLimit = 5;
                    life = 3;

                }
                //when lifes is over!
                delete snake;
                delete fruit;
                delete brick;

                snake = new Snake();
                brick = new Brick();
                fruit = new Fruit();
                brick.pickLocation(level);
                fruit.pickLocation();


                
                t[0].innerText = "Time: " + timer;

            }

        }, 60);
        

        window.addEventListener("keydown", (e) => {
            const direction = e.key.replace('Arrow', '')
            snake.changeDirection(direction);
        })
    };

    function handleClick(){
        delete snake;
        delete fruit;
        delete brick;

        snake = new Snake();
        fruit = new Fruit();
        brick = new Brick();

        level = 1;
        document.getElementsByClassName('level')[0].innerText = 'Level ' + level;
        life = 3;
        brick.pickLocation(level)
        fruit.pickLocation()
        score = 0;
        scoreLimit = 5;
        timer = 0;
        s.innerText = score + ' / ' + scoreLimit;
        t[0].innerText = "Time: " + timer;
    }


}
