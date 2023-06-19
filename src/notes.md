# Project Knights Travails Notes

## 2023-06-18

- [x] put together a script that creates a game board and a knight

- [x] Treat all possible moves the knight could make as children in a tree. Don’t allow any moves to go off the board.

## 2023-06-19

Made some functions to represent possible moves in tree as new nodes.
I would like to build a full tree from the starting position first

Some observations:
If a knight moves from one position to another, it seems you can usually dismiss nodes left or right, depending on direction