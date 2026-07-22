export default function Button({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-archivo cursor-pointer border px-2 font-bold"
    >
      {children}
    </button>
  );
}
