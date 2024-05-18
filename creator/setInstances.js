/* eslint-disable no-undef */
import localforage from 'localforage'
import fs from 'node:fs/promises'

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
        console.log(`mapGrid - done`);
        locationName = csvFile

    } catch (err) {
        console.log(err)
    }
}

const getLocationMap = async (location) => {
    const resultLocationMap = mapGrid.map((row, columnIndex) => {
        row.map((item, rowIndex) => {
            const resultItem = {
                name: item,
                y: columnIndex,
                x: rowIndex
            }
            mapLocations.push(resultItem)
            return resultItem
        })

    })
    // console.log(mapLocations);
    console.log(`mapLocations - done`);

    return resultLocationMap
}

const createLocationsJSON = async () => {
    try {
        // const data = await fs.readFile('./templocations.json', { encoding: 'utf8' })
        // const POIlocationData = JSON.parse(data)

        const mergedLocations = mapLocations.map(location => {
            location.id = location.name.replace(' ', '_').toLowerCase()

            // const POILocation = POIlocationData.find(item => item.id === location.id)
            // if (POILocation) {
            //     location = Object.assign(POILocation, location)
            // }

            return location
        })

        const result = {
            name: locationName,
            map: mergedLocations
        }


        await fs.writeFile(`../src/assets/json/instances.json`, JSON.stringify([result]))
        console.log('createLocationsJSON - done')


    } catch (err) {
        console.log(err)
    }
}


const init = async () => {
    await prepareMapGrid('castle_drakenhof')
    await getLocationMap()
    await createLocationsJSON()

    // console.log(mapGrid[21][19])
}

init()

export { mapGrid, mapLocations, init }