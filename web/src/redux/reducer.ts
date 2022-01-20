import { combineReducers } from 'redux'
import { EntryData } from '../types/EntryData'

type EntriesAction = {
    type: 'UPDATE_ENTRIES',
    payload: EntryData[],
}

type FormAction = {
    type: 'UPDATE_NAME' | 'UPDATE_MESSAGE' | 'CLEAR_FORM' | 'SHOW_FORM',
    payload: string | null,
}

const entriesReducer = (state = [], action: EntriesAction) => {
    switch (action.type) {
        case 'UPDATE_ENTRIES':
            return action?.payload
        default:
            return state
    }
}

const defaultFormState = {
    name: '',
    message: '',
    isFormVisible: false,
}

const formReducer = (state = defaultFormState, action: FormAction) => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return {
                ...state,
                name: action?.payload
            }
        case 'UPDATE_MESSAGE':
            return {
                ...state,
                message: action?.payload
            }
        case 'CLEAR_FORM':
            return {
                ...state,
                name: '',
                message: '',
            }
        case 'SHOW_FORM':
            return {
                ...state,
                isFormVisible: action?.payload,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    entries: entriesReducer,
    form: formReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
