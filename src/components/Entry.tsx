import { RiDeleteBin6Line, RiDoubleQuotesR } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEntry } from '../lib/crud.js'
import { markdownToHtml } from '../lib/markdownHelper'
import { fetchEntries, showForm, updateMessage } from '../redux/actions'
import { RootState } from '../redux/reducer'
import { EntryData } from '../types/EntryData'
import styles from './Entry.module.scss'

type Props = {
	entryData: EntryData | null | undefined
}

const Entry = ({entryData}: Props) => {

    const { message: messageInForm } = useSelector((state: RootState) => state.form)
    const { ownEntries } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch()

    if (!entryData) {
        return null
    }

    const {
        id,
        name,
        message,
        timestamp,
    } = entryData

    const displayedTime = new Date(timestamp).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })

    const handleQuote = () => {
        const newMessageInForm = `${messageInForm}> _${message.replace(/\n/g, '_\n> _')}_\n`
        dispatch(updateMessage(newMessageInForm))
        dispatch(showForm(true))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async () => {
        await deleteEntry(id)
        await fetchEntries(dispatch)
    }

    return (
        <div className={styles.entry}>
            <div className={styles.header}>
                <div className={styles.id}>{id}</div>
                <div className={styles.name}>{name}</div>
            </div>
            <div 
                className={styles.body}
                dangerouslySetInnerHTML={{__html: markdownToHtml(message)}}
            />
            <div className={styles.footer}>
                <div className={styles.timestamp}>{displayedTime}</div>
                <div className={styles.icons}>
                    <RiDoubleQuotesR onClick={handleQuote} />
                    { ownEntries.includes(id) && <RiDeleteBin6Line onClick={handleDelete} /> }
                </div>
            </div>
        </div>
    )
}

export default Entry
