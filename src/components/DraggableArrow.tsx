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
        <div ref={ref} id="arrow-items">
            <img src={arrow.imagePath}/>
        </div>
    );
}

export default DraggableArrow;