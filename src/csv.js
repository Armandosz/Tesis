/*const csv = require('csv-parser');
const fs = require('fs');


export function csvJson () {
  console.log("hello");
  fs.createReadStream('./Roman.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
}
*/

/*
const csvFilePath='Roman.csv'
const csv = require('csvtojson')

export function csvJson(){
    console.log("hola");
    
  csv().fromFile(csvFilePath) //Convierte el archivo en objeto json
  .then((jsonObj)=>{
      console.log(jsonObj);
    });
    */
//}