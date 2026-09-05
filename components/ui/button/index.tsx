import styles from "./index.module.css";
import cn from "classnames";

type Props = {
    text: string;
    className?: string;
};

export const Button = ({ text, className }: Props) => {
    return <button className={cn(styles.button, className)}>{text}</button>;
};
