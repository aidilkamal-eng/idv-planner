import { arrowList } from "../data/arrowData";
import DraggableArrow from "./DraggableArrow";

export default function UtilitySidebar() {
    return (
        <div>
            <div>
                {arrowList.map((arrow) => (
                    <DraggableArrow key={arrow.id} arrow={arrow}/>
                ))}
            </div>
        </div>
    )
}