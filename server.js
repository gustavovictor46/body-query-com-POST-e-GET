// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const {bruxos, varinhas, pocoes, animais} = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Aqui vão todas suas Rotas
// Query Parameters no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

//Body - Adicionar ou editar o bruxo, e ele é o corpo da requisição

app.use(express.json()); //Middleware obrigatório!

app.post("/bruxos", (req, res) => {
    const {nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body;

    if (!nome || !casa || !ano || !vivo) {
        return res.status(400).json({
            success: false,
            message: "Nome, casa, ano e estar vivo são obrigatórios para um bruxo!"
        });
    };

// Crio um novo bruxo com os dados de body
    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha || "Ainda não definida", 
        mascote: mascote || "Ainda não definido",
        patrono: patrono || "Ainda não definido",
        especialidade: especialidade || "Em desenvolvimento",
        vivo: vivo
    };

    // Adicionar à lista de bruxos
    bruxos.push(novoBruxo);

    res.status(201).json({
        succsess: true,
        message: "Novo bruxo adiconado a Hogwarts!",
        data: novoBruxo
    });
});

app.get('/varinhas', (req, res) => {
  const { material, nucleo, comprimento} = req.query;
  let resultado = varinhas;

  if (material) {
    resultado = resultado.filter(v => v.material.toLowerCase() === material.toLowerCase());
  }

  if (nucleo) {
    resultado = resultado.filter(v => v.nucleo == nucleo);
  }

  if (comprimento) {
    resultado = resultado.filter(v => v.comprimento.toLowerCase().includes(comprimento.toLowerCase()));
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado
  });
});

app.post("/varinhas", (req, res) => {
  const {material, nucleo, comprimento} = req.body;

  if (!material || !nucleo || !comprimento) {
      return res.status(400).json({
          success: false,
          message: "Material, nucleo, comprimento são obrigatórios para uma varinhas!"
      });
  };

// Cria uma varinha com os dados de body
  const novaVarinha = {
      id: varinhas.length + 1,
      material: material || "Ainda não definido", 
      nucleo: nucleo || "Ainda não definido",
      comprimento: comprimento || "Ainda não definido",
  };

  // Adicionar à lista de varinhas
  varinhas.push(novaVarinha);

  res.status(201).json({
      succsess: true,
      message: "Nova varinha adiconada!",
      data: novaVarinha
  });
});

app.get('/pocoes', (req, res) => {
  const { nome, efeito} = req.query;
  let resultado = pocoes;

  if (nome) {
    resultado = resultado.filter(p => p.nome.toLowerCase() === nome.toLowerCase());
  }

  if (efeito) {
    resultado = resultado.filter(p => p.efeito.toLowerCase().includes(efeito.toLowerCase()));
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado
  });
});

app.get('/animais', (req, res) => {
  const { nome, tipo} = req.query;
  let resultado = animais;

  if (nome) {
    resultado = resultado.filter(a => a.nome.toLowerCase() === nome.toLowerCase());
  }

  if (tipo) {
    resultado = resultado.filter(a => a.tipo.toLowerCase().includes(tipo.toLowerCase()));
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado
  });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});