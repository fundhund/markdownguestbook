import styles from './Header.module.scss';
import Icons from './Icons';

const Header = () => {
    return (
        <div className={styles.header}>
            <h1>SIMPLE MARKDOWN GUESTBOOK</h1>
            <Icons />
        </div>
    )
}

export default Header
