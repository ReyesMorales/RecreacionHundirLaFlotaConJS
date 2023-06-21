# Battleship Game

This project is a command-line implementation of the Battleship game. Two players take turns shooting at each other's boards, trying to sink each other's boats. The game ends when one player sinks all the boats of the other player.

## Installation
1. Clone the repository:
`git clone https://github.com/ReyesMorales/practicaHundirLaFlota.git`

2. Navigate to the project directory:

`cd practicaHundirLaFlota`

## Usage

To start the game, run the following command:

`node index.js`

The game will begin by placing the boats on each player's board. The boards will be displayed after a countdown. Then, the rounds will start, and players will take turns shooting at each other's boards until one player wins. The game will display the boards and the winner's name at the end.

## Game Logic

The index.js file contains the main game logic. It initializes two players with their respective boards and starts the game loop. The game loop continues until one player wins or runs out of shoots. Players take turns shooting at each other's boards and checking for victory conditions.

The utils.js file provides utility functions used in the game:

- getEmptyBoard(): Returns an empty game board.
- showBoard(board): Displays the game board on the console.
- shoot(targetBoard, trackBoard, player): Performs a shoot on the target board and updates the track board accordingly.
- getRandomNumber(maxNumber): Returns a random number between 0 and maxNumber.
- getRandomDirection(): Returns a random direction ('up', 'down', 'left', or 'right').
- checkEmptyPositions(board, x, y, direction, boatSize): Checks if a space for a boat is empty on the board.
- addBoat(board, boatSize): Adds a boat of the specified size to the board.
- getBoatName(boatSize): Returns the name of a boat based on its size.
- addAllBoats(board): Adds all boats to the board.
- isVictory(board): Checks if a player has won by sinking all the boats on the board.

## Customization

You can customize the game by modifying the constants defined in the constants.js file. The MAX_SHOOTS constant determines the maximum number of shoots each player has. The BOAT_SPACE, EMPTY_SPACE, HIT_SPACE, and WATER_SPACE constants define the symbols used to represent different spaces on the game board.


