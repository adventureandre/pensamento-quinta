import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeSlash } from 'phosphor-react';
import { InputForm } from '@/components/InputForm';

const formSchema = z.object({
    fullName: z.string().min(1, 'Nome completo é obrigatório.'),
    username: z.string().min(1, 'Nome de usuário é obrigatório.'),
    email: z.string().email('E-mail inválido.'),
    phone: z.string().regex(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Telefone inválido.'),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento inválida.'),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido.').transform(value => value.replace(/\D/g, '')),  // Remove máscara
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.'),
});

type FormData = z.infer<typeof formSchema>;

export function DadosPessoaisDashboard() {
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const { handleSubmit } = methods;
    const [isEditing, setIsEditing] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg" style={{ fontFamily: 'Times New Roman, serif', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)', borderTop: 'none', borderLeft: 'none' }}>
            <h1 className="text-3xl font-bold italic text-gray-800 mb-6">Dados Pessoais</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <label className="block text-gray-700 mb-1">
                            <InputForm name='fullName' disabled={!isEditing} placeholder='Nome Completo' />
                        </label>
                        <label className="block text-gray-700 mb-1">
                            <InputForm name='username' disabled={!isEditing} placeholder='Nome de Usuário' />
                        </label>
                        <label className="block text-gray-700 mb-1">
                            <InputForm type='email' name='email' disabled={!isEditing} placeholder='E-mail' />
                        </label>
                        <label className="block text-gray-700 mb-1">
                            <InputForm name='phone' type='text' mask="(99) 99999-9999" disabled={!isEditing} placeholder='(xx)xxxxx-xxxx' />
                        </label>
                        <label className="block text-gray-700 mb-1">
                            <InputForm name='birthDate' type="date" disabled={!isEditing} />
                        </label>
                        <label className="block text-gray-700 mb-1">
                            <InputForm name='cpf' type="text" mask="999.999.999-99" placeholder='CPF' disabled={!isEditing} />
                        </label>
                    </div>
                    <hr className="border-gray-300 my-6" />
                    <div className="mb-9">
                        <h1 className="text-2xl italic font-bold text-gray-800 mb-6">Minha Senha</h1>
                        <div className="flex flex-col relative">
                            <InputForm name='password' type={passwordVisible ? 'text' : 'password'} disabled={!isEditing} placeholder="Digite sua senha" />
                            <button 
                            type="button" 
                            className=" mr-2 flex h-full float-right absolute right-1 mt-2"
                            onClick={togglePasswordVisibility}>
                                {passwordVisible ? <Eye size={22} /> : <EyeSlash size={22} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        {!isEditing ? (
                            <button type="button" onClick={() => setIsEditing(true)} className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#deb88a]">Editar</button>
                        ) : (
                            <>
                                <button type="submit" className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#deb88a]">Salvar</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 text-white rounded-lg bg-gray-400 hover:bg-[#deb88a]">Cancelar</button>
                            </>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
