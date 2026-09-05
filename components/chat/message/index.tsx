import styles from "./index.module.css";
import cn from "classnames";

type Props = {
    text: string;
    mine: boolean;
    time: string;
};

export const Message = ({ text, mine, time }: Props) => {
    return (
        <div className={cn(styles.wrapper, { [styles.mine]: mine })}>
            <p className={styles.message}>{text}</p>
            <p className={styles.time}>{time}</p>
        </div>
    );
};
