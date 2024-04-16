// /* eslint-disable no-undef */



// * NOT WORKING 


// // console.log(locations);
// const fs = require('fs')
// const csv = require('csv-parser')
// const results = [];
// const { parse } = require('csv-parse');
// // fs.createReadStream('locations.csv')
// //     .pipe(csv())
// //     .on('data', (data) => results.push(data))
// //     .on('end', () => {
// //         console.log(results);
// //         // [
// //         //   { NAME: 'Daffy Duck', AGE: '24' },
// //         //   { NAME: 'Bugs Bunny', AGE: '22' }
// //         // ]
// //         fs.writeFile(`locations.json`, JSON.stringify(results), 'utf8', (err) => {
// //             if (err) {
// //                 console.log('Some error occured - file either not saved or corrupted file saved.')
// //             } else {
// //                 console.log("It's saved!")
// //             }
// //         })
// //     });

// const locations = require('./locations.csv')
// const converter = require('json-2-csv')


// const saveToJSON = async (csvFile, outputName) => {
//     if (!csvFile) {
//         console.error('No csvFile')
//         return
//     }
//     const jsonData = converter.csv2json(csvFile, {
//         delimiter: {
//             field: ';'
//         }
//     })
//     fs.writeFile(`${outputName}.json`, jsonData, 'utf8', (err) => {
//         if (err) {
//             console.log('Some error occured - file either not saved or corrupted file saved.')
//         } else {
//             console.log("It's saved!")
//         }
//     })
// }

// saveToJSON(locations, 'locations')