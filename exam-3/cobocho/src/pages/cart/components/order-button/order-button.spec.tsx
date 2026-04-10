import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestProvider } from '@/test/test-provider';
import { OrderButton } from './order-button';

const mockNavigate = vi.fn();
const mockClear = vi.fn();

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('@/domain/order/context/cart-context', () => ({
	useCartContext: vi.fn(),
}));

vi.mock('@/domain/order/api', () => ({
	orderService: {
		createOrder: vi.fn(),
	},
}));

import { useCartContext } from '@/domain/order/context/cart-context';
import { orderService } from '@/domain/order/api';

const mockItems = [
	{
		item: {
			id: 'americano',
			category: '커피' as const,
			title: '아메리카노',
			description: '',
			price: 4500,
			iconImg: '',
			optionIds: [1],
		},
		options: [{ optionId: 1, labels: ['HOT'] }],
		quantity: 2,
		unitPrice: 4500,
		totalPrice: 9000,
	},
];

function mockCart() {
	vi.mocked(useCartContext).mockReturnValue({
		items: mockItems,
		addItem: vi.fn(),
		removeItem: vi.fn(),
		updateQuantity: vi.fn(),
		clear: mockClear,
		totalQuantity: 2,
		totalPrice: 9000,
	});
}

beforeEach(() => {
	vi.clearAllMocks();
});

describe('OrderButton', () => {
	it('총 금액을 버튼에 표시한다', () => {
		mockCart();

		render(
			<TestProvider>
				<OrderButton />
			</TestProvider>,
		);

		expect(screen.getByRole('button')).toHaveTextContent('9,000원 주문하기');
	});

	it('클릭 시 주문 API를 호출하고 성공하면 장바구니를 비우고 주문 페이지로 이동한다', async () => {
		mockCart();
		vi.mocked(orderService.createOrder).mockResolvedValue({
			orderId: 'order-123',
		});

		const user = userEvent.setup();

		render(
			<TestProvider>
				<OrderButton />
			</TestProvider>,
		);

		await user.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(mockClear).toHaveBeenCalled();
		});
		expect(mockNavigate).toHaveBeenCalledWith('/orders/order-123');
	});

	it('주문 API 실패 시 clear와 navigate가 호출되지 않는다', async () => {
		mockCart();
		vi.mocked(orderService.createOrder).mockRejectedValue(
			new Error('잘못된 주문이에요.'),
		);

		const user = userEvent.setup();

		render(
			<TestProvider>
				<OrderButton />
			</TestProvider>,
		);

		await user.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(screen.getByRole('button')).not.toBeDisabled();
		});
		expect(mockNavigate).not.toHaveBeenCalled();
		expect(mockClear).not.toHaveBeenCalled();
	});

	it('주문 중 버튼이 비활성화된다', async () => {
		mockCart();
		let resolveOrder!: (value: { orderId: string }) => void;
		vi.mocked(orderService.createOrder).mockImplementation(
			() => new Promise((resolve) => { resolveOrder = resolve; }),
		);

		const user = userEvent.setup();

		render(
			<TestProvider>
				<OrderButton />
			</TestProvider>,
		);

		await user.click(screen.getByRole('button'));

		expect(screen.getByRole('button')).toBeDisabled();

		resolveOrder({ orderId: 'order-123' });
	});
});
