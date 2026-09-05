import styles from "./index.module.css";

type Props = {
    name: string;
    onSelectUser: () => void;
};

export const User = ({ name, onSelectUser }: Props) => {
    return (
        <div className={styles.wrapper} onClick={onSelectUser}>
            <p className={styles.name}>{name}</p>
        </div>
    );
};
