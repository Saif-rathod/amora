import Image from "next/image";
import { Button } from "./button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  const handleIncrement = () => {
    onUpdateQuantity?.(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity?.(id, quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove?.(id);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 truncate">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">₹{price.toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-gray-900"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-gray-900"
            onClick={handleIncrement}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-600"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
