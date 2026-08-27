import React, { useState } from 'react';
import dayjs from 'dayjs';
import { clienteService } from '../../services/ClienteService';
import type Cliente from '../../models/Cliente';
 

export function FormCliente() {
  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: ''
  });

  const [erro, setErro] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    //  Calcula a idade exata usando Day.js
    const idade = dayjs().diff(dayjs(cliente.dataNascimento), 'year');

    // Trava o envio se tiver menos de 18 anos
    if (isNaN(idade) || idade < 18) {
      setErro('O cliente deve ser maior de idade (mínimo 18 anos).');
      return; // Aborta a execução para não disparar a API
    }

    try {
      // Envia os dados para a Service com Axios se for maior de idade
      const novoCliente = await clienteService.cadastrar(cliente);
      alert(`Cliente ${novoCliente.nome} cadastrado com sucesso!`);
      
      // Reseta o formulário
      setCliente({ nome: '', dataNascimento: '', cpf: '', email: '' });
    } catch (err) {
      console.error("Erro ao cadastrar cliente:", err);
      setErro('Erro ao cadastrar cliente na API.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input 
          type="text" 
          name="nome" 
          value={cliente.nome} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Data de Nascimento:</label>
        <input 
          type="date" 
          name="dataNascimento" 
          value={cliente.dataNascimento} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>CPF (Apenas números):</label>
        <input 
          type="text" 
          name="cpf" 
          value={cliente.cpf} 
          onChange={handleChange} 
          maxLength={11} 
          required 
        />
      </div>

      <div>
        <label>E-mail:</label>
        <input 
          type="email" 
          name="email" 
          value={cliente.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

      <button type="submit">Cadastrar Cliente</button>
    </form>
  );
}