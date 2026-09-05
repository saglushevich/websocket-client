import styles from "./index.module.css";

type Props = {
    name: string;
    onSelectUser: () => void;
};

export const User = ({ name, onSelectUser }: Props) => {
    return (
        <button type="button" className={styles.wrapper} onClick={onSelectUser}>
            <p className={styles.name}>{name}</p>
        </button>
    );
};
