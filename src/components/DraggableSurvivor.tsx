import { useDraggable } from "@dnd-kit/react";
import type { DraggableItem } from "../types/planner";

interface DraggableSurvivorProps {
    survivor: DraggableItem;
}

function DraggableSurvivor({ survivor }: DraggableSurvivorProps) {
    const { ref } = useDraggable({
        id: survivor.id,
        data: { category: "survivor" },
    });

    return (
        <div ref={ref} className="mx-0 my-1.25 flex items-center rounded-sm border border-gray-500 p-1.25">
            <img src={survivor.imagePath} className="h-16.25 w-16.25"/>
            <p className="ml-2.5 text-white">{survivor.name}</p>
        </div>
    );
}

export default DraggableSurvivor;