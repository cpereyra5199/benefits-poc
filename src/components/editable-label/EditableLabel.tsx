export interface EditableLabelProps {
  isEditable: boolean;
  children: React.ReactNode;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditableLabel = ({
  isEditable,
  value,
  children,
  onChange,
}: EditableLabelProps) => {
  return isEditable ? (
    <input
      type="text"
      onChange={onChange}
      defaultValue={children?.toString()}
    />
  ) : (
    <span>{value}</span>
  );
};
