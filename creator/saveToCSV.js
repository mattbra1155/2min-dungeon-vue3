/* eslint-disable no-undef */

// console.log(locations);
import fs from 'fs'
import locations from '/home/mbrania/serwer/2min-dungeon-vue3/src/assets/json/locations.json' assert {type: 'json'}
import converter from 'json-2-csv'

const saveToCSV = async (jsonFile, outputName) => {
    if (!jsonFile) {
        console.error('No jsonFile')
        return
    }
    const csvData = converter.json2csv(jsonFile, {
        delimiter: {
            field: ';'

        },
        emptyFieldValue: 'empty'
    })
    fs.writeFile(`${outputName}.csv`, csvData, (err) => {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.')
        } else {
            console.log("It's saved!")
        }
    })
}

saveToCSV(locations[1].roomList, 'locations')