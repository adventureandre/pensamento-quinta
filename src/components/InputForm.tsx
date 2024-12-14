import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

    name: string;
    disabled?: boolean;
}
export function InputForm({ name, disabled, ...props }: InputProps) {

    const { register, formState: { errors } } = useFormContext();

    return (<>
        <input
            {...register(name)}
            {...props}
        />
        {errors[name] && <p className="text-red-500 text-sm mt-1">{(errors[name] as any).message}</p>}
    </>
    )
}