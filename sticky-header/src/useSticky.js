import { useState, useEffect, useCallback, useRef } from 'react';

/**
 *
 * @returns {
 * isSticky: whether the concerned sticky element is in sticky state
 * stickyElementRef: need to be referred to the element that has to be made sticky
 * stickyContextRef: need to be referred to the sticky positioning context element (usage is optional)
 * }
 */
const useSticky = () => {
	const [isSticky, setIsSticky] = useState(false);
	const stickyElementRef = useRef(null);
	const stickyContextRef = useRef(null);

	const handleScroll = useCallback(() => {
		const currentVerticalOffset = window.scrollY;
		const verticalOffsetLimit = stickyElementRef?.current?.getBoundingClientRect().bottom || 50; //default vertical offset limit is 50px

		const shouldStick =
			(currentVerticalOffset > verticalOffsetLimit && !stickyContextRef.current) ||
			(currentVerticalOffset > verticalOffsetLimit &&
				currentVerticalOffset <= stickyContextRef.current.scrollHeight);

		if (shouldStick) {
			!isSticky && setIsSticky(true);
		} else {
			isSticky && setIsSticky(false);
		}
	}, [isSticky, stickyElementRef]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return { isSticky, stickyElementRef, stickyContextRef };
};

export default useSticky;
