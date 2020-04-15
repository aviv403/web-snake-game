class Menu {
    constructor() {
        this.new_game = () => {
            var newGame = new Draw();
            newGame.setup(); 
        };
    }
}

var menu = new Menu();
menu.new_game();
