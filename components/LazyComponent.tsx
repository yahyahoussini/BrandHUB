import React, { useRef, Suspense } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LazyComponent: React.FC<LazyComponentProps> = ({ children, fallback = null }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(ref, '100px');

  return (
    <div ref={ref}>
      {isOnScreen ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};

export default LazyComponent;
