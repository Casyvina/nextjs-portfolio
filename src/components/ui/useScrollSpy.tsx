import { useEffect, useState } from "react";

export function useScrollSpyWithUrl(sectionIds: string[], offset = 0) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActiveId(id);

                        // Update URL hash without scrolling
                        if (window.location.hash !== `#${id}`) {
                            history.replaceState(null, "", `#${id}`);
                        }
                    }
                });
            },
            {
                rootMargin: `-${offset}px 0px -40% 0px`,
                threshold: 0.5,
            }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            sectionIds.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
        };
    }, [sectionIds, offset]);

    return activeId;
}
