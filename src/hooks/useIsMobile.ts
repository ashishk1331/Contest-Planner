import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 767) {
	const [isMobile, setIsMobile] = useState(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
	);

	useEffect(() => {
		const query = window.matchMedia(`(max-width: ${breakpoint}px)`);
		const onChange = (event: MediaQueryListEvent) =>
			setIsMobile(event.matches);
		setIsMobile(query.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, [breakpoint]);

	return isMobile;
}
