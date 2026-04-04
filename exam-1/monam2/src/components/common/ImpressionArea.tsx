import { useEffect, useRef } from "react";

interface ImpressionAreaProps {
  children: React.ReactNode;
  areaThreshold: number;
  onImpressionStart?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function ImpressionArea({
  children,
  areaThreshold,
  onImpressionStart,
  disabled = false,
  style,
  ...otherProps
}: ImpressionAreaProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || disabled || !onImpressionStart) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onImpressionStart();
        }
      },
      { threshold: areaThreshold },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [areaThreshold, disabled, onImpressionStart]);

  return (
    <div ref={observerRef} style={style} {...otherProps}>
      {children}
    </div>
  );
}
