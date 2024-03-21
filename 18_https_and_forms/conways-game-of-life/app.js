const GLOBALS = {
  ROWS: 32,
  COLS: 32,
  DEAD: "dead",
  ALIVE: "alive",
};

function getRandomCellState(states = [GLOBALS.DEAD, GLOBALS.ALIVE]) {
  const randomIndex = Math.floor(Math.random() * states.length);
  return states[randomIndex];
}

function createRandomGrid(rows = GLOBALS.ROWS, cols = GLOBALS.COLS) {
  const res = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(getRandomCellState());
    }
    res.push(row);
  }
  return res;
}

function doesCellLive(cell, grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const [cellRow, cellCol] = cell;
  const directionOffsets = [
    [-1, -1], // top-left
    [-1, 0], // top
    [-1, 1], // top-right
    [0, -1], // left
    [0, 1], // right
    [1, -1], // bot-left
    [1, 0], // bot
    [1, 1], // bot-right
  ];
  const neighbors = directionOffsets
    .map(([offsetRow, offsetCol]) => {
      return [cellRow + offsetRow, cellCol + offsetCol];
    })
    .filter(([row, col]) => {
      if (row < 0 || row >= rows) return false;
      if (col < 0 || col >= cols) return false;
      return true;
    });
  let liveNeighbors = 0;
  for (const [neiRow, neiCol] of neighbors) {
    const neiCell = grid[neiRow][neiCol];
    if (neiCell === GLOBALS.ALIVE) liveNeighbors++;
  }
  const cellStatus = grid[cellRow][cellCol];

  if (cellStatus === GLOBALS.DEAD) return liveNeighbors === 3;
  return liveNeighbors === 2 || liveNeighbors === 3;
}

function createNextGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const res = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      const isLiveCell = doesCellLive([r, c], grid);
      row.push(isLiveCell ? GLOBALS.ALIVE : GLOBALS.DEAD);
    }
    res.push(row);
  }
  return res;
}

function renderGrid(grid, gridContainerEl) {
  const rows = grid.length;
  const cols = grid[0].length;
  const DOMNodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cellEl = document.createElement("input");
      cellEl.setAttribute("type", "checkbox");
      const isAlive = grid[r][c] === GLOBALS.ALIVE;

      if (isAlive) cellEl.setAttribute("checked", "");
      DOMNodes.push(cellEl);
    }
    const rowSeparatorEl = document.createElement("br");
    DOMNodes.push(rowSeparatorEl);
  }
  gridContainerEl.replaceChildren(...DOMNodes);
}

function runGame() {
  const gridDivEl = document.querySelector("div#grid");
  const nextButtonEl = document.querySelector("button#next");
  let grid = createRandomGrid();

  renderGrid(grid, gridDivEl);

  function handleNextClick() {
    grid = createNextGrid(grid);
    renderGrid(grid, gridDivEl);
  }

  nextButtonEl.addEventListener("click", handleNextClick);
}

window.addEventListener("load", runGame);
