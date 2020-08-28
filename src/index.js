//const fs = require('fs');
/*const parse = require('csv-parse');
const fs = require('fs');

const csvData = [];

fs.createReadStream(__dirname + '/csv-sample.csv')
    .pipe(
        parse({
            delimiter: ','
        })
    )
    .on('data', function(dataRow) {
        csvData.push(dataRow);
    })
    .on('end', function () {
        console.log(csvData);
    });*/
 
/* 2do intento

    import { MongoClient as mongodb } from "mongodb";
    import { Csvtojson as csvtojson } from "csvtojson"
    //import csvtojson from "csvtojson";
    
    // let url = "mongodb://username:password@localhost:27017/";
    let url = "mongodb+srv://ArmandoDev:3slO99x9z7rHUxUv@myfirstcluster-dpp83.azure.mongodb.net/test?authSource=admin&replicaSet=MyFirstCluster-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true";
    
    let file = "Roman.csv";

    myFunction(file);


    function myFunction(file) {
    csvtojson()
      .fromFile(file)
      .then(csvData => {
        console.log(csvData);
    
        mongodb.connect(
          url,
          { useNewUrlParser: true, useUnifiedTopology: true },
          (err, client) => {
            if (err) throw err;
    
            client
              .db("Restaurant")
              .collection("inventario")
              .insertMany(csvData, (err, res) => {
                if (err) throw err;
    
                console.log(`Inserted: ${res.insertedCount} rows`);
                client.close();
              });
          }
        );
      }); 
}

*/

/* Parte que funciona para subir CSV Directo 
const parse = require('csv-parse');
const fs = require('fs');

const csvData = [];


fs.createReadStream(__dirname + '/Roman.csv')
  .pipe(
      parse({
          delimiter: ','
      })
  )
  .on('data', function (dataRow) {
      csvData.push(dataRow);
  })
  .on('end', function () {
     console.log(csvData)
  });
  */

  /* Intento con nuevo tutorial */
  //export const MY_CONST = 'Vue.js';

  export default function bar() {

  let MongoClient = require('mongodb').MongoClient;
  let url = "mongodb+srv://ArmandoDev:3slO99x9z7rHUxUv@myfirstcluster-dpp83.azure.mongodb.net/test";
   
  const csvFilePath='Roman.csv'
  const csv = require('csvtojson')
   
  csv()
  .fromFile(csvFilePath) //Convierte el archivo en objeto json
  .then((jsonObj)=>{
      console.log(jsonObj);
    /**
      [ 
        { _id: '1', name: 'Jack Smith', address: 'Massachusetts', age: '23' },
        { _id: '2', name: 'Adam Johnson', address: 'New York', age: '27' },
        { _id: '3', name: 'Katherin Carter', address: 'Washington DC', age: '26' },
        { _id: '4', name: 'Jack London', address: 'Nevada', age: '33' },
        { _id: '5', name: 'Jason Bourne', address: 'California', age: '36' } 
      ]
    */
    
    // Insert Json-Object to MongoDB
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      var dbo = db.db("Restaurant");
      dbo.collection("inmueble").insertMany(jsonObj, (err, res) => {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      /**
        Number of documents inserted: 5
      */
      db.close();
      });
    });
  })
}