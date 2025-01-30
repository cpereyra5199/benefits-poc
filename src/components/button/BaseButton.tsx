import "./BaseButton.css";

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  classNames?: string;
}

export const BaseButton = ({ onClick, children, classNames }: ButtonProps) => {
  return (
    <button className={`${classNames || ""} base-button`} onClick={onClick}>
      {children}
    </button>
  );
};
