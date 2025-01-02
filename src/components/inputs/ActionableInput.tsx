import { ChangeEvent, useEffect, useState } from "react";
import { ActionableInputData, NodeHandler } from "../../constants/nodes";
import { Handle } from "reactflow";

interface IProps {
  data: ActionableInputData;
}

type OptionsMap = Record<string, NodeHandler[]>;

export const ActionableInput = ({ data }: IProps) => {
  // consts
  const { ctas, input, value } = data;

  // states
  const [selOption, setSelOption] = useState(value);
  const [options, setOptions] = useState<OptionsMap>({});

  // handlers
  function handleOnOptionSelect(e: ChangeEvent<HTMLSelectElement>) {
    setSelOption(e.target.value);
  }

  function handleTransformOptions() {
    const tmp: OptionsMap = {};

    for (const ele of input.options) {
      tmp[ele.optionName] = ele.handlers;
    }

    setOptions(tmp);
  }

  // effects
  useEffect(() => {
    handleTransformOptions();
  }, []);

  console.log({ data, options, selOption });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <select
        name={input.label.toLowerCase()}
        id={input.label.toLowerCase()}
        onChange={handleOnOptionSelect}
        value={selOption}
      >
        {input.options.map((op, i) => (
          <option key={op.optionName + i} value={op.optionName.toLowerCase()}>
            {op.optionName}
          </option>
        ))}
      </select>
      {options[selOption]?.map((h, i) => (
        <Handle key={h.name + i} position={h.position} type={h.type} id={h.name} />
      ))}
      {ctas.map((c, i) => (
        <button key={c + i}>{c}</button>
      ))}
    </div>
  );
};
