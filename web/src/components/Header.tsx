import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={styles.header}>
            <h1>SIMPLE GUESTBOOK</h1>
            <h2>Please leave a message</h2>
        </div>
    )
}

export default Header
