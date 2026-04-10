import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { orderService } from '@/domain/order/api';
import { useCartContext } from '@/domain/order/context/cart-context';
import { Button } from '@/shared/components/button';

export function OrderButton() {
	const navigate = useNavigate();
	const { items, totalPrice, clear } = useCartContext();

	const { mutate, isPending } = useMutation({
		mutationFn: orderService.createOrder,
		onSuccess: ({ orderId }) => {
			clear();
			navigate(`/orders/${orderId}`);
		},
		onError: (error) => {
			const message =
				error instanceof Error
					? error.message
					: '주문에 실패했습니다. 다시 시도해주세요.';
			toast.error(message);
		},
	});

	function handleOrder() {
		mutate({
			totalPrice,
			customerName: '고객',
			items: items.map((ci) => ({
				itemId: ci.item.id,
				quantity: ci.quantity,
				options: ci.options,
			})),
		});
	}

	return (
		<Button
			fullWidth
			size="lg"
			disabled={isPending}
			onClick={handleOrder}
		>
			{`${totalPrice.toLocaleString()}원 주문하기`}
		</Button>
	);
}
