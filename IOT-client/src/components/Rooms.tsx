import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api";
import Devices from './Devices' 
import { Label } from "./ui/label";

export default function Rooms() {

  const roomList = useQuery(api.rooms.getRooms)

  return (
    <div>
      <ul className="w-fit flex flex-col gap-4 p-5">
        {
          roomList?.map(({_id, name})=> (
            <li key={_id} className="w-auto flex flex-col border border-secondary-foreground rounded-lg p-5 gap-5">
              <Label className="w-auto text-primary text-xl font-bold">{name}: </Label>
              <Devices room={_id} /> 
            </li>
          ))
        }
      </ul>
    </div>
  )
}
