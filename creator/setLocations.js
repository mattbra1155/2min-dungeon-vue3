/* eslint-disable no-undef */
import fs from 'node:fs/promises'

let mapGrid = []
let mapLocations = []

function parseCSVToGrid(csvString, rowLength = 42) {
    const cleanedArray = csvString.replace(/(\r\n|\n|\r)/gm, ',').split(',');
    const grid = []
    for (let i = 0; i < cleanedArray.length; i += rowLength) {
        grid.push(cleanedArray.slice(i, i + rowLength))
    }
    return grid
}

async function prepareMapGrid() {
    try {
        const data = await fs.readFile('uuu.csv', { encoding: 'utf8' })
        mapGrid = parseCSVToGrid(data)
        console.log('mapGrid - done')
    } catch (err) {
        console.error('Error preparing map grid:', err)
    }
}

async function generateLocationMap() {
    mapLocations = []

    mapGrid.forEach((row, y) => {
        row.forEach((name, x) => {
            mapLocations.push({ name, x, y })
        })
    })

    console.log('mapLocations - done')
}

async function createLocationsJSON() {
    try {
        const data = await fs.readFile('./templocations.json', { encoding: 'utf8' })
        const POIData = JSON.parse(data)

        const locationDescriptions = {
            grassland: `Entering the grassland, you're surrounded by a vast expanse of undulating golden-green...`,
            road: `An old, overgrown road winds its way through the landscape...`,
            high_mountains: `Towerous mountains loom, impassable barriers cutting the horizon...`,
            mountains: `The mountains rise, their majestic peaks beckoning adventurers...`,
            foothills: `The foothills sprawl at the base of the towering mountains...`,
            fields: `Amidst the desolation, fields sprawl untended, once-rich crops now withered and rotting...`,
        }

        const enrichedLocations = mapLocations.map(loc => {
            const id = loc.name.trim().toLowerCase().replace(/\s+/g, '_')
            const description = locationDescriptions[id] || ''

            const poiMatch = POIData.find(poi => poi.id === id) || {}

            return {
                ...loc,
                id,
                description,
                ...poiMatch // `poiMatch` may override previous values if needed
            }
        })

        await fs.writeFile('../src/assets/json/locations.json', JSON.stringify(enrichedLocations, null, 2))
        console.log('createLocationsJSON - done')
    } catch (err) {
        console.error('Error creating locations JSON:', err)
    }
}

async function init() {
    await prepareMapGrid()
    await generateLocationMap()
    await createLocationsJSON()
}

init()

export { mapGrid, mapLocations, init }
