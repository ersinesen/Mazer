// Find path in a maze between start and end positions
function findWay(matrix, position, end) {
  var queue = [];

  //console.log(position, matrix[position[0]][position[1]]);
  if (matrix[position[0]][position[1]]===1)
    return -1;
  
  matrix[position[0]][position[1]] = 1;
  queue.push([position]); // store a path, not just a position

  while (queue.length > 0) {         
    var path = queue.shift(); // get the path out of the queue
    var pos = path[path.length-1]; // ... and then the last position from it
    //console.log(pos);
    var direction = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1]
    ];

    for (var i = 0; i < direction.length; i++) {
      if (direction[i][0] < 0 || direction[i][0] >= matrix.length 
          || direction[i][1] < 0 || direction[i][1] >= matrix[0].length 
          || matrix[direction[i][0]][direction[i][1]] != 0) { 
        continue;
      }
      // Perform this check first:
      if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
        // return the path that led to the find
        return path.concat([end]); 
      }
      
      matrix[direction[i][0]][direction[i][1]] = 1;
      
      // extend and push the path on the queue
      queue.push(path.concat([direction[i]]));
    }
  }
  // no-way
  return -1;
}

const deepCopy = (arr) => {
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}

function mazeMap(data, mazeWidth, mazeHeight, mazeCell) {
  // convert data to actual size maze map
  const imgWidth = mazeWidth * mazeCell;
  const imgHeight = mazeHeight * mazeCell;
  let mat = Array.from(Array(mazeWidth), () => new Array(mazeHeight));
  for (let x=0; x < mazeWidth; x += 1 ) {
    for (let y=0; y < mazeHeight; y += 1) {
      // read from inner block to avoid boundary artifacts when enlarged
      const ind = mazeCell*(x) + imgWidth*mazeCell*(y);
      mat[x][y] = data[ind];
      //console.log(x, y, ind, data[ind]);
    }
  }
  //console.log(mat);
  return mat;
}

// Plan Path for mazerunner
function planPath(mat, mazeWidth, mazeHeight, mazeCell) {
  
  // find a suitable hole in first row and look for a suitable target position
  let source = [0,1];
  let dest = [[9,9]];

  for (let i=0; i<dest.length; i++) {
    let mat2 = deepCopy(mat);
    let path = findWay(mat2, source, dest[i]);
    //console.log(path);
    if (path!=-1)
      return [source, dest[i]];
    else 
      continue;
  }
  
  // No path for this maze
  return -1;
}

// randomly generate suitable tablo positions in the maze
//Couldnot put on walls: hang them above road
function tabloPositions(mat, mazeWidth, mazeHeight, numTablos) {
  // get list of wall positions
  const Pos = [];
  for (let x=0; x < mazeWidth; x += 1 ) {
    for (let y=0; y < mazeHeight; y += 1) {
      if (mat[x][y]===0)
        Pos.push([x,y])
    }
  }

  // generate candidates
  let numTrial = 0;
  const Res = [];
  while (Res.length < numTablos && numTrial < Pos.length) {
    let pos = Pos[ Math.floor(Math.random() * Pos.length) ];
    let direction = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1]
    ];
    // shuffle neighbors to avoid axis order bias
    const shuffled = direction.sort(() => Math.random() - 0.5)
    // check if candidate is suitable: it has a visible wall
    for (let i = 0; i < shuffled.length; i++) {
      // discard borders
      if (shuffled[i][0] < 0 || shuffled[i][0] >= mat.length 
          || shuffled[i][1] < 0 || shuffled[i][1] >= mat[0].length ) { 
        continue;
      }
      // is neighbor a way
      if ( mat[shuffled[i][0]][shuffled[i][1]] === 0) {
        Res.push( [ pos[0], pos[1], shuffled[i][0], shuffled[i][1] ] );
        break;
      }   
    }    
    numTrial += 1;
  }
  console.log(Res);
  
  // No path for this maze
  return Res;
}

function tabloPositionsWall(mat, mazeWidth, mazeHeight, numTablos) {
  // get list of wall positions
  const Pos = [];
  for (let x=0; x < mazeWidth; x += 1 ) {
    for (let y=0; y < mazeHeight; y += 1) {
      if (mat[x][y]===1)
        Pos.push([x,y])
    }
  }

  // generate candidates
  let numTrial = 0;
  const Res = [];
  while (Res.length < numTablos && numTrial < Pos.length) {
    let pos = Pos[ Math.floor(Math.random() * Pos.length) ];
    let direction = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1]
    ];
    // shuffle neighbors to avoid axis order bias
    const shuffled = direction.sort(() => Math.random() - 0.5)
    // check if candidate is suitable: it has a visible wall
    for (let i = 0; i < shuffled.length; i++) {
      // discard borders
      if (shuffled[i][0] < 0 || shuffled[i][0] >= mat.length 
          || shuffled[i][1] < 0 || shuffled[i][1] >= mat[0].length ) { 
        continue;
      }
      // is neighbor a way
      if ( mat[shuffled[i][0]][shuffled[i][1]] === 0) {
        Res.push( [ pos[0], pos[1], shuffled[i][0], shuffled[i][1] ] );
        break;
      }   
    }    
    numTrial += 1;
  }
  console.log(Res);
  
  // No path for this maze
  return Res;
}