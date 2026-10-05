import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * this is a hook made for the Shadcn/UI Sidebar component
 */
export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(() =>
        typeof window === 'undefined'
            ? false
            : window.innerWidth < MOBILE_BREAKPOINT
    );

    React.useEffect(() => {
        const mql = window.matchMedia(
            `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
        );
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, []);

    return !!isMobile;
}
