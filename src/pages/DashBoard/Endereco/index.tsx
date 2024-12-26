import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputForm } from '@/components/InputForm';

const formSchema = z.object({
    endereco: z.string().min(1, 'Endereço é obrigatório.'),
    cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido.'),
    complemento: z.string().optional(),
    pais: z.string().min(1, 'País é obrigatório.'),
    cidade: z.string().min(1, 'Cidade é obrigatória.'),
});

type FormData = z.infer<typeof formSchema>;

export function EnderecoDashboard() {
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const { handleSubmit } = methods;
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg" style={{ fontFamily: 'Times New Roman, serif', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)', borderTop: 'none', borderLeft: 'none' }}>
            <h1 className="text-3xl italic font-bold text-gray-800 mb-6">Endereços</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-1">Endereço</label>
                            <InputForm
                                name='endereco'
                                disabled={!isEditing}
                                placeholder='Endereço'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">CEP</label>
                            <InputForm
                                name='cep'
                                mask="99999-999"
                                disabled={!isEditing}
                                placeholder='CEP'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Complemento</label>
                            <InputForm
                                name='complemento'
                                disabled={!isEditing}
                                placeholder='Complemento'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">País</label>
                            <InputForm
                                name='pais'
                                type="text"
                                disabled={!isEditing}
                                placeholder='País'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Cidade</label>
                            <InputForm
                                name='cidade'
                                type="text"
                                placeholder='Cidade'
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#deb88a]"
                            >
                                Editar
                            </button>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-black rounded-lg bg-[#e5d2b8] hover:bg-[#deb88a]"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 text-white rounded-lg bg-gray-400 hover:bg-[#deb88a]"
                                >
                                    Cancelar
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
