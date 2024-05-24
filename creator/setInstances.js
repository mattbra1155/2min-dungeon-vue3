/* eslint-disable no-undef */
import { log } from 'node:console'
import fs from 'node:fs/promises'
import { Interface } from 'node:readline'
// import ttt from '../src/assets/data/instances.json' with {type: 'json'}
const mapGrid = []
const mapLocations = []

let locationName = ''
function wrapStringsIntoObjectsFromString(commaSeparatedString) {
    const array = commaSeparatedString.replace(/(\r\n|\n|\r)/gm, ',').split(',')
    // console.log(array);
    for (let i = 0; i < array.length; i += 16) {
        const obj = array.slice(i, i + 16)
        mapGrid.push(obj)
    }
}

// Example usage:

const prepareMapGrid = async (csvFile) => {
    try {
        const data = await fs.readFile(`${csvFile}.csv`, { encoding: 'utf8' })
        // console.log(data);
        wrapStringsIntoObjectsFromString(data)
        console.log(`mapGrid - done`)
        locationName = csvFile
        return true
    } catch (err) {
        console.log(err)
    }
}

const getLocationMap = async () => {
    const resultLocationMap = mapGrid.map((row, columnIndex) => {
        row.map((item, rowIndex) => {
            const resultItem = {
                name: item,
                y: columnIndex,
                x: rowIndex,
            }
            mapLocations.push(resultItem)
            return resultItem
        })
    })
    // console.log(mapLocations);
    console.log(`mapLocations - done`)

    return resultLocationMap
}

const createLocationsJSON = async (locationName) => {
    try {
        const originalFile = await fs.readFile('../src/assets/json/instances.json', { encoding: 'utf8' })
        const data = await fs.readFile('../src/assets/data/instances.json', { encoding: 'utf8' })
        const POIlocationList = JSON.parse(data)

        console.log(originalFile)
        const originalFileParsed = JSON.parse(originalFile)
        const POIlocationData = POIlocationList.find((location) => location.id === locationName)

        const mergedLocations = mapLocations.map((location) => {
            location.id = location.name.replace(' ', '_').toLowerCase()

            const POILocation = POIlocationData.locations.find((item) => item.id === location.id)
            if (POILocation) {
                location = Object.assign(POILocation, location)
            }

            return location
        })

        console.log(locationName)
        const ttt = []

        const result = {
            name: locationName,
            map: mergedLocations,
        }

        if (originalFileParsed.length) {
            originalFileParsed.push(result)
            await fs.writeFile(`../src/assets/json/instances.json`, JSON.stringify(originalFileParsed))
        } else {
            ttt.push(result)
            await fs.writeFile(`../src/assets/json/instances.json`, JSON.stringify(ttt))
        }

        console.log('createLocationsJSON - done')
        return true
    } catch (err) {
        console.log(err)
    }
}

const init = async () => {
    const listOfInstances = ['castle_drakenhof', 'castle_drakenhof_dungeon']
    listOfInstances.forEach(async (element) => {
        try {
            await prepareMapGrid(element)
            await getLocationMap()
            await createLocationsJSON(element)
        } catch (err) {
            console.log(err)
        }
    })

    // console.log(mapGrid[21][19])
}

init()

export { mapGrid, mapLocations, init }
