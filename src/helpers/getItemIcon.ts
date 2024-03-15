import { AllItemTypes } from '@/interfaces/IItem'
import { defineAsyncComponent } from 'vue'

export const getItemIcon = (item: AllItemTypes) => {
    if (!item.icon) {
        return
    }
    return defineAsyncComponent(() => import(`@/components/icons/${item.icon}.vue`))
}
