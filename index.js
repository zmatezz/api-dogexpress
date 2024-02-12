// No seu arquivo index.js ou onde você estiver configurando suas rotas

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conectando ao MongoDB
mongoose.connect(
  "mongodb+srv://matheusguedescosta:o9Jn6NldUDxYwREH@cluster0.g5xxpzc.mongodb.net/dev"
);

// Verificar se a conexão foi estabelecida com sucesso
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro ao conectar ao MongoDB:"));
db.once("open", () => {
  console.log("Conexão com o MongoDB estabelecida com sucesso");
});

// Definindo o esquema (schema) para os lanches
const lancheSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    imagem: String,
    preco: {
      type: Number,
      required: true,
    },
    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const categoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  changeMeat: Boolean,
});

// Criando o modelo (model) para os lanches
const Lanche = mongoose.model("product", lancheSchema);

// Criar o modelo da categoria
const Categoria = mongoose.model("Categoria", categoriaSchema);

// Rota para criar uma nova categoria
app.post("/categorias", async (req, res) => {
  try {
    const novaCategoria = await Categoria.create(req.body);
    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    res.status(500).json({ erro: "Ocorreu um erro ao criar a categoria." });
  }
});

// Rota para obter todas as categorias
app.get("/categorias", async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    console.error("Erro ao obter categorias:", error);
    res.status(500).json({ erro: "Ocorreu um erro ao obter as categorias." });
  }
});

// Rota para obter categorias para seleção de produto
app.get("/categorias/selecao", async (req, res) => {
  try {
    const categorias = await Categoria.find({}, "nome");
    res.json(categorias);
  } catch (error) {
    console.error("Erro ao obter categorias para seleção:", error);
    res
      .status(500)
      .json({ erro: "Ocorreu um erro ao obter as categorias para seleção." });
  }
});

lancheSchema.pre("save", async function (next) {
  try {
    const categoria = await Categoria.findById(this.categoriaId);
    if (categoria) {
      this.categoria = categoria.nome;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Rota para inserir um novo lanche
// Rota para inserir um novo lanche
app.post("/product", async (req, res) => {
  try {
    const { titulo, descricao, imagem, preco, categoria } = req.body;

    // Verifica se a categoria fornecida é válida
    const categoriaExistente = await Categoria.findById(categoria);
    if (!categoriaExistente) {
      return res.status(400).json({ erro: "Categoria inválida." });
    }

    // Crie um novo objeto de lanche com o campo categoriaId
    const novoLanche = await Lanche.create({
      titulo,
      descricao,
      imagem,
      preco,
      categoriaId: categoria, // Use o campo correto
      categoria: categoriaExistente.nome, // Salva o nome da categoria
    });

    console.log("Novo lanche criado:", novoLanche);
    res.status(201).json(novoLanche);
  } catch (error) {
    console.error("Erro ao inserir o lanche:", error);
    res.status(500).json({ erro: "Ocorreu um erro ao inserir o lanche." });
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
