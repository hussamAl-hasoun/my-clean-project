
import React from 'react';
import { useIsMobile } from './use-mobile';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceType() {
  const isMobile = useIsMobile();
  const [deviceType, setDeviceType] = React.useState<DeviceType>('desktop');

  React.useEffect(() => {
    function detectDeviceType() {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    }
    
    detectDeviceType();
    window.addEventListener('resize', detectDeviceType);
    
    return () => {
      window.removeEventListener('resize', detectDeviceType);
    };
  }, []);

  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop'
  };
}
