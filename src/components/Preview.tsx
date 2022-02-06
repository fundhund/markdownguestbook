import { useSelector } from 'react-redux';
import { markdownToHtml } from '../lib/markdownHelper';
import { RootState } from '../redux/reducer';
import styles from './Preview.module.scss';

const Preview = () => {

    const { message } = useSelector((state: RootState) => state.form)

    return (
        <div className={styles.previewWrapper}>
            <div 
                className={styles.preview}
                dangerouslySetInnerHTML={{__html: markdownToHtml(message)}}
            />
        </div>
    )
}

export default Preview;
