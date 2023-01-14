interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}
