import store from '@/store/index'
import { Scene } from '@/assets/models/sceneModel'
class SceneGenerator {
    constructor() {}
    createId() {
        store.dispatch('sceneGenerator/incrementId')
        const id = store.getters['sceneGenerator/id']
        return id
    }
    createName(id) {
        return `level ${id}`
    }
    create(player, enemy) {
        const id = this.createId()
        const name = this.createName(id)
        const scene = new Scene(id, name, player, enemy)

        return scene
    }
}

export { SceneGenerator }
