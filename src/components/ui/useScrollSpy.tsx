import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 0) {
    const [activeId, setActiveId] = useState<string | null>(ids[0] || null);

    useEffect(() => {
        const handleScroll = () => {
            let current: string | null = null;

            ids.forEach((id) => {
                const el = document.getElementById(id);
                if (!el) return;

                const rect = el.getBoundingClientRect();
                const viewHeight = window.innerHeight || document.documentElement.clientHeight;

                // Check how much of element is visible
                const visible =
                    Math.max(0, Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0));

                const ratio = visible / rect.height;

                if (ratio > 0.5) {
                    current = id;
                }
            });

            if (current && current !== activeId) {
                setActiveId(current);

                // Only update hash if it's really a new section
                window.history.replaceState(null, "", `#${current}`);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // run on mount

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [ids, activeId, offset]);

    return activeId;
}
