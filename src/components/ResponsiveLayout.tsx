
import React, { ReactNode } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: ReactNode;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
  className?: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = '',
  className = '',
}) => {
  const { deviceType } = useDeviceType();

  const responsiveClassName = React.useMemo(() => {
    switch (deviceType) {
      case 'mobile':
        return mobileClassName;
      case 'tablet':
        return tabletClassName;
      case 'desktop':
        return desktopClassName;
      default:
        return '';
    }
  }, [deviceType, mobileClassName, tabletClassName, desktopClassName]);

  return (
    <div className={cn(className, responsiveClassName)}>
      {children}
    </div>
  );
};

export default ResponsiveLayout;
