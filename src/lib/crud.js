import axios from 'axios'

const PORT = process.env.PORT ?? 5000
const BASE_URL = `${process.env.URL ?? 'http://localhost'}:${PORT}`

const URLS = {
    API_V1: `${BASE_URL}/api/v1`,
    ENTRIES: `${BASE_URL}/api/v1/entries`,
}

export const getEntries = async () => {
    const response = await axios.get(URLS.ENTRIES)
    return response.data.map((element) => ({
        ...element,
        timestamp: element.created,
        id: element.entry_id,
    }))
}

export const postEntry = async (name, message) => {
    const { data } = await axios.post(URLS.ENTRIES, {
        name,
        message,
    })
    return data
}

export const deleteEntry = async (id) => {
    await axios.delete(`${URLS.ENTRIES}/${id}`)
}
