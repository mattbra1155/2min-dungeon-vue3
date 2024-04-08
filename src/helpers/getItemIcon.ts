import { AllItemTypes } from '@/interfaces/IItem'
import { defineAsyncComponent } from 'vue'

export const getItemIcon = (item: AllItemTypes | string) => {
    return defineAsyncComponent(() => import(`@/components/icons/${typeof item === 'string' ? item : item.icon}.vue`))
}
