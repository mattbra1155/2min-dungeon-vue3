/* eslint-disable no-undef */
import fs from 'fs'
import csvToJson from 'convert-csv-to-json'
const saveToJSON = async () => {



    // console.log(csvToJson.csvStringToJson('./locations123.csv'))

    // fs.writeFile(`${outputName}.csv`, csvData, (err) => {
    //     if (err) {
    //         console.log('Some error occured - file either not saved or corrupted file saved.')
    //     } else {
    //         console.log("It's saved!")
    //     }
    // })

    let json = csvToJson.utf8Encoding()
        .formatValueByType()
        // .parseSubArray('\'', '123')
        .supportQuotedField(true)
        .fieldDelimiter(",")
        // .getJsonFromCsv('./test.tsv')
        .getJsonFromCsv('./locations.csv')


    // BUGFIX convert nested arrays from string to objects
    json = json.map(element => {
        if (element.objects) {
            element.objects = JSON.parse(element.objects)
        }
        if (element.lootList) {
            element.lootList = JSON.parse(element.lootList)
        }
        if (element.entityList) {
            element.entityList = JSON.parse(element.entityList)
        }
        return element
    })

    fs.writeFile(`./templocations.json`, JSON.stringify(json), 'utf8', (err) => {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.')
        } else {
            console.log("It's saved!")
        }
    })
}

saveToJSON()