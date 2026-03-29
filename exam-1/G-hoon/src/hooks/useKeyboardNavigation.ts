import { useCallback, useEffect, useState } from 'react';

interface UseKeyboardNavigationOptions<T> {
  options: T[];
  isOpen: boolean;
  onSelect: (item: T) => void;
  onClose: () => void;
}

export function useKeyboardNavigation<T>({
  options,
  isOpen,
  onSelect,
  onClose,
}: UseKeyboardNavigationOptions<T>) {
  const [activeIndex, setActiveIndex] = useState(-1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: options 변경 시 리셋 필요
  useEffect(() => {
    setActiveIndex(-1);
  }, [options]);

  const reset = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        reset();
        return;
      }

      if (!isOpen || options.length === 0) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        }
        case 'Enter': {
          if (activeIndex >= 0) {
            e.preventDefault();
            onSelect(options[activeIndex]);
          }
          break;
        }
      }
    },
    [options, isOpen, activeIndex, onSelect, onClose, reset],
  );

  return { activeIndex, handleKeyDown, reset };
}
