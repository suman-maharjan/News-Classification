import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const EmailField = ({
  control,
  name,
  placeholder,
  className,
}: {
  className?: string;
  control: Control<any>;
  name: string;
  placeholder: string;
}) => {
  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <input
                type="email"
                className="flex-1 px-6 py-2 rounded-lg text-white border-2 border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-white" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EmailField;
