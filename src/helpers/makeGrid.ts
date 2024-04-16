// if (!gridWrapper.value) {
//     return
// }
// gridMap.value = makeGrid(gridWrapper.value)
// console.log(gridMap.value)

// gridWrapper.value.addEventListener('click', () => {
//     updateGrid(10, 5, '@')
// })

const gridMap: any = []
const sizeY = 16
const sizeX = 16
let parentElement: HTMLElement
interface cellY {
    x: number
    y: number
    value: string
}
export const makeGrid = (element: HTMLElement) => {
    parentElement = element
    const continer = document.createElement('div')
    continer.classList.add('gridContainer')
    for (let x = 0; x < sizeX; x++) {
        const cellX = []
        const itemX = document.createElement('div')
        itemX.classList.add('itemX')
        for (let y = 0; y < sizeY; y++) {
            const cellY: cellY = {
                x: x,
                y: y,
                value: '0',
            }
            const itemY = document.createElement('div')
            itemY.setAttribute('x', `${x}`)
            itemY.setAttribute('y', `${y}`)
            itemY.setAttribute('value', `${cellY.value}`)
            itemY.addEventListener('click', (e: MouseEvent) => {
                const target = e.target as HTMLElement

                const startX = 0
                const startY = 0
                const currentX = 0
                const currentY = 0
                const x = target.getAttribute('x')
                const y = target.getAttribute('y')

                console.log(x, y)

                while (currentX !== +x! && currentY !== +y!) {
                    target.style.background = 'red'
                }
            })
            // value for the edge of the gridMap
            if (x === 0 || x === sizeX - 1 || y === 0 || y === sizeY - 1) {
                cellY.value = '1'
            }
            itemY.innerHTML = `${cellY.value}`

            itemY.classList.add('itemY')

            itemX.append(itemY)
            cellX.push(cellY)
        }
        continer.append(itemX)
        gridMap.push(cellX)
    }

    element.append(continer)
    return gridMap
}

export const updateGrid = (x: number, y: number, value: string) => {
    gridMap[x][y].value = value
    parentElement.children[0].children[x].children[y].innerHTML = value
}
