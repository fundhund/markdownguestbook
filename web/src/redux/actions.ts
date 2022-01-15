import { getEntries } from "../lib/crud"
import { isEntryData } from "../types/EntryData"

export const updateEntries = async () => {
    const isValidResponse = (obj: any) => Array.isArray(obj) && obj.every(element => isEntryData(element))

    try {
        const entries = await getEntries()
        if (isValidResponse(entries)) {
            return {
                type: 'UPDATE_ENTRIES',
                payload: entries,
            }
        }
    } catch (err) {
        console.log(err)
    } 
}

export const updateName = (name: string) => ({
    type: 'UPDATE_NAME',
    payload: name,
})

export const updateMessage = (message: string) => ({
    type: 'UPDATE_MESSAGE',
    payload: message,
})

export const clearForm = () => ({
    type: 'CLEAR_FORM',
    payload: null,
})
