export type EntryData = {
    name: string
    message: string
    timestamp: string
    id: string
}

export const isEntryData = (obj: any) => 
obj.name !== undefined 
&& obj.message !== undefined
&& obj.timestamp !== undefined 
&& obj.id  !== undefined
