import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    fullName: z.string().min(1, 'Nome completo é obrigatório.'),
    username: z.string().min(1, 'Nome de usuário é obrigatório.'),
    email: z.string().email('E-mail inválido.'),
    phone: z.string().regex(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Telefone inválido.'),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento inválida.'),
    cpf: z.string().length(11, 'CPF deve ter 11 caracteres.'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.'),
});

type FormData = z.infer<typeof formSchema>;

export function InicioDashboard() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const [isEditing, setIsEditing] = useState(false);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const fileData = JSON.stringify(data, null, 2);
        const blob = new Blob([fileData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dados_pessoais.json';
        link.click();
        URL.revokeObjectURL(url);
        setIsEditing(false);
    };

    return (
        <div className="w-full max-w-4xl p-8 bg-[#ffffff] rounded-lg" style={{ fontFamily: 'Times New Roman, serif', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)', borderTop: 'none', borderLeft: 'none' }}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dados Pessoais</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 mb-1"></label>
                        <input
                            type="text"
                            value='Nome Completo'
                            {...register('fullName')}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64] ${errors.fullName ? 'border-red-500' : ''}`}
                        />
                        {errors.fullName?.message && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1"></label>
                        <input
                            type="text"
                            value='Nome de Usuário'
                            {...register('username')}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64] ${errors.username ? 'border-red-500' : ''}`}
                        />
                        {errors.username?.message && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1"></label>
                        <input
                            type="email"
                            value='E-mail'
                            {...register('email')}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64] ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email?.message && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1"></label>
                        <input
                            type="text"
                            value='+xx(xx)xxxxx-xxxx'
                            {...register('phone')}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64] ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone?.message && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1"></label>
                        <input
                            type="date"
                            {...register('birthDate')}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64] ${errors.birthDate ? 'border-red-500' : ''}`}
                        />
                        {errors.birthDate?.message && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1"></label>
                        <input
                            type="text"
                            value='CPF'
                            {...register('cpf')}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64] ${errors.cpf ? 'border-red-500' : ''}`}
                        />
                        {errors.cpf?.message && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
                    </div>
                </div>

                <hr className="border-gray-300 my-6" />

                <div className="mb-9">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Minha Senha</h1>
                    <div className="relative">
                        <input
                            id="hs-toggle-password"
                            type="password"
                            {...register('password')}
                            disabled={!isEditing}
                            className={`py-2 px-3 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 bg-[#d9dbc8] ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="Digite sua senha"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
                            onClick={() => {
                                const passwordInput = document.getElementById('hs-toggle-password') as HTMLInputElement;
                                if (passwordInput) {
                                    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                                }
                            }}
                        >
                            <svg
                                className="shrink-0 size-3.5"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        </button>
                    </div>
                    {errors.password?.message && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="flex justify-end space-x-4">
                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#d1bda0]"
                        >
                            Editar
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#d1bda0]"
                            >
                                Salvar
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 text-white rounded-lg bg-gray-400 hover:bg-gray-500"
                            >
                                Cancelar
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

