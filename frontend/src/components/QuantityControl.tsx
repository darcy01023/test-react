type QuantityControlProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrement}
        className="flex h-8 w-8 items-center justify-center rounded border bg-[#F6D8BD] hover:cursor-pointer"
        aria-label="Retirer un produit"
      >
        -
      </button>

      <span className="min-w-6 text-center text-white">{quantity}</span>

      <button
        type="button"
        onClick={onIncrement}
        className="flex h-8 w-8 items-center justify-center rounded border bg-[#F6D8BD] hover:cursor-pointer"
        aria-label="Ajouter un produit"
      >
        +
      </button>
    </div>
  );
}