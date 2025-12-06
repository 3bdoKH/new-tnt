import React, { useEffect } from 'react';

const SEOHead = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    locale = 'ar_EG'
}) => {
    const defaultTitle = 'TNT Garage - قطع غيار السيارات الألمانية وخدمة ونش الانقاذ في مصر';
    const defaultDescription = 'متجر قطع غيار السيارات الألمانية في مصر. قطع غيار جديدة ومستعملة لجميع ماركات BMW و Volkswagen Group. خدمة ونش انقاذ 24/7، فحص السيارات، صيانة السيارات الألمانية. توصيل سريع في جميع أنحاء مصر.';
    const defaultKeywords = 'قطع غيار سيارات, قطع غيار BMW, قطع غيار أودي, قطع غيار فولكس فاجن, قطع غيار بورش, قطع غيار لامبورغيني, قطع غيار بنتلي, قطع غيار جديدة, قطع غيار مستعملة, قطع غيار استيراد, ونش انقاذ, سحب سيارات, فحص سيارات, صيانة سيارات, TNT Garage, مصر, المعادي, القاهرة';
    const defaultImage = 'https://tntgaragede.com/logotr.png';
    const defaultUrl = 'https://tntgaragede.com/';

    const finalTitle = title ? `${title} | TNT Garage` : defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalKeywords = keywords || defaultKeywords;
    const finalImage = image || defaultImage;
    const finalUrl = url || defaultUrl;

    useEffect(() => {
        // Update document title
        document.title = finalTitle;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', finalDescription);
        }

        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', finalKeywords);
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', finalTitle);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', finalDescription);
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', finalUrl);
        }

        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
            ogImage.setAttribute('content', finalImage);
        }

        // Update Twitter Card tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', finalTitle);
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', finalDescription);
        }

        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        if (twitterImage) {
            twitterImage.setAttribute('content', finalImage);
        }

        // Update canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', finalUrl);
        } else {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            canonical.setAttribute('href', finalUrl);
            document.head.appendChild(canonical);
        }
    }, [finalTitle, finalDescription, finalKeywords, finalImage, finalUrl]);

    return null; // This component doesn't render anything
};

export default SEOHead;
