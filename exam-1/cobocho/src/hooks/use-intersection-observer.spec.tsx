import { render, screen } from '@testing-library/react';
import { simulateIntersection } from '../test/setup';
import { useIntersectionObserver } from './use-intersection-observer';

const TestComponent = ({ onIntersect }: { onIntersect: () => void }) => {
	const ref = useIntersectionObserver(onIntersect);
	return <div ref={ref} data-testid="sentinel" />;
};

describe('useIntersectionObserver', () => {
	it('요소가 뷰포트에 진입하면 callback을 호출한다', () => {
		const callback = vi.fn();
		render(<TestComponent onIntersect={callback} />);

		simulateIntersection(true);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('요소가 뷰포트 밖이면 callback을 호출하지 않는다', () => {
		const callback = vi.fn();
		render(<TestComponent onIntersect={callback} />);

		simulateIntersection(false);

		expect(callback).not.toHaveBeenCalled();
	});

	it('언마운트 시 observer가 disconnect 된다', () => {
		const callback = vi.fn();
		const { unmount } = render(<TestComponent onIntersect={callback} />);

		unmount();

		simulateIntersection(true);
		expect(callback).not.toHaveBeenCalled();
	});

	it('sentinel 요소에 ref가 연결된다', () => {
		const callback = vi.fn();
		render(<TestComponent onIntersect={callback} />);

		expect(screen.getByTestId('sentinel')).toBeInTheDocument();
	});
});
