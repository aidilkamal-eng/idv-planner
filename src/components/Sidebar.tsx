import { hunterList } from "../data/hunterData"
import { survivorList } from "../data/survivorData"
import DraggableHunter from "./DraggableHunter"
import DraggableSurvivor from "./DraggableSurvivor"

export default function Sidebar() {

    return (
        <div>
            <div>
                {hunterList.map((hunter) => (
                    <DraggableHunter key={hunter.id} hunter={hunter}/>
                ))}
            </div>
            <div>
                {survivorList.map((survivor) => (
                    <DraggableSurvivor key={survivor.id} survivor={survivor} />
                ))}
            </div>
        </div>
    )
}