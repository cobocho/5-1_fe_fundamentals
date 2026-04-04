import { css } from "@emotion/react";
import {
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export interface AutocompleteOption {
  value: string;
  label: string;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value: string;
  onChange: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  emptyMessage?: string;
}

type AutocompleteInputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "onChange" | "onSelect" | "type" | "value"
>;

export default function Autocomplete({
  options,
  value,
  onChange,
  onSelect,
  emptyMessage = "검색 결과가 없습니다.",
  onFocus,
  onKeyDown,
  ...inputProps
}: AutocompleteProps & AutocompleteInputProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const normalizedValue = value.trim();
  const shouldShowList = isOpen && normalizedValue.length > 0;
  const activeOptionId =
    activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node | null)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!normalizedValue) {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (document.activeElement === inputRef.current) {
      setIsOpen(true);
    }

    if (options.length === 0) {
      setActiveIndex(-1);
      return;
    }

    if (activeIndex >= options.length) {
      setActiveIndex(options.length - 1);
    }
  }, [activeIndex, normalizedValue, options.length]);

  const closeList = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const selectOption = (option: AutocompleteOption) => {
    onChange(option.value);
    onSelect?.(option);
    closeList();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (!isOpen) {
      if (event.key === "ArrowDown" && options.length > 0) {
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((previousIndex) =>
          Math.min(previousIndex + 1, options.length - 1),
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((previousIndex) => Math.max(previousIndex - 1, 0));
        break;
      case "Enter":
        if (activeIndex >= 0 && options[activeIndex]) {
          event.preventDefault();
          selectOption(options[activeIndex]);
        }
        break;
      case "Escape":
      case "Tab":
        closeList();
        break;
    }
  };

  return (
    <div ref={rootRef} css={rootStyle}>
      <input
        {...inputProps}
        ref={inputRef}
        type="text"
        role="combobox"
        autoComplete="off"
        css={inputStyle}
        value={value}
        aria-autocomplete="list"
        aria-expanded={shouldShowList}
        aria-controls={shouldShowList ? listId : undefined}
        aria-activedescendant={shouldShowList ? activeOptionId : undefined}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={(event) => {
          onFocus?.(event);

          if (normalizedValue) {
            setIsOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      {shouldShowList && (
        <div id={listId} role="listbox" css={listStyle}>
          {options.length === 0 ? (
            <div css={emptyStyle}>{emptyMessage}</div>
          ) : (
            options.map((option, index) => (
              <button
                type="button"
                key={option.value}
                id={`${listId}-option-${index}`}
                role="option"
                tabIndex={-1}
                aria-selected={activeIndex === index}
                css={[itemStyle, activeIndex === index && activeItemStyle]}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  selectOption(option);
                }}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const rootStyle = css({
  position: "relative",
  width: "100%",
});

const inputStyle = css({
  width: "100%",
  height: "40px",
  padding: "0 0.875rem",
  fontSize: "0.9375rem",
  color: "#111827",
  backgroundColor: "#ffffff",
  border: "1.5px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",

  "&::placeholder": {
    color: "#9ca3af",
  },

  "&:focus": {
    borderColor: "#f97316",
    boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.18)",
  },
});

const listStyle = css({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  right: 0,
  zIndex: 10,
  padding: "0.25rem",
  margin: 0,
  listStyle: "none",
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
});

const itemStyle = css({
  display: "block",
  width: "100%",
  padding: "0.5rem 0.75rem",
  color: "inherit",
  textAlign: "left",
  background: "transparent",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
});

const activeItemStyle = css({
  backgroundColor: "#fff7ed",
  color: "#c2410c",
});

const emptyStyle = css({
  padding: "0.5rem 0.75rem",
  color: "#9ca3af",
});
