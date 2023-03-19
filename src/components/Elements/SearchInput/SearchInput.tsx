import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import styles from "./SearchInput.module.scss";

export interface SearchInputProps {
  className?: string;
  value?: string;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (keyWord: string) => void;
  onSubmit?: (keyWord: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className = "",
  value,
  placeholder = "",
  onFocus,
  onBlur,
  onChange,
  onSubmit,
}) => {
  const [keyword, setKeyword] = useState(value);
  const [isFocus, setFocus] = useState(false);

  useEffect(() => {
    if (value) {
      setKeyword(value);
    }
  }, [value]);

  const isEditing = useMemo(() => {
    return !!keyword;
  }, [keyword]);

  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: newValue },
  }) => {
    setKeyword(newValue);
    onChange?.call(null, newValue);
  };

  const handleClear = () => {
    setKeyword("");
    onChange?.call(null, "");
  };

  const handleSubmit = () => {
    if (keyword) {
      onSubmit?.call(null, keyword);
    }
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
      handleSubmit();
    }
  };

  const handleFocus = () => {
    setFocus(true);
    onFocus?.call(null);
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur?.call(null);
  };

  const handleMouseDownClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.icon}>
        <IconSearch color="#7a8189" />
      </div>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={keyword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChangeText}
        onKeyDown={handleKeyPress}
      />
      {isFocus && isEditing && (
        <button
          className={styles.btn_clear}
          onClick={handleClear}
          onMouseDown={handleMouseDownClear}
        >
          <IconX size={20} />
        </button>
      )}
    </div>
  );
};
