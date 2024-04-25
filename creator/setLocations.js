/* eslint-disable no-undef */
import fs from 'node:fs/promises'

const mapGrid = []
const mapLocations = []

function wrapStringsIntoObjectsFromString(commaSeparatedString) {
    const array = commaSeparatedString.replace(/(\r\n|\n|\r)/gm, ',').split(',')
    // console.log(array);
    for (let i = 0; i < array.length; i += 42) {
        const obj = array.slice(i, i + 42)
        mapGrid.push(obj)
    }
}

// Example usage:

const prepareMapGrid = async () => {
    try {
        const data = await fs.readFile('uuu.csv', { encoding: 'utf8' })
        // console.log(data);
        wrapStringsIntoObjectsFromString(data)
        console.log(`mapGrid - done`);

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
        const data = await fs.readFile('./templocations.json', { encoding: 'utf8' })
        const POIlocationData = JSON.parse(data)

        const ttt = mapLocations.map(location => {
            location.id = location.name.replace(' ', '_').toLowerCase()

            const POILocation = POIlocationData.find(item => item.id === location.id)
            if (POILocation) {
                location = Object.assign(POILocation, location)
            }

            return location
        })



        const mergedLocations = ttt

        // console.log(mergedLocations);
        fs.writeFile(`../src/assets/json/locations.json`, JSON.stringify(mergedLocations), 'utf8', (err) => {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.')
            } else {
                console.log("It's saved!")
            }
        })


    } catch (err) {
        console.log(err)
    }

}


const init = async () => {
    await prepareMapGrid()
    await getLocationMap()
    await createLocationsJSON()
}

init()

export { mapGrid, mapLocations, init }