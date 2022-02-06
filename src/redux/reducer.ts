import { combineReducers } from 'redux'
import { EntryData } from '../types/EntryData'

type EntriesAction = {
    type: 'UPDATE_ENTRIES',
    payload: EntryData[],
}

type FormAction = {
    type: 'UPDATE_NAME' | 'UPDATE_MESSAGE' | 'CLEAR_FORM' | 'SHOW_FORM' | 'SHOW_PREVIEW',
    payload: string | null,
}

type UserAction = {
    type: 'ADD_OWN_ENTRY_ID',
    payload: string,
}

const entriesReducer = (state = [], action: EntriesAction) => {
    switch (action.type) {
        case 'UPDATE_ENTRIES':
            return action?.payload
        default:
            return state
    }
}

type FormState = {
    name: string
    message: string
    isFormVisible: boolean
}

const defaultFormState: FormState = {
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
        case 'SHOW_PREVIEW':
            return {
                ...state,
                isPreviewVisible: action?.payload,
            }
        default:
            return state
    }
}

type UserState = {
    ownEntries: string[],
}

const defaultUserState: UserState = {
    ownEntries: [],
}

const userReducer = (state = defaultUserState, action: UserAction) => {
    switch (action.type) {
        case 'ADD_OWN_ENTRY_ID':
            return {
                ...state,
                ownEntries: [...state?.ownEntries, action?.payload],
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    entries: entriesReducer,
    form: formReducer,
    user: userReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
