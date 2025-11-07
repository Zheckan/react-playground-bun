'use client';

import { useEffect } from 'react';
import { scan } from 'react-scan';

export default function ReactScanInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    scan({
      enabled: true,
      log: true,
    });
  }, []);
  return null;
}
