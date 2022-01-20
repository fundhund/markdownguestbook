import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postEntry } from '../lib/crud'
import {
    clearForm,
    fetchEntries,
    showForm,
    updateMessage,
    updateName
} from '../redux/actions'
import { RootState } from '../redux/reducer'
import Button from './Button'
import styles from './EntryForm.module.scss'

const EntryForm = () => {

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean | null>(null)

    const {name, message, isFormVisible} = useSelector((state: RootState) => state.form)

    const dispatch = useDispatch()

    const submit = async () => {
        try {
            await postEntry(name, message)

            dispatch(showForm(false))
            setSuccess(true)
            await fetchEntries(dispatch)
            dispatch(clearForm())

        } catch (err) {
            if (typeof err === "string") {
                setError(err)
            } else if (err instanceof Error) {
                setError(err.message)
            }
        }
    }

    return (
        <div className={styles.entryForm}>
            {!isFormVisible && 
                <>
                    <div className={styles.toggleForm}>
                        <Button
                            text="New message"
                            onclick={() => {
                                dispatch(showForm(true))
                                setSuccess(null)
                            }}
                            color="blue"
                        />
                    </div>
                    {success && (<div className={styles.success}>Thank you!</div>)}
                </>
            }

            {isFormVisible && (
                <div className={styles.formWrapper}>

                    <div className={styles.formRow}>
                        <label htmlFor="name">Name</label>
                        <input
                            onClick={() => setError(null)}
                            value={name}
                            onChange={event => dispatch(updateName(event.target.value))}
                            type="text"
                            id="name"
                        />
                    </div>

                    <div className={styles.formRow}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            onClick={() => setError(null)}
                            value={message}
                            onChange={event => dispatch(updateMessage(event.target.value))}
                            id="message"
                        />
                    </div>

                    <div className={styles.buttonSection}>
                        <Button
                            text="Cancel"
                            onclick={() => dispatch(showForm(false))}
                            color="red"
                        />
                        <Button
                            text="Submit"
                            onclick={() => submit()}
                            color="blue"
                        />
                    </div>
                    {error && (<div className={styles.error}>{error}</div>)}
                </div>
            )}
        </div>
    )
}

export default EntryForm
