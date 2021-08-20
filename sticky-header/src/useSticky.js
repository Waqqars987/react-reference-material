import { useState, useEffect, useCallback, useRef } from 'react';

/**
 *
 * @param {*} customStickyElementRef [optional]: sticky element reference to be passed by the User
 * @param {*} customStickyContextRef [optional]: sticky context reference to be passed by the User
 * @returns {
 * isSticky: whether the concerned sticky element is in sticky state,
 * stickyElementRef [optional]: need to be referred to the element that has to be made sticky [returned only when customStickyElementRef is not passed by the User],
 * stickyContextRef [optional]: need to be referred to the sticky positioning context element [returned only when customStickyContextRef is not passed by the User,utilization is optional]
 * }
 */
const useSticky = (customStickyElementRef, customStickyContextRef) => {
	const [isSticky, setIsSticky] = useState(false);

	const implicitStickyElementRef = useRef(null);
	const implicitStickyContextRef = useRef(null);

	const stickyElementRef = customStickyElementRef || implicitStickyElementRef;
	const stickyContextRef = customStickyContextRef || implicitStickyContextRef;

	const handleScroll = useCallback(() => {
		const currentVerticalOffset = window.scrollY || window.pageYOffset;

		//default vertical offset limit is 50px
		const verticalOffsetLimit = stickyElementRef.current
			? stickyElementRef.current.getBoundingClientRect().bottom
			: 50;

		const shouldStick =
			(currentVerticalOffset > verticalOffsetLimit && !stickyContextRef.current) ||
			(currentVerticalOffset > verticalOffsetLimit &&
				currentVerticalOffset <=
					(stickyContextRef.current && stickyContextRef.current.scrollHeight));

		if (shouldStick) {
			!isSticky && setIsSticky(true);
		} else {
			isSticky && setIsSticky(false);
		}
	}, [isSticky, stickyElementRef, stickyContextRef]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return {
		isSticky,
		...(!customStickyElementRef && { stickyElementRef }),
		...(!customStickyContextRef && { stickyContextRef }),
	};
};

export default useSticky;
