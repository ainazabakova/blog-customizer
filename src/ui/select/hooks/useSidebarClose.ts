import { useEffect, type RefObject } from 'react';

type UseSidebarCloseProps = {
  sidebarRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
};

export const useSidebarClose = ({
  sidebarRef,
  isOpen,
  onClose,
}: UseSidebarCloseProps): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent): void => {
      if (
        event.target instanceof Node &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleKeyDown);

    return (): void => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarRef, isOpen, onClose]);
};
