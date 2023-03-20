import { Chip } from "@/components/Elements";
import { IconGift, IconStarFilled } from "@tabler/icons-react";
import { useMemo } from "react";
import { Store, Promotion } from "@/features/home";
import Image from "next/image";
import styles from "./StoreCard.module.scss";
import clsx from "clsx";

export interface StoreCardProps {
  data: Store;
  onClick?: (data: Store) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ data, onClick }) => {
  const handleClick = () => {
    onClick?.call(null, data);
  };

  const estimatedTime = useMemo(() => {
    if (data?.minCookTime && data?.maxCookTime) {
      return `${data?.minCookTime}-${data?.maxCookTime} min`;
    }

    if (data?.minCookTime) return `${data.minCookTime} min`;

    if (data?.maxCookTime) return `${data.maxCookTime} min`;

    return null;
  }, [data?.minCookTime, data?.maxCookTime]);

  const promotion = useMemo(() => {
    switch (data?.promotion) {
      case Promotion.GIFT:
        return (
          <div className={clsx(styles.promotion, styles.promotion_gift)}>
            <IconGift color="#f2f2f2" />
          </div>
        );
      case Promotion.DISCOUNT:
        return (
          <div className={clsx(styles.promotion, styles.promotion_discount)}>
            %
          </div>
        );
      default:
        if (data?.promotion) {
          return (
            <div className={clsx(styles.promotion)}>{data?.promotion}</div>
          );
        }

        return null;
    }
  }, [data?.promotion]);

  const rating = Math.round(data?.rating * 10) / 10;

  return (
    <div className={styles.card} data-testid="store-card" onClick={handleClick}>
      {promotion}

      <div className={styles.image}>
        <Image width={400} height={400} alt={data?.name} src={data?.imageUrl} />
      </div>

      <div className={styles.detail}>
        <div className={styles.name}>{data?.name}</div>
        <div className={styles.info}>
          <Chip>
            <IconStarFilled size={16} fill="#7a8189" />
            &nbsp;
            <span>{rating}</span>
          </Chip>

          {estimatedTime && <Chip>{estimatedTime}</Chip>}
          {data?.isNew && <Chip className={styles.new}>New</Chip>}
        </div>
      </div>
    </div>
  );
};
