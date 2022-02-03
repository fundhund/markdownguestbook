import axios from 'axios'
import { EntryData } from '../types/EntryData'

const BASE_URL = process.env.REACT_APP_URL ?? 'http://localhost:5000'

const URLS = {
    API_V1: `${BASE_URL}/api/v1`,
    ENTRIES: `${BASE_URL}/api/v1/entries`,
}

export const getEntries = async (): Promise<EntryData[] | undefined> => {
    const response = await axios.get(URLS.ENTRIES)
    return response.data.map((element: any) => ({
        ...element,
        timestamp: element.created,
        id: element.entry_id,
    }))
}

export const postEntry = async (name: string, message: string): Promise<Partial<EntryData>> => {
    const { data } = await axios.post(URLS.ENTRIES, {
        name,
        message,
    })
    return data
}

export const deleteEntry = async (id: string): Promise<void> => {
    await axios.delete(`${URLS.ENTRIES}/${id}`)
}
