/* eslint-disable no-undef */

const csv = `high mountains,mountains,mountains,mountains,mountains,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,road,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water
high mountains,mountains,mountains,mountains,mountains,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water
high mountains,high mountains,mountains,mountains,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water
high mountains,high mountains,mountains,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water
high mountains,high mountains,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water,water,water,water,water,grassland,grassland,grassland,water,water,water
high mountains,high mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,high mountains,high mountains,high mountains,mountains,mountains,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water,water,water,water,water,water,water,water,water,water,water,water
high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,castle/fort drackenhof,high mountains,mountains,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water,water,water,water,water,water,grassland,grassland,grassland,grassland,water,water,water
high mountains,Mountain shrine,high mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,high mountains,high mountains,high mountains,grassland,road,old battlefiend,road,road,Old shrine ,road,grassland,grassland,grassland,grassland,grassland,water,water,water,water,water,water,water,water,water,grassland,grassland,grassland,grassland,grassland,water,water
high mountains,foothills,mountains,mountains,mountains,mountains,mountains,mountains,mountains,foothills,foothills,foothills,foothills,foothills,grassland,grassland,grassland,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water,water,water,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water
high mountains,foothills,mountains,mountains,foothills,foothills,foothills,foothills,foothills,foothills,foothills,foothills,foothills,grassland,grassland,grassland,grassland,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water
high mountains,foothills,foothills,foothills,foothills,mountains,mountains,foothills,foothills,foothills,foothills,foothills,foothills,grassland,grassland,grassland,grassland,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,forest,forest,forest,forest,grassland,grassland,water,water,water
high mountains,high mountains,foothills,mountains,high mountains,high mountains,mountains,foothills,foothills,foothills,foothills,foothills,grassland,grassland,grassland,grassland,grassland,grassland,grassland,road,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,forest,forest,forest,forest,grassland,grassland,water,water,water
high mountains,high mountains,foothills,mountains,mountains,mountains,foothills,foothills,foothills,foothills,foothills,foothills,forest,grassland,grassland,forest,forest,forest,forest,road / forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,grassland,grassland,water,water
high mountains,high mountains,foothills,foothills,foothills,foothills,foothills,foothills,foothills,foothills,forest,forest,forest,grassland,grassland,forest,forest,forest,forest,road / forest,forest,forest,forest,forest,forest ruins,forest,forest,forest,forest,forest,road / forest,road / forest,road / forest,road / forest,road / forest,road / forest,road / forest,road / forest,road / forest,Lookout Tower,water,water
high mountains,foothills,foothills,foothills,foothills,foothills,foothills,foothills,foothills,foothills,forest,forest,forest,forest,forest,forest clearing,forest,forest,forest,Twin sisters (Oaks),forest,dark forest,dark forest,forest,forest,forest,forest,forest,forest,forest,road / forest,forest,forest,forest,forest,forest,forest,forest,forest,harbor,water,water
high mountains,bear cave,foothills,foothills,foothills,foothills,foothills,foothills,foothills,grassland,forest,forest,hunting lodge,forest,forest,dark forest,dark forest,dark forest,dark forest,dark forest,dark forest,dark forest,dark forest,forest,forest,forest,forest,forest,forest,forest,road / forest,forest,forest,forest,forest,forest,forest,forest,forest,water,water,water
high mountains,high mountains,foothills,foothills,foothills,foothills,foothills,grassland,grassland,grassland,forest,forest,forest,forest,forest,dark forest,dark forest,dark forest,dark forest,dark forest,dark forest,dark forest,dark forest,road / forest,road / forest,road / forest,forest,forest,forest,forest,road / forest,forest,forest,forest,forest,forest,forest,forest,forest,water,water,water
high mountains,high mountains,foothills,foothills,foothills,foothills,foothills,grassland,grassland,grassland,forest,forest,forest,forest,grassland,forest,forest,dark forest,dark forest,dark forest,dark forest,forest,forest,forest,Old Woodmill,road / forest,road / forest,road / forest,road / forest,road / forest,road / forest,woodcutter's camp,forest,forest,forest,forest,forest,grassland,grassland,water,water,water
high mountains,mountains,foothills,foothills,foothills,foothills,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,forest,forest,forest,forest,road / forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,grassland,water,water,water,water
high mountains,mountains,foothills,foothills,foothills,foothills,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,fields,fields,white tree,road,fields,fields,fields,fields,fields,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,forest,grassland,water,water,water,water
high mountains,mountains,foothills,foothills,foothills,foothills,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,fields,fields,fields,Norther Road,road,abandoned farmsted,fields,fields,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water
high mountains,mountains,foothills,mountains,foothills,foothills,foothills,foothills,foothills,foothills,foothills,foothills,foothills,foothills,grassland,grassland,fields,fields,fields,Outskirts North,fields,fields,fields,fields,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water
high mountains,mountains,mountains,mountains,mountains,mountains,mountains,foothills,mountains,mountains,mountains,mountains,mountains,mountains,grassland,grassland,grassland,fields,Outskirts West,TOWN,Outskirts East,fields,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water
high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,mountains,water,water,mountains,high mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,South Mountain Pass,mountains,mountains,mountains,mountains,grassland,grassland,grassland,water,water,water,grassland,grassland,grassland,grassland,grassland,grassland,water,water,water,water,water,water
high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,mountains,water,water,mountains,high mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,water,water,water,water,water,water,water,water,water,water,water,water,water,water,water,water,water,water
high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,mountains,mountains,mountains,mountains,high mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,mountains,water,water,water
high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,high mountains,water,water`

import fs from 'node:fs/promises'
import { parse } from 'csv-parse'

const mapGrid = []

function wrapStringsIntoObjectsFromString(commaSeparatedString) {
    const array = commaSeparatedString.replace(/(\r\n|\n|\r)/gm, ',').split(',')
    for (let i = 0; i < array.length; i += 42) {
        const obj = array.slice(i, i + 42)
        mapGrid.push(obj)
    }
}

// Example usage:

async function prepareMapGrid() {
    try {
        const data = await fs.readFile('uuu.csv', { encoding: 'utf8' })
        // console.log(data);
        wrapStringsIntoObjectsFromString(data)
    } catch (err) {
        console.log(err)
    }
}

const init = async () => {
    await prepareMapGrid()
    console.log(mapGrid[21][19]);

}

init()

// fs.createReadStream('uuu.csv', { encoding: 'utf-8' })
//     .pipe(parse({ delimiter: ',' }))
//     .on('data', function (csvrow) {
//         //do something with csvrow
//         mapGrid.push(csvrow);
//     })
//     .on('end', function () {
//         //do something with mapGrid
//         console.log(mapGrid);
//     });
