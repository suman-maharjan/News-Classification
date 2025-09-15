import { useState } from "react";

type TOption = {
  id: string;
  value: string;
};

type TDropdownProps = {
  options: TOption[];
  onClick: (option: TOption) => void;
  label?: string;
  defaultValue?: TOption;
};

const Dropdown = ({
  label,
  options,
  onClick,
  defaultValue = options?.[0],
}: TDropdownProps) => {
  const [value, setValue] = useState<TOption>(defaultValue);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      {label && label + ": "}
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1"
          onClick={() => setOpen(true)}
        >
          {value?.value || ""}
        </div>
        {open && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow bottom-0"
          >
            {options.map((option) => {
              return (
                <li
                  onClick={() => {
                    onClick?.(option);
                    setValue(option);
                    setOpen(false);
                  }}
                  className="p-4 cursor-pointer text-white"
                  key={option.id}
                >
                  {option.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
