import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
} from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '@suspensive/react';

export const QueryErrorBoundary = forwardRef<
	ComponentRef<typeof ErrorBoundary>,
	ComponentPropsWithoutRef<typeof ErrorBoundary>
>((props, ref) => {
	const { reset } = useQueryErrorResetBoundary();

	return (
		<ErrorBoundary
			ref={ref}
			onReset={reset}
			{...props}
		/>
	);
});

QueryErrorBoundary.displayName = 'QueryErrorBoundary';
