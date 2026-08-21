/* ============================================================
   Joka's acai - montagem da pagina e envio do pedido
   Nao precisa editar este arquivo para trocar precos: use dados.js
   ============================================================ */
(function () {
  "use strict";

  var reais = function (v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  var el = function (tag, classe, texto) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto !== undefined) n.textContent = texto;
    return n;
  };

  var NOMES = {
    acai: "açaí",
    granola: "granola",
    banana: "banana",
    leite: "leite em pó",
    pacoca: "paçoca",
    morango: "morango",
    calda: "calda"
  };

  /* --- WhatsApp ------------------------------------------------ */
  function abrirWhatsApp(mensagem) {
    var url =
      "https://wa.me/" + LOJA.whatsapp + "?text=" + encodeURIComponent(mensagem);
    window.open(url, "_blank", "noopener");
  }

  function mensagemItem(item, escolhidos) {
    var lista = escolhidos.length
      ? escolhidos
          .map(function (c) { return c.nome; })
          .join(", ")
      : "a escolher";

    return (
      "Oi! Vim pelo site.\n\n" +
      "*" + item.nome + "* — " + reais(item.preco) + "\n" +
      "Complementos: " + lista + "\n\n" +
      "Nome: \n" +
      "Entrega ou retirada: "
    );
  }

  var mensagemGeral =
    "Oi! Vim pelo site do " + LOJA.nome + " " + LOJA.sobrenome + ". " +
    "Queria fazer um pedido.";

  /* --- Um item do cardapio ------------------------------------- */
  function montarItem(item) {
    var limite = item.limite || LOJA.limiteComplementos;
    var escolhidos = [];

    var artigo = el("article", "item");

    /* foto */
    var foto = el("div", "item__foto");
    var img = document.createElement("img");
    img.src = item.imagem;
    img.alt = item.nome;
    img.loading = "lazy";
    img.width = 300;
    img.height = 400;
    foto.appendChild(img);
    artigo.appendChild(foto);

    /* texto */
    var info = el("div", "item__info");

    var nome = el("h3", "item__nome");
    nome.appendChild(document.createTextNode(item.nome));
    if (item.destaque) nome.appendChild(el("span", "selo", item.destaque));
    nome.appendChild(el("span", "preco", reais(item.preco)));
    info.appendChild(nome);

    var legenda = el("p", "fraco item__legenda");
    info.appendChild(legenda);
    artigo.appendChild(info);

    /* acao */
    var acao = el("div", "item__acao");

    var painelId = "complementos-" + item.id;

    var alternar = el("button", "botao botao--linha item__alternar");
    alternar.type = "button";
    alternar.setAttribute("aria-expanded", "false");
    alternar.setAttribute("aria-controls", painelId);
    acao.appendChild(alternar);

    var pedir = el("button", "botao item__pedir", "Pedir");
    pedir.type = "button";
    pedir.setAttribute("aria-label", "Pedir " + item.nome + " pelo WhatsApp");
    pedir.addEventListener("click", function () {
      abrirWhatsApp(mensagemItem(item, escolhidos));
    });
    acao.appendChild(pedir);

    artigo.appendChild(acao);

    /* painel de complementos */
    var painel = el("div", "escolha");
    painel.id = painelId;
    painel.hidden = true;

    var lista = el("ul", "escolha__lista");
    var botoes = [];

    COMPLEMENTOS.forEach(function (comp) {
      var li = el("li");
      var chip = el("button", "chip");
      chip.type = "button";
      chip.setAttribute("aria-pressed", "false");

      var ponto = el("span", "ponto");
      ponto.style.background = "var(--ing-" + comp.ing + ")";
      chip.appendChild(ponto);
      chip.appendChild(document.createTextNode(comp.nome));

      chip.addEventListener("click", function () {
        var pos = escolhidos.indexOf(comp);
        if (pos > -1) {
          escolhidos.splice(pos, 1);
        } else if (escolhidos.length < limite) {
          escolhidos.push(comp);
        } else {
          return;
        }
        atualizar();
      });

      li.appendChild(chip);
      lista.appendChild(li);
      botoes.push({ chip: chip, comp: comp });
    });

    painel.appendChild(lista);

    artigo.appendChild(painel);

    /* --- estado --- */
    function atualizar() {
      var cheio = escolhidos.length >= limite;

      botoes.forEach(function (b) {
        var marcado = escolhidos.indexOf(b.comp) > -1;
        b.chip.setAttribute("aria-pressed", marcado ? "true" : "false");
        b.chip.disabled = cheio && !marcado;
      });

      alternar.textContent =
        "Complementos " + escolhidos.length + "/" + limite;

      if (escolhidos.length) {
        legenda.textContent =
          "No copo: " +
          escolhidos.map(function (c) { return c.nome.toLowerCase(); }).join(", ") + ".";
      } else {
        legenda.textContent =
          "Vem com: " +
          item.camadas
            .filter(function (i) { return i !== "acai"; })
            .map(function (i) { return NOMES[i] || i; })
            .join(", ") + ".";
      }
    }

    alternar.addEventListener("click", function () {
      var aberto = painel.hidden === false;
      painel.hidden = aberto;
      alternar.setAttribute("aria-expanded", aberto ? "false" : "true");
    });

    atualizar();
    return artigo;
  }

  /* --- Info da loja -------------------------------------------- */
  function montarInfo() {
    var dl = document.getElementById("lista-horarios");
    LOJA.horarios.forEach(function (h) {
      var linha = el("div");
      linha.appendChild(el("dt", null, h.dias));
      linha.appendChild(el("dd", null, h.horas));
      dl.appendChild(linha);
    });

    var insta = document.getElementById("link-instagram");
    insta.href = LOJA.instagram;
    insta.textContent = LOJA.instagramHandle;

    var apps = document.getElementById("lista-entregadores");
    LOJA.entregadores.forEach(function (app) {
      var link = el("a", "botao botao--linha", app.nome);
      link.href = app.url;
      link.target = "_blank";
      link.rel = "noopener";
      apps.appendChild(link);
    });
  }

  /* --- Revelar no scroll --------------------------------------- */
  function revelar(itens) {
    if (!("IntersectionObserver" in window)) {
      itens.forEach(function (i) { i.classList.add("visivel"); });
      return;
    }
    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    itens.forEach(function (i) { obs.observe(i); });
  }

  /* --- Inicio -------------------------------------------------- */
  var listaCardapio = document.getElementById("lista-cardapio");
  var itens = CARDAPIO.map(function (item) {
    var no = montarItem(item);
    listaCardapio.appendChild(no);
    return no;
  });
  revelar(itens);

  montarInfo();

  document.querySelectorAll("[data-pedido-geral]").forEach(function (b) {
    b.addEventListener("click", function () { abrirWhatsApp(mensagemGeral); });
  });

  document.title = LOJA.nome + " " + LOJA.sobrenome + " - batido na hora";
})();
