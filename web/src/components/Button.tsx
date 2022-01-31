import styles from './Button.module.scss'

type Props = {
	text: string
	onclick: () => void
    color: 'blue' | 'red'
    disabled?: boolean
}

const Button = ({text, onclick, color, disabled = false}: Props) => (
    <button 
        className={[styles.button, styles[color]].join(' ')}
        onClick={onclick}
        disabled={disabled}
    >
        {text}
    </button>
)

export default Button
