export const locationCards = [
    {
        id: 'old_shrine',
        name: 'Old Shrine',
        description:
            'An old shrine, overgrown with vines and moss. The air is thick with the scent of damp earth and decay.',
        cards: [
            {
                id: 1,
                description:
                    'You stand before a ruined shrine, its stone walls crumbling and covered in moss. The air is thick with the scent of damp earth and decay. You can hear the distant sound of water dripping somewhere in the shadows.',
                options: [
                    {
                        cardId: 2,
                        text: 'Search the shrine',
                    },
                    {
                        cardId: 99,
                        text: 'Leave the shrine',
                        actions: ['exit'],
                    },
                ],
            },
            {
                id: 2,
                description:
                    'You find a small altar, its surface covered in dust and debris. You can see the faint outline of an old symbol carved into the stone.',
                options: [
                    {
                        cardId: 3,
                        text: 'Examine the symbol',
                    },
                ],
            },
            {
                id: 3,
                description:
                    'The symbol is worn and faded, but you can make out the shape of a serpent coiled around a tree. You feel a strange energy emanating from it.',
                options: [
                    {
                        cardId: 4,
                        text: 'Touch the symbol',
                        actions: ['goTo'],
                    },
                    {
                        cardId: 5,
                        text: 'Read the inscription',
                    },
                ],
            },
            {
                id: 4,
                description: 'As you touch the symbol, a skeleton appears before you ready to fight.',
                options: [
                    {
                        cardId: 111,
                        text: 'Fight the skeleton',
                        actions: ['fight'],
                    },
                    {
                        cardId: 99,
                        text: 'Run away',
                        actions: ['fight', 'goTo'],
                    },
                ],
            },
            {
                id: 111,
                description: '',
                options: [],
            },
            {
                id: 99,
                description: 'You leave the shrine, feeling a sense of unease as you step back into the forest.',
                options: [
                    {
                        cardId: 0,
                        text: 'Close',
                    },
                ],
            },
        ],
        monsters: [
            {
                id: 'skeleton',
                cardId: 4,
            },
        ],
    },
]
