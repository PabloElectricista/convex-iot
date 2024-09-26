import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Deices({ room }: { room: Id<'rooms'> }) {

  const devicesList = useQuery(api.devices.getDevices, { room })

  const URL = import.meta.env.VITE_CONVEX_SITE + '/devices/toggle/'
  const handleChange = async (id: Id<'devices'>, on: boolean) => {
    const response = await fetch(`${URL}`, {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        status: on ? 'on' : 'off'
      })
    })
    console.log(response);
    
  }

  return (
    <ul className="w-auto flex flex-row gap-3">
      {
        devicesList?.map(({ _id, name, status }) => (
          <li key={_id} className="flex items-center gap-3">
            <Switch
              id={name}
              checked={status === 'on'}
              onCheckedChange={(checked: boolean) => handleChange(_id, checked)} />
            <Label
              className="w-auto h-auto text-secondary-foreground text-xl"
              htmlFor={name}
            >
              {name}
            </Label>
            <div className={`size-5 rounded-full ${status === 'on' ? 'bg-yellow-300' : 'bg-background'}`} />
          </li>
        ))
      }
    </ul>
  )
}
