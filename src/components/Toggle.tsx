import { useEffect, useState } from "react";

interface Props<T> {
  value: T;
  checkedValue: T;
  uncheckedValue: T;
  setValue: (val: T) => void;
}

export function Toggle<T = string>({ value, checkedValue, uncheckedValue, setValue }: Props<T>) {
  const [checked, setChecked] = useState<boolean>(value === checkedValue);

  const labelStyle = {
    display: "inline-block",
    width: "40px",
    height: "20px",
    backgroundColor: "var(--text)",
    borderRadius: "20px",
    cursor: "pointer"
  }

  const toggleStyle = {
    display: "inline-block",
    width: "18px",
    height: "18px",
    backgroundColor: "var(--primary)",
    borderRadius: "18px",
    marginTop: "1px",
    marginLeft: "1px"
  }

  const checkedToggleStyle = {
    transform: "translateX(100%)",
  }
  useEffect(() => {
    setChecked(value === checkedValue);
  }, [value, checkedValue]);

  useEffect(() => {
    setValue(checked ? checkedValue : uncheckedValue);
  }, [checked, setValue, uncheckedValue, checkedValue]);

  return <div className="toggle" style={{ height: "20px" }}>
    <div className="dark-mode-toggle">
      <label className="disable-text-select transition" htmlFor="dark-mode-toggle"
        style={labelStyle}>
        <span className="toggle transition"
          style={!checked ? toggleStyle : { ...toggleStyle, ...checkedToggleStyle }}></span>
      </label>
      <input type="checkbox" name="dark-mode-toggle" id="dark-mode-toggle"
        checked={checked} onChange={() => setChecked(!checked)}
        style={{ display: "none" }} />
    </div>
  </div >
}
