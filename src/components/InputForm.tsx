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
        />
      ) : (
        <input
          {...register(name)}
          {...props}
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name] as any).message}
        </p>
      )}
    </>
  );
}
