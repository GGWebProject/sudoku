module.exports = function solveSudoku(matrix) {
  // your solution
    let emptyCell = [];
    let steps = []
    
    function findRowValues(row){
      let result = [];
  
      row.forEach((item, index, arr) =>{
        if (!arr.includes(index + 1)){
          result.push(index + 1);
        }
      })
  
      return result
    }
  
    function findColValues(matrix, j){
      let result  = [];
      let collArr = [];
  
      matrix.forEach((item, index, arr) => {
        collArr.push(item[j]);
      })
  
      collArr.forEach((item, index, arr) =>{
        if (!arr.includes(index + 1)){
          result.push(index + 1);
        }
      })
  
      return result;
    }
  
    function findMinMax(a) {
      if (a < 3) {
        return [0,2];
      } else if (a < 6) {
        return [3,5];
      } else if (a < 9) {
        return [6,8]
      }
    }
  
    function findCubeValues (matrix, i, j){
      let iMinMax = [];
      let jMinMax = [];
      let cubeArr = [];
      let result  = [];
  
      iMinMax = findMinMax(i);
      jMinMax = findMinMax(j);
      
      for (let i = iMinMax[0]; i <= iMinMax[1]; i++ ){
        for (let j = jMinMax[0]; j <= jMinMax[1]; j++){
          cubeArr.push(matrix[i][j]);
        }
      }
  
      cubeArr.forEach((item, index, arr) =>{
        if (!arr.includes(index + 1)){
          result.push(index + 1);
        }
      })
  
      return result;
  
    }
  
    function getPosibleValues(matrix, i, j){
      let posibleRow    = findRowValues(matrix[i]);
      let posibleColl   = findColValues(matrix, j);
      let posibleCube   = findCubeValues(matrix, i, j);
      let posibleValues = [];
  
      for (let i = 1; i <= 9; i++){
        if (posibleRow.includes(i) && posibleColl.includes(i) && posibleCube.includes(i)){
          posibleValues.push(i);
        }
      }
  
      return posibleValues;
    }
  
    function checkStep(lastStep) {
      if (++lastStep['useValueIndex'] < lastStep['posibleValues'].length) {
        setEmptyCell(lastStep);
        matrix[lastStep['i']][lastStep['j']] = lastStep['posibleValues'][lastStep['useValueIndex']];
        return;
      } else {
        setEmptyCell(lastStep);
        steps.pop();
        checkStep(steps[steps.length - 1])
      }
    }
  
    function setEmptyCell(step) {
      let arr = step['enterCells'];
      arr.forEach((item)=>{
        matrix[item[0]][item[1]] = 0;
      });
      matrix[step['i']][step['j']] = 0;
    }
  
  
    for (let i = 0; i <= matrix.length - 1; i++ ){
      for (let j = 0; j <= matrix[i].length; j++){
        if (matrix[i][j] == 0) {
          
          let posibleValues = getPosibleValues(matrix, i, j);
          if (posibleValues.length == 1) {
            matrix[i][j] = posibleValues[0];
            if (steps.length > 0) {
              steps[steps.length - 1]['enterCells'].push([i,j]);
            }
          } else if (posibleValues.length > 1){
            steps.push({
                        'i': i,
                        'j': j,
                        'posibleValues': posibleValues,
                        'useValueIndex': 0,
                        'enterCells' : []
                      });
  
            matrix[i][j] = posibleValues[0];
          } else if (posibleValues.length == 0){
            checkStep(steps[steps.length-1]);
            i = steps[steps.length-1]['i'];
            j = steps[steps.length-1]['j']-1;
          }
                  
        }
      }
    }
  
    return matrix;
}
