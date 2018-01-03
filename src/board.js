export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, colIndex){
    if(this._playerBoard[rowIndex][colIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    } else if(this._bombBoard[rowIndex][colIndex] === 'B'){
      this._playerBoard[rowIndex][colIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(rowIndex, colIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, colIndex){
    const neighborOffsets = [];
        neighborOffsets.push([-1, -1]);
        neighborOffsets.push([-1, 0]);
        neighborOffsets.push([-1, 1]);
        neighborOffsets.push([0, -1]);
        neighborOffsets.push([0, 1]);
        neighborOffsets.push([1,-1]);
        neighborOffsets.push([1, 0]);
        neighborOffsets.push([1, 1]);

        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;

        neighborOffsets.forEach(offset => {
          const neighborRowIndex = rowIndex + offset[0];
          const neighborColumnIndex = colIndex + offset[1];

            if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
                if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
                  numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
  }

  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print(){
    console.log(this._playerBoard.map(row => {
      return row.join(' | ');
    }).join('\n'));
  }

  static generatePlayerBoard(numberOfRows,numberOfColumns){
    let board = [];

    for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      let row = [];

      for(let colIndex = 0; colIndex < numberOfColumns; colIndex++){
          row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let board = [];

    for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      let row = [];

      for(let colIndex = 0; colIndex < numberOfColumns; colIndex++){
          row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs){
      //this code might place bombs on already existing bombs- this will be fixed when I learn about control flow.
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColIndex = Math.floor(Math.random() * numberOfColumns);

      if(board[randomRowIndex][randomColIndex] !== 'B'){
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
