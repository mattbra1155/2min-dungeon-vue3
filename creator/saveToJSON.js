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
        .parseSubArray('\'', ',')
        .supportQuotedField(false)
        .fieldDelimiter("|")
        .getJsonFromCsv('./locations123.csv')


    //BUGFIX convert nested arrays from string to objects
    json = json.map(ele => {
        ele.objects = JSON.parse(ele.objects)
        ele.lootList = JSON.parse(ele.lootList)
        ele.entityList = JSON.parse(ele.entityList)
        return ele
    })

    fs.writeFile(`locations1.json`, JSON.stringify(json), 'utf8', (err) => {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.')
        } else {
            console.log("It's saved!")
        }
    })
}

saveToJSON()