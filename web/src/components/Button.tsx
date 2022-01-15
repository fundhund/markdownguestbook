import styles from './Button.module.scss'

type Props = {
	text: string
	onclick: () => void,
    color: 'blue' | 'red', 
}

const Button = ({text, onclick, color}: Props) => (
    <button 
        className={[styles.button, styles[color]].join(' ')}
        onClick={onclick}
    >
        {text}
    </button>
)

export default Button
