import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/constants/site'
import { CONSENT_STORAGE_KEY, INTERNAL_TRAFFIC_STORAGE_KEY } from '@/lib/consent'

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
var internal = false;
try {
  var flag = new URLSearchParams(window.location.search).get('traffic_type');
  if (flag === 'internal') window.localStorage.setItem('${INTERNAL_TRAFFIC_STORAGE_KEY}', '1');
  if (flag === 'external') window.localStorage.removeItem('${INTERNAL_TRAFFIC_STORAGE_KEY}');
  internal = window.localStorage.getItem('${INTERNAL_TRAFFIC_STORAGE_KEY}') === '1';
} catch (error) {
  internal = false;
}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', internal ? { traffic_type: 'internal' } : {});`}
      </Script>
    </>
  )
}
