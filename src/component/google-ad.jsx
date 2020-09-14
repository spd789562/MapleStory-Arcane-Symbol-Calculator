import React, { useEffect } from 'react'

import { GOOGlE_AD_ID, GOOGlE_AD_SLOT } from '../../local.config'

const GoogleAd = () => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{
        display: 'block',
      }}
      data-ad-client={GOOGlE_AD_ID}
      data-ad-slot={GOOGlE_AD_SLOT}
    />
  )
}

export default GoogleAd
