import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

export function InicioDashboard() {
    const [formData, setFormData] = useState({
        fullName: 'Nome Completo',
        username: 'Nome de Usuário',
        email: 'E-mail',
        phone: '+55 (xx) xxxxx-xxxx',
        birthDate: 'Data de Nascimento',
        cpf: 'CPF',
        password: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const fileData = JSON.stringify(formData, null, 2);
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
        <div className="w-full max-w-4xl p-9 bg-[#ffffff] rounded-lg" style={{ fontFamily: 'Times New Roman, serif', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)', borderTop: 'none', borderLeft: 'none' }}>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Dados Pessoais</h1>

            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 mb-3"></label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-3"></label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-3"></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-3"></label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-3"></label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64]"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-3"></label>
                        <input
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#d9dbc8] text-[#6c6d64]"
                        />
                    </div>
                </div>

                <hr className="border-gray-300 my-4" />

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Minha senha</h1>
                    <div className="relative">
                        <input
                            id="hs-toggle-password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="py-2 px-3 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none bg-[#d9dbc8]"
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
                                <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22" />
                                <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-6 py-2 bg-[#e5d2b8] text-gray-800 rounded-lg hover:bg-[#d4bfa3] focus:outline-none"
                    >
                        {isEditing ? 'Cancelar' : 'Editar'}
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={!isEditing}
                        className="px-6 py-2 bg-[#e5d2b8] text-gray-800 rounded-lg hover:bg-[#d4bfa3] focus:outline-none"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
    
