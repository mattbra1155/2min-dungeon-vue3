export const useWieghtedList = () => {
    const getWeightedItem = (options: { item: string; probability: number }[]) => {
        let i

        const weights = [options[0].probability]
        for (i = 1; i < options.length; i++) {
            weights[i] = options[i].probability + weights[i - 1]
        }
        const random = Math.random() * weights[weights.length - 1]
        for (i = 0; i < weights.length; i++) {
            if (weights[i] > random) break
        }
        console.log(weights, random)

        return options[i].item
    }

    return {
        getWeightedItem,
    }
}
