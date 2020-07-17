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