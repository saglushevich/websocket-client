import { useAppSelector } from "../../store/hooks";
import { recipientSelector } from "../../store/slices/chat";

import styles from "./index.module.css";

export const RecipientInfo = () => {
    const recipient = useAppSelector(recipientSelector);

    if (!recipient) {
        return null;
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <p className={styles.userName}>
                    chat with <span>{recipient.userName}</span>
                </p>
            </div>
        </div>
    );
};
