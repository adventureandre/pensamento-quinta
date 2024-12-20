import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { useHookFormMask } from 'use-mask-input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask?: string;
  disabled?: boolean;
}

export function InputForm({ name, mask, disabled, ...props }: InputProps) {
  const { register, formState: { errors } } = useFormContext();

  const registerWithMask = useHookFormMask(register);

  return (
    <>
      {mask ? (
        <input
          {...registerWithMask(name, mask, {
            required: true
          })}
          {...props}
        className="w-full py-2 px-3 block w-full border rounded-xl text-sm focus:outline-none focus:border-[#566150] focus:ring-blue-500 bg-[#d9dbc8]"/>
      ) : (
        <input
          {...register(name)}
          {...props}
          className="w-full py-2 px-3 block w-full border rounded-xl text-sm focus:outline-none focus:border-[#566150] focus:ring-blue-500 bg-[#d9dbc8]"/>
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name] as any).message}
        </p>
      )}
    </>
  );
}
