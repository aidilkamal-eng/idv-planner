import type { HunterConfig } from "../types/planner";

export const hunterList: HunterConfig[] = [
    {
        id: "hunter-TheShadow",
        name: "The Shadow",
        imagePath: "assets/Hunter/NavTheShadow.webp",
        abilities: [
            { id: "theShadow-ability-1", name: "Interdimensional Travel", imagePath: "assets/Abilities/InterdimensionalTravel%26CorruptionTransference.webp"}
        ],
    },

    {
        id: "hunter-Gamekeeper",
        name: "Gamekeeper",
        imagePath: "assets/Hunter/NavGamekeeper.webp",
        abilities: [
            { id: "gamekeeper-ability-1", name: "Trap", imagePath: "assets/Abilities/Trap.webp"}
        ],
    },
]