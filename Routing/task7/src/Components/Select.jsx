import { useEffect, useState } from "react";

export default function Select({ level, parent, state, setState }) {
  const [selected, setSelected] = useState('null');

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      currentLevel: selected === 'null' ? level : level + 1,
      currentParent: selected === 'null' ? parent : Number(selected),
    }));
  }, [selected, level, parent]);

  return (
    <>
      <select
        value={selected}
        onChange={(e) =>
          setSelected(e.target.value)
        }
      >
        <option value={'null'}>{level === 0 ? "Select Child" : "None"}</option>
        {state.nodeList
          .filter((item) => item.parent === parent && item.level === level)
          .map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.value}
              </option>
            );
          })}
      </select>

      {selected !== 'null' &&
      state.nodeList.filter(
        (item) => item.parent === Number(selected) && item.level === level + 1
      ).length ? (
        <Select
          level={level + 1}
          parent={Number(selected)}
          state={state}
          setState={setState}
        />
      ) : null}
    </>
  );
}
