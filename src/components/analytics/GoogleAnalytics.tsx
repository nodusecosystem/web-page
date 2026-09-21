import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/constants/site'
import { CONSENT_STORAGE_KEY } from '@/lib/consent'

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var consent = 'denied';
try {
  if (window.localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') consent = 'granted';
} catch (error) {
  consent = 'denied';
}
gtag('consent', 'default', {
  analytics_storage: consent,
  ad_storage: consent,
  ad_user_data: consent,
  ad_personalization: consent,
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  )
}
