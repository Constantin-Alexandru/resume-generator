import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup
} from "./ui/select";

type StringCompatibility<T> = {
  toString(): string;
  new(input: string): T;
}

interface SelectProps<T extends StringCompatibility<T> | string> {
  value: T;
  setValue: (value: T) => void;
  options: T[];
  icons?: React.ReactNode[];
}


export function Dropdown<T extends StringCompatibility<T> | string>({ value, setValue, options, icons }: SelectProps<T>) {
  return <div className="dropdown" style={{ width: "180px" }}>
    <Select defaultValue={value.toString()}
      onValueChange={(value) => setValue(value as unknown as T)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem value={option.toString()} key={option.toString()}>
              <div style={{ display: "flex", gap: "10px" }}>
                {icons && icons.length > index && icons[index]}{option.toString()}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
}
