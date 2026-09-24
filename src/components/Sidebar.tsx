import { hunterList } from "../data/hunterData"
import { survivorList } from "../data/survivorData"
import DraggableHunter from "./DraggableHunter"
import DraggableSurvivor from "./DraggableSurvivor"

export default function Sidebar() {
    return (
        <div className="custom-scrollbar" style={{ height: "100vh", overflowY: "auto" }}>
            <details className="sidebar-section">
                <summary>
                    <div className="sidebar-title">
                        <p>HUNTER</p>
                    </div>
                </summary>
                <div id="sidebar-title-note">
                    <p>*click on the hunter card to reveal their abilities</p>
                </div>
                {hunterList.map((hunter) => (
                    <DraggableHunter key={hunter.id} hunter={hunter}/>
                ))}
            </details>
            <details className="sidebar-section">
                <summary>
                    <div className="sidebar-title">
                        <p>SURVIVOR</p>
                    </div>
                </summary>
                {survivorList.map((survivor) => (
                    <DraggableSurvivor key={survivor.id} survivor={survivor} />
                ))}
            </details>
        </div>
    )
}