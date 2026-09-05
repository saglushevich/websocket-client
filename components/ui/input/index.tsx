import { ChangeEvent } from "react";

import styles from "./index.module.css";

import cn from "classnames";

type Props = {
    className?: string;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
};

export const Input = ({
    className,
    placeholder,
    onChange,
    value,
    name,
}: Props) => {
    return (
        <input
            className={cn(styles.input, className)}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
        />
    );
};
