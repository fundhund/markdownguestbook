import styles from './Icons.module.scss'

const techstack = [
    {
        name: 'React',
        logo: '/logos/react.png',
        url: 'https://reactjs.org/',
    },
    {
        name: 'TypeScript',
        logo: '/logos/typescript.png',
        url: 'https://www.typescriptlang.org/',
    },
    {
        name: 'Redux',
        logo: '/logos/redux.png',
        url: 'https://react-redux.js.org/',
    },
    {
        name: 'Sass',
        logo: '/logos/sass.png',
        url: 'https://sass-lang.com/',
    },
    {
        name: 'Node.js',
        logo: '/logos/nodejs.png',
        url: 'https://nodejs.org/',
    },
    {
        name: 'PostgreSQL',
        logo: '/logos/postgres.png',
        url: 'https://www.postgresql.org/',
    },

]

const Icons = () => (
    <div className={styles.icons}>
        <h2 className={styles.header}>made with</h2>
        <div className={styles.iconList}>
            {techstack.map(tech => (
                <a
                    key={tech.name}
                    href={tech.url}
                    target='_blank'
                    rel='noreferrer'
                >
                    <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                    />
                </a>
            ))}
        </div>
    </div>
)

export default Icons;
