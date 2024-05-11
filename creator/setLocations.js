/* eslint-disable no-undef */
import localforage from 'localforage'
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

        const mergedLocations = mapLocations.map(location => {
            location.id = location.name.replace(' ', '_').toLowerCase()


            if (location.id === 'grassland') {
                location.description = `Entering the grassland, you're surrounded by a vast expanse of undulating golden - green.The landscape stretches out before you, a sea of swaying blades of grass punctuated by colorful wildflowers.`
            }
            if (location.id === 'road') {
                location.description = `An old, overgrown road winds its way through the landscape, its once smooth surface now cracked and weathered. Thick vegetation encroaches from all sides, reclaiming the path inch by inch. Nature's relentless advance has transformed the road into a forgotten trail, a relic of a bygone era.`
            }
            if (location.id === 'high_mountains') {
                location.description = `Towerous mountains loom, impassable barriers cutting the horizon. Their jagged peaks pierce the sky, cloaked in perpetual snow. Valleys yawning between them seem unreachable, lost to the clouds. No path, no passage; these formidable giants stand as guardians of the untamed wilderness, daunting and unconquerable.`
            }
            if (location.id === 'mountains') {
                location.description = `The mountains rise, their majestic peaks beckoning adventurers. Yet, their treacherous slopes and winding paths demand respect. Each step is a test of skill and endurance, doubling the journey's length. Despite the breathtaking vistas, the unforgiving terrain serves as a reminder of nature's formidable challenges and the price of passage.`
            }
            if (location.id === 'foothills') {
                location.description = `The foothills sprawl at the base of the towering mountains, their gentle slopes a transition between lowlands and peaks. Dappled with patches of verdant greenery and scattered with boulders, they offer a prelude to the grandeur above. Here, the land undulates in harmony, teasing with the promise of higher heights.`
            }
            if (location.id === 'fields') {
                location.description = `Amidst the desolation, fields sprawl untended, once-rich crops now withered and rotting. Neglected and forgotten, they stand as a testament to abandonment. Weeds choke the earth, reclaiming what was once cultivated. Nature's reclaiming hand transforms the once-thriving fields into a somber tableau of decay and neglect.`
            }

            const POILocation = POIlocationData.find(item => item.id === location.id)
            if (POILocation) {
                location = Object.assign(POILocation, location)
            }

            return location
        })

        await fs.writeFile(`../src/assets/json/locations.json`, JSON.stringify(mergedLocations))
        console.log('createLocationsJSON - done')


    } catch (err) {
        console.log(err)
    }
}


const init = async () => {
    await prepareMapGrid()
    await getLocationMap()
    await createLocationsJSON()

    console.log(mapGrid[21][19])
}

init()

export { mapGrid, mapLocations, init }