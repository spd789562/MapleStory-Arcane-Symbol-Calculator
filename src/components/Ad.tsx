'use client';
import { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGlE_AD_ID) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_GOOGlE_AD_ID) return null;

  return (
    <ins
      className="adsbygoogle adbanner-customize block"
      data-ad-format="fluid"
      data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGlE_AD_ID}`}
      data-ad-slot={process.env.NEXT_PUBLIC_GOOGlE_AD_SLOT_TEST}
      data-ad-layout-key={process.env.NEXT_PUBLIC_GOOGLE_AD_LAYOUT_TEST}
      data-full-width-responsive
    />
  );
};

export default GoogleAd;
