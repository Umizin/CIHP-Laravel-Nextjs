"use client";
import { useState } from 'react';

interface CartaoDeMissaoProps {
    titulo: string;
    descricao: string;
    status: string;
}

export default function CartaoDeMissao({ titulo, descricao, status}: CartaoDeMissaoProps) {
    const [detalhesVisiveis, setDetalhesVisiveis] = useState(false);
    return (
        <div className="max-w-md border-gray-700 rounded-lg p-6 my-4 bg-gray-800 text-white shadow-lg">
            <h2 className="text-2xl font-bold text-cyan-400">{titulo}</h2>
            <p className="mt-2 text-gray-300">{descricao}</p>
            <button className='mt-4 bg-cyan-500 text-white px-3 py-1 rounded' onClick={() => setDetalhesVisiveis(!detalhesVisiveis)}>
                {detalhesVisiveis ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
            </button>
            <span className="mt-4 inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {status}
            </span>
        </div>
    );
}