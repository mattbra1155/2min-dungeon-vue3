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
    return resultLocationMap
}

const createLocationsJSON = async () => {
    try {
        const data = await fs.readFile('../src/assets/json/locations.json', { encoding: 'utf8' })
        const locationData = JSON.parse(data)

        const rrr = locationData.map(locationItem => {
            if (!locationItem) {
                return
            }
            console.log(locationItem);
            const found = mapLocations.find((mapLocationItem) => mapLocationItem.name === locationItem.name)
            if (!found) {
                return ''
            }
            locationItem.x = found.x
            locationItem.y = found.y

            return locationItem

        })

        console.log(locationData[0]);
        console.log(rrr);

        fs.writeFile('../src/assets/json/locations.json', JSON.stringify(rrr))

    } catch (err) {
        console.log(err)
    }

}


const init = async () => {

    await prepareMapGrid()
    await getLocationMap()
    await createLocationsJSON()
    // console.log(locationMap);
    // console.log(mapGrid[21][19]);



}

init()

export { mapGrid, mapLocations }