import {Sidebar} from "../../../components/common/Sidebar";
import { Discover } from "@/app/components/dashboard/rooms/Discover";
export default function Rooms({ params }: { params: { roomId: string } }) {
return(
    <Sidebar>
    <Discover />
    </Sidebar>
)
}