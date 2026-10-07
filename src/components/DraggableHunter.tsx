import { useDraggable } from "@dnd-kit/react";
import type { HunterConfig } from "../types/planner";
import DraggableHunterAbility from "./DraggableHunterAbility";

interface DraggableHunterProps {
    hunter: HunterConfig;
}

function DraggableHunter({ hunter }: DraggableHunterProps) {
    const { ref } = useDraggable({
         id: hunter.id,
         data: { category: "hunter" },
    });

    return (
        <details ref={ref} className="mx-0 my-1.25 rounded-sm border border-gray-500 p-1.25">
            <summary className="flex cursor-pointer list-none items-center p-1.25 text-white [&::-webkit-details-marker]:hidden">
                <img src={hunter.imagePath} className="h-16.25 w-16.25"/>
                <span className="ml-2.5">{hunter.name}</span>
            </summary>
            <div className="flex max-w-62.5 flex-row flex-wrap items-center justify-start gap-1.25">
                {hunter.abilities.map((ability) => (
                    <DraggableHunterAbility key={ability.id} ability={ability}/>
                ))}
            </div>
        </details>
    )
}

export default DraggableHunter;