import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fixed right-4 bottom-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 active:bg-gray-100 md:right-6 md:bottom-8 md:h-12 md:w-12"
      aria-label="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="h-4 w-4 text-gray-700 md:h-5 md:w-5" />
    </button>
  );
}

export default ScrollToTopButton;
