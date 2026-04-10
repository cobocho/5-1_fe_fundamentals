import { useCartContext } from '@/domain/order/context/cart-context';
import { cartItemKey } from '@/domain/order/context/cart-context/cart-context.lib';
import { VStack } from '@/shared/components/layout';
import { CartItem } from './components/cart-item';
import { EmptyCart } from './components/empty-cart';
import { OrderButton } from './components/order-button';
import { CtaArea } from '@/shared/components/cta-area';

export function CartPage() {
	const { items, removeItem, updateQuantity } = useCartContext();

	const isEmpty = items.length === 0;

	return (
		<div className="pb-24">
			<div className="border-b border-gray-200 p-4">
				<h1 className="text-lg font-bold">장바구니</h1>
			</div>

			{isEmpty ? (
				<EmptyCart />
			) : (
				<VStack gap={0}>
					{items.map((cartItem) => (
						<CartItem
							key={cartItemKey(cartItem.item.id, cartItem.options)}
							cartItem={cartItem}
							onRemove={removeItem}
							onUpdateQuantity={updateQuantity}
						/>
					))}
				</VStack>
			)}

			{!isEmpty && (
				<CtaArea>
					<OrderButton />
				</CtaArea>
			)}
		</div>
	);
}
