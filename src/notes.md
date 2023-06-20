# Project Knights Travails Notes

## 2023-06-18

- [x] put together a script that creates a game board and a knight

- [x] Treat all possible moves the knight could make as children in a tree. Don’t allow any moves to go off the board.

## 2023-06-19

Made some functions to represent possible moves in tree as new nodes.
I would like to build a full tree from the starting position first

Some observations:
If a knight moves from one position to another, it seems you can usually dismiss nodes left or right, depending on direction

- [x] build full tree

now I'd like to first find out at which level my desired value can be found
But before I do so, first remove duplicates from the items to be turned into nodes

## 2023-06-20

Recursive buildTree is acting a bit funny after a few steps. It starts removing visited nodes so I'll have to go trough that one for a bit and refactor the base array creators to see where the bug sneaked in. 

I refactored the comparison function to return the gameboard and this fixed the issue but now it renders each option and doesn't skip the ones already visited

## 2023-06-20 II

decided to restart for my end goal is being able to do a BFS which means I don't need to render the full tree perse. 

First steps:
- [ ] check gameboard to see if array is all good and if it needs refactoring
- [ ] hardcode a starting position and an end position being next to eachother
- [ ] create a queue function for the BFS
  - [ ] if current node does not equal goal: generate children and see if the goal is in there