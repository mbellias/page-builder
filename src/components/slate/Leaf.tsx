import { CustomText } from '../../lib/slate-types';

export const Leaf: React.FC<{
  attributes: any;
  children: React.ReactNode;
  leaf: CustomText;
}> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return (
    <span
      {...attributes}
      style={{ color: leaf.color, fontSize: leaf.size }}
    >
      {children}
    </span>
  );
};
