document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
    const prefetchedUrls = new Set();

    const markVisible = (element) => {
        element.classList.add('is-visible');
    };

    revealElements.forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${Math.min(index * 24, 96)}ms`);
    });

    const visibleThreshold = window.innerHeight * 0.92;
    const deferredReveals = [];

    revealElements.forEach((element) => {
        const top = element.getBoundingClientRect().top;

        if (top <= visibleThreshold) {
            markVisible(element);
            return;
        }

        deferredReveals.push(element);
    });

    if ('IntersectionObserver' in window && deferredReveals.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                markVisible(entry.target);
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.08,
            rootMargin: '160px 0px',
        });

        deferredReveals.forEach((element) => observer.observe(element));
    } else {
        deferredReveals.forEach(markVisible);
    }

    const syncHeaderState = () => {
        if (!header) {
            return;
        }

        header.classList.toggle('is-scrolled', window.scrollY > 14);
    };

    const isPrefetchable = (link) => {
        const href = link.getAttribute('href');

        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return false;
        }

        if (link.hasAttribute('download')) {
            return false;
        }

        const target = link.getAttribute('target');

        if (target && target !== '_self') {
            return false;
        }

        const url = new URL(link.href, window.location.href);

        if (url.origin !== window.location.origin) {
            return false;
        }

        if (url.pathname === '/logout') {
            return false;
        }

        if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash !== '') {
            return false;
        }

        return true;
    };

    const prefetchUrl = (url) => {
        if (prefetchedUrls.has(url)) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'document';
        document.head.appendChild(link);

        prefetchedUrls.add(url);
    };

    const pageLinks = Array.from(document.querySelectorAll('a[href]')).filter(isPrefetchable);

    pageLinks.forEach((link) => {
        const url = new URL(link.href, window.location.href).toString();

        link.addEventListener('mouseenter', () => prefetchUrl(url), { once: true });
        link.addEventListener('touchstart', () => prefetchUrl(url), { once: true, passive: true });
        link.addEventListener('pointerdown', () => {
            root.classList.add('is-page-loading');
            prefetchUrl(url);
        }, { passive: true });

        link.addEventListener('click', (event) => {
            if (
                event.defaultPrevented
                || event.button !== 0
                || event.metaKey
                || event.ctrlKey
                || event.shiftKey
                || event.altKey
            ) {
                return;
            }

            root.classList.add('is-page-loading');
        });
    });

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
            pageLinks.slice(0, 6).forEach((link) => {
                prefetchUrl(new URL(link.href, window.location.href).toString());
            });
        }, { timeout: 1200 });
    }

    document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', () => {
            root.classList.add('is-page-loading');
        });
    });

    window.addEventListener('pageshow', () => {
        root.classList.remove('is-page-loading');
    });

    window.addEventListener('beforeunload', () => {
        root.classList.add('is-page-loading');
    });

    syncHeaderState();
    window.addEventListener('scroll', syncHeaderState, { passive: true });
});
