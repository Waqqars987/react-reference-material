import { useState, useEffect, useCallback, useRef } from 'react';

const useSticky = targetElemRef => {
	const [sticky, setSticky] = useState(false);
	const stickyContextElemRef = useRef(null);

	const handleScroll = useCallback(() => {
		const offset = window.scrollY;
		const offsetLimit = targetElemRef?.current?.scrollHeight || 50;

		const shouldStick =
			(offset > offsetLimit && !stickyContextElemRef.current) ||
			(offset > offsetLimit && offset <= stickyContextElemRef.current.scrollHeight);

		if (shouldStick) {
			!sticky && setSticky(true);
		} else {
			sticky && setSticky(false);
		}
	}, [sticky, targetElemRef]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return { sticky, stickyContextElemRef };
};
export default useSticky;
