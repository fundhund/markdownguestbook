import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEntries } from '../redux/actions'
import { RootState } from '../redux/reducer'
import { EntryData } from '../types/EntryData'
import Entry from './Entry'
import styles from './EntryList.module.scss'

const sortEntries = (a: EntryData, b: EntryData) => new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1

const Entries = () => {

    const entries: EntryData[] = useSelector((state: RootState) => state.entries)

    const dispatch = useDispatch()
    useEffect(() => { fetchEntries(dispatch) }, [dispatch])

    return (
        <div className={styles.entryList}>
            {entries?.sort(sortEntries).map((entryData: any) => (
                <Entry 
                    key={entryData.id}
                    entryData={entryData}
                />
            ))}
        </div>
    )
}

export default Entries
