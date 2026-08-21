# Joka's Açaí — site

Site estático (HTML + CSS + JS puro). Sem build, sem dependências.

## Arquivos

```
index.html         estrutura da página
css/estilo.css     todo o visual (tokens no topo do arquivo)
js/dados.js        <- É AQUI QUE VOCÊ EDITA cardápio, preços e contatos
js/app.js          monta a página a partir de dados.js
```

## O que precisa ser trocado (dados provisórios)

Tudo em `js/dados.js` é genérico. Substitua:

| Campo | Onde | Hoje |
|---|---|---|
| `whatsapp` | `LOJA.whatsapp` | `5511999999999` — **obrigatório trocar**, senão o botão não funciona |
| `endereco`, `cidade` | `LOJA` | "Rua Exemplo, 123" |
| `horarios` | `LOJA.horarios` | horários inventados |
| `entrega` | `LOJA.entrega` | taxa R$ 5, grátis acima de R$ 40 |
| Cardápio e preços | `CARDAPIO` | 5 tamanhos inventados |
| Complementos | `COMPLEMENTOS` e `ADICIONAIS` | lista comum de açaíteria |
| Limite de complementos | `LOJA.limiteComplementos` | 3 para todos os tamanhos |

### Limite de complementos

Hoje todo item aceita **até 3** complementos grátis (`LOJA.limiteComplementos`).
Se o Joka's cobrar por tamanho (ex.: 300ml leva 2, a barca leva 5), basta
adicionar `limite:` no item, que ele passa a valer só ali:

```js
{ id: "b1000", nome: "Barca 1 litro", preco: 39.9, limite: 5, camadas: [...] }
```

Quem escolhe além do limite não é bloqueado com mensagem de erro: os
complementos restantes ficam desabilitados e o painel avisa que é preciso
desmarcar um para trocar.

O Instagram (`https://www.instagram.com/jokas_acai`) já é o real.

Formato do WhatsApp: DDI + DDD + número, só dígitos. Ex.: `5511987654321`.

## Como ver no navegador

Duplo clique em `index.html` já funciona. Para testar como um site de verdade:

```
python -m http.server 8765
```

e abra `http://127.0.0.1:8765`.

## Como publicar (grátis)

Arraste a pasta inteira em https://app.netlify.com/drop — o site sobe na hora
com um endereço público. Depois é só apontar um domínio próprio, se quiser.

## Decisões de design (para não desmontar sem querer)

- **Paleta**: fundo roxo-quase-preto (a polpa), texto creme, e amarelo banana
  usado **só** na ação principal e no foco do teclado. Se o amarelo começar a
  aparecer em vários lugares, ele perde a função de indicar o que clicar.
- **Assinatura**: o desenho ao lado de cada item é o corte do copo — as camadas
  representam os complementos, e o desenho **se remonta** conforme o cliente
  marca as opções. É o elemento que diferencia o site; se for mexer nele, mexa
  com cuidado.
- **Cores dos ingredientes** (`--ing-*` no CSS) são informação, não enfeite:
  cada complemento tem sua cor, usada no corte e nas bolinhas das tags.
- Mobile-first: o layout base é o do celular; o `@media (min-width:760px)` só
  adiciona o que é de desktop.
- Animações respeitam `prefers-reduced-motion`.
