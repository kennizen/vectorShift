import { SimpleInputData } from "../../constants/nodes";
import { AutoHeightTextArea } from "../AutoHeightTextArea";
import { Handler } from "../Handler";

interface IProps {
  data: SimpleInputData;
}

export const TextInput = ({ data }: IProps) => {
  // consts
  const { input, value, handlers } = data;

  return (
    <div>
      <AutoHeightTextArea
        id={input.label.toLowerCase()}
        name={input.label.toLowerCase()}
        value={value}
        onChange={() => {}}
      />
      <Handler handlers={handlers} />
    </div>
  );
};
