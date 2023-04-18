export type InputType = {
  value: string;
  type: string;
  name: string;
  id: string;
  className: string;
  placeholder: string;
  htmlFor: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  labelContent: string;
  inputStyle?:React.CSSProperties;
};
