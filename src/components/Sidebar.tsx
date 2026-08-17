import { hunterList } from "../data/hunterData"
import { survivorList } from "../data/survivorData"
import DraggableHunter from "./DraggableHunter"
import DraggableSurvivor from "./DraggableSurvivor"

export default function Sidebar() {
    return (
        <div className="custom-scrollbar" style={{ height: "100vh", overflowY: "auto" }}>
            <div className="sidebar-section">
                <div className="sidebar-title">
                    <text>HUNTER</text>
                </div>
                {hunterList.map((hunter) => (
                    <DraggableHunter key={hunter.id} hunter={hunter}/>
                ))}
            </div>
            <div className="sidebar-section">
                <div className="sidebar-title">
                    <text>SURVIVOR</text>
                </div>
                {survivorList.map((survivor) => (
                    <DraggableSurvivor key={survivor.id} survivor={survivor} />
                ))}
            </div>
        </div>
    )
}