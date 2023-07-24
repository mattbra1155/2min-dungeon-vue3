import { ModifierItem } from './modifierItemModel'

class ModifierList implements ModifierList {
    constructor(public list: ModifierItem[] = []) {
        this.list = list
    }

    addItem(item: ModifierItem) {
        const itemExists = this.list.find((element: ModifierItem) => element.id === item.id)

        if (!itemExists) {
            this.list.push(item)
        }
    }

    removeItem(itemId: number) {
        const itemToRemove: ModifierItem | undefined = this.list.find((element: ModifierItem) => element.id === itemId)
        if (itemToRemove) {
            const itemIndex = this.list.findIndex((element: ModifierItem) => element.id === itemToRemove.id)
            this.list.splice(itemIndex)
            console.log('Removed modifier from list:', this.list)
        } else {
            console.log('Modifier to remove not found')
        }
    }
}

export { ModifierList }
