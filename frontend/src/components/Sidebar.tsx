
import BrainIcon from "../icons/BrainIcon";
import XIcon from "../icons/XIcon";
import YoutubeIcons from "../icons/YoutubeIcons";
import SidebarItems from "./SidebarItems";

export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-4 ">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-4 text-purple-700"><BrainIcon /></div>
        Brainly
        </div>
        <div className="pt-4 pl-4 ">
            <SidebarItems text="X" icon={<XIcon />} />
            <SidebarItems text="Youtube" icon={<YoutubeIcons />} />
        </div>
    </div>
}