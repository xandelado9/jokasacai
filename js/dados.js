/* ============================================================
   DADOS DO SITE - edite só este arquivo
   Tudo aqui é GENÉRICO/PROVISÓRIO. Troque pelos dados reais.
   ============================================================ */

const LOJA = {
  nome: "Joka's",
  sobrenome: "açaí",
  // TROCAR: número real com DDI+DDD, só dígitos. Ex.: 5511987654321
  whatsapp: "5511999999999",
  instagram: "https://www.instagram.com/jokas_acai",
  instagramHandle: "@jokas_acai",
  endereco: "Rua Exemplo, 123 — Centro",
  cidade: "Sua Cidade — UF",
  horarios: [
    { dias: "Terça a sexta", horas: "14h às 22h" },
    { dias: "Sábado e domingo", horas: "13h às 23h" },
    { dias: "Segunda", horas: "fechado" }
  ],
  entrega: {
    taxa: 5.0,
    tempo: "30 a 45 min",
    gratisAcima: 40.0
  },
  // quantos complementos grátis cada item aceita, quando o item não define o seu
  limiteComplementos: 3
};

/* camadas: montagem SUGERIDA, desenhada de cima para baixo no corte do copo.
   O desenho se remonta sozinho quando o cliente escolhe os complementos.
   ingredientes válidos: acai, granola, banana, leite, pacoca, morango, calda
   limite: máximo de complementos grátis do item (se omitido, usa LOJA.limiteComplementos) */
const CARDAPIO = [
  {
    id: "t300",
    nome: "Tigela 300ml",
    descricao: "Açaí puro batido na hora.",
    preco: 14.9,
    camadas: ["granola", "banana", "acai"]
  },
  {
    id: "t500",
    nome: "Tigela 500ml",
    descricao: "O tamanho que quase todo mundo pede.",
    preco: 19.9,
    destaque: "mais pedido",
    camadas: ["leite", "granola", "banana", "acai"]
  },
  {
    id: "t700",
    nome: "Tigela 700ml",
    descricao: "Para quem chega com fome de verdade.",
    preco: 24.9,
    camadas: ["morango", "leite", "granola", "banana", "acai"]
  },
  {
    id: "c400",
    nome: "Copo 400ml",
    descricao: "Com tampa, para levar na mão.",
    preco: 17.9,
    camadas: ["pacoca", "granola", "acai"]
  },
  {
    id: "b1000",
    nome: "Barca 1 litro",
    descricao: "Dá para dividir entre duas ou três pessoas.",
    preco: 39.9,
    camadas: ["morango", "calda", "leite", "granola", "banana", "acai"]
  }
];

const COMPLEMENTOS = [
  { nome: "Granola", ing: "granola" },
  { nome: "Banana", ing: "banana" },
  { nome: "Leite em pó", ing: "leite" },
  { nome: "Paçoca", ing: "pacoca" },
  { nome: "Amendoim", ing: "pacoca" },
  { nome: "Aveia", ing: "granola" },
  { nome: "Mel", ing: "calda" },
  { nome: "Leite condensado", ing: "leite" }
];

const ADICIONAIS = [
  { nome: "Morango", preco: 3.0, ing: "morango" },
  { nome: "Kiwi", preco: 3.0, ing: "banana" },
  { nome: "Nutella", preco: 5.0, ing: "calda" },
  { nome: "Ovomaltine", preco: 4.0, ing: "granola" },
  { nome: "Bis picado", preco: 3.0, ing: "calda" },
  { nome: "Bola de sorvete", preco: 4.0, ing: "leite" }
];
