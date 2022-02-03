import { Dispatch } from "react"
import { Action } from "redux"
import { getEntries } from "../lib/crud"
import { EntryData, isEntryData } from "../types/EntryData"

export const fetchEntries = async (dispatch: Dispatch<Action>) => {
    const isValidResponse = (obj: any) => Array.isArray(obj) && obj.every(element => isEntryData(element))

    try {
        const entries = await getEntries()
        if (isValidResponse(entries)) {
            dispatch(updateEntries(entries))
        }
    } catch (err) {
        console.log(err)
    } 
}

export const updateEntries = (entries: EntryData[] | undefined) => ({
    type: 'UPDATE_ENTRIES',
    payload: entries,
})

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

export const showForm = (isFormVisible: boolean) => ({
    type: 'SHOW_FORM',
    payload: isFormVisible,
})

export const addOwnEntry = (id: string) => ({
    type: 'ADD_OWN_ENTRY_ID',
    payload: id,
})
