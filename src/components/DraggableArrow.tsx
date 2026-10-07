import { useDraggable } from "@dnd-kit/react";
import type { DraggableItem } from "../types/planner";

interface DraggableArrowProps {
    arrow: DraggableItem;
}

function DraggableArrow({ arrow }: DraggableArrowProps) {
    const { ref } = useDraggable({
        id: arrow.id,
        data: { category: "arrow" },
    });

    return (
        <div ref={ref} className="mt-1.25 flex size-20 flex-col items-center justify-center text-balance">
            <img src={arrow.imagePath} className="h-15 w-15"/>
        </div>
    );
}

export default DraggableArrow;