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
        const data = await fs.readFile('../src/assets/json/locations.json', { encoding: 'utf8' })
        // console.log(data);
        const locationData = JSON.parse(data)


        const rrr = locationData.map(locationItem => {
            // console.log(locationItem);
            if (!locationItem) {
                return
            }
            const found = mapLocations.find((mapLocationItem) => {
                console.log(locationItem.name.toLowerCase());
                return mapLocationItem.name.toLowerCase() === locationItem.name.toLowerCase()
            })
            console.log(found);
            if (!found) {
                return ''
            }
            locationItem.x = found.x
            locationItem.y = found.y

            return locationItem

        })

        // console.log(locationData[0]);
        console.log(rrr);

        fs.writeFile(`../src/assets/json/locations.json`, JSON.stringify(rrr), 'utf8', (err) => {
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