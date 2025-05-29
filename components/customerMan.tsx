import React from 'react';
import { FaWhatsapp } from "react-icons/fa";

const clients = [
  { id: 1, name: 'João Silva', phone: '+5511999999999' },
  { id: 2, name: 'Maria Oliveira', phone: '+5511888888888' },
  { id: 3, name: 'Carlos Souza', phone: '+5511777777777' },
];

export const CustomerMan = () => {
  return (
    <div className="p-6 bg-lightbackground rounded-lg shadow-md min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Clientes Agendados</h1>
      <ul className="space-y-4">
        {clients.map(client => (
          <li
            key={client.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
          >
            <div className='flex flex-col'>
            <span className="text-lg font-medium text-gray-700">{client.name}</span>
            <span className="text-sm font-ligh text-slate-400">{client.phone}</span>
            </div>
            <a
              href={`https://wa.me/${client.phone.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              <FaWhatsapp />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

