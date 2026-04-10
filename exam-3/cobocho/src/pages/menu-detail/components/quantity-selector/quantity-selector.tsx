import { HStack } from '@/shared/components/layout';

interface QuantitySelectorProps {
	quantity: number;
	onChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
	return (
		<HStack justify="between" className="py-2">
			<span className="text-sm font-medium text-gray-700">수량</span>
			<HStack gap={3}>
				<button
					type="button"
					className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30"
					disabled={quantity <= 1}
					onClick={() => onChange(quantity - 1)}
				>
					-
				</button>
				<span className="w-8 text-center text-sm font-medium">{quantity}</span>
				<button
					type="button"
					className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-30"
					disabled={quantity >= 99}
					onClick={() => onChange(quantity + 1)}
				>
					+
				</button>
			</HStack>
		</HStack>
	);
}
