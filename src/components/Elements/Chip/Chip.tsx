import clsx from "clsx";
import styles from "./Chip.module.scss";

interface ChipProps {
  className?: string;
  children?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ children, className }) => {
  return <div className={clsx(styles.content, className)}>{children}</div>;
};
