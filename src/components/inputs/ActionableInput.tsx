import { ChangeEvent, useEffect, useState } from "react";
import { ActionableInputData, NodeHandler } from "../../constants/nodes";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

interface IProps {
  data: ActionableInputData;
  parentId: string;
}

type OptionsMap = Record<string, NodeHandler[]>;

export const ActionableInput = ({ data, parentId }: IProps) => {
  // consts
  const { ctas, input, value } = data;

  // states
  const [selOption, setSelOption] = useState(value);
  const [options, setOptions] = useState<OptionsMap>({});
  const [srcSteps, setSrcSteps] = useState<number[]>([]);
  const [tarSteps, setTarSteps] = useState<number[]>([]);

  // hooks
  const updateNodeInternals = useUpdateNodeInternals();

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

  function handleGenerateHandlerPositions(h: number) {
    const hndlrs = h;
    const res: number[] = [];
    const step = 100 / (hndlrs + 1);
    let interval = step;

    for (let i = 1; i <= hndlrs; i++) {
      res.push(interval);
      interval += step;
    }

    return res;
  }

  // effects
  useEffect(() => {
    handleTransformOptions();
  }, []);

  useEffect(() => {
    setSrcSteps(handleGenerateHandlerPositions(options[selOption]?.filter((h) => h.position === Position.Left).length));
    setTarSteps(
      handleGenerateHandlerPositions(options[selOption]?.filter((h) => h.position === Position.Right).length)
    );
  }, [selOption, options]);

  useEffect(() => {
    updateNodeInternals(parentId);
  }, [srcSteps, tarSteps]);

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
      {options[selOption]
        ?.filter((h) => h.position === Position.Left)
        .map((h, i) => (
          <Handle
            key={h.name + i}
            position={h.position}
            type={h.type}
            id={h.name + parentId}
            style={{
              top: srcSteps[i] + "%",
            }}
          />
        ))}
      {options[selOption]
        ?.filter((h) => h.position === Position.Right)
        .map((h, i) => (
          <Handle
            key={h.name + i}
            position={h.position}
            type={h.type}
            id={h.name + parentId}
            style={{
              top: tarSteps[i] + "%",
            }}
          />
        ))}
      {ctas.map((c, i) => (
        <button key={c + i}>{c}</button>
      ))}
    </div>
  );
};
