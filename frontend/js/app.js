// Troque pela URL do Render depois do deploy do dia 1.
const API_BASE = "http://localhost:3000";

const form = document.getElementById("form-evento");
const campoId = document.getElementById("evento-id");
const campoTitulo = document.getElementById("titulo");
const campoData = document.getElementById("data");
const campoLocal = document.getElementById("local");
const campoStatus = document.getElementById("status");
const campoDescricao = document.getElementById("descricao");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const btnAtualizar = document.getElementById("btn-atualizar");
const formTitulo = document.getElementById("form-titulo");
const lista = document.getElementById("lista-eventos");
const listaEstado = document.getElementById("lista-estado");
const mensagem = document.getElementById("mensagem");

const STATUS_LABEL = {
  agendado: "Agendado",
  em_andamento: "Em andamento",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

function mostrarMensagem(texto, tipo) {
  mensagem.hidden = false;
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
}

function limparMensagem() {
  mensagem.hidden = true;
  mensagem.textContent = "";
  mensagem.className = "mensagem";
}

function modoCriacao() {
  campoId.value = "";
  form.reset();
  campoStatus.value = "agendado";
  formTitulo.textContent = "Novo evento";
  btnSalvar.textContent = "Salvar";
  btnCancelar.hidden = true;
}

function modoEdicao(evento) {
  campoId.value = evento.id;
  campoTitulo.value = evento.titulo;
  campoData.value = evento.data;
  campoLocal.value = evento.local;
  campoStatus.value = evento.status || "agendado";
  campoDescricao.value = evento.descricao || "";
  formTitulo.textContent = "Editar evento";
  btnSalvar.textContent = "Atualizar";
  btnCancelar.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function lerFormulario() {
  return {
    titulo: campoTitulo.value.trim(),
    data: campoData.value,
    local: campoLocal.value.trim(),
    status: campoStatus.value,
    descricao: campoDescricao.value.trim(),
  };
}

async function api(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_BASE}${caminho}`, {
    headers: {
      "Content-Type": "application/json",
      ...(opcoes.headers || {}),
    },
    ...opcoes,
  });

  if (resposta.status === 204) {
    return null;
  }

  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(dados.erro || `Erro HTTP ${resposta.status}`);
  }

  return dados;
}

function renderLista(eventos) {
  lista.innerHTML = "";

  if (!eventos.length) {
    listaEstado.hidden = false;
    listaEstado.textContent = "Nenhum evento cadastrado.";
    return;
  }

  listaEstado.hidden = true;

  for (const evento of eventos) {
    const li = document.createElement("li");
    li.className = "item";

    const status = evento.status || "agendado";
    const desc = evento.descricao
      ? `<p class="descricao">${evento.descricao}</p>`
      : "";

    li.innerHTML = `
      <div class="item-topo">
        <h3>${evento.titulo}</h3>
        <span class="badge ${status}">${STATUS_LABEL[status] || status}</span>
      </div>
      <p class="meta">${evento.data} · ${evento.local}</p>
      ${desc}
      <div class="acoes-item">
        <button type="button" class="secundario" data-acao="editar">Editar</button>
        <button type="button" class="perigo" data-acao="excluir">Excluir</button>
      </div>
    `;

    li.querySelector('[data-acao="editar"]').addEventListener("click", () => {
      modoEdicao(evento);
    });

    li.querySelector('[data-acao="excluir"]').addEventListener("click", async () => {
      if (!confirm(`Excluir "${evento.titulo}"?`)) return;

      try {
        await api(`/eventos/${evento.id}`, { method: "DELETE" });
        mostrarMensagem("Evento excluído.", "ok");
        if (campoId.value === evento.id) modoCriacao();
        await carregarEventos();
      } catch (erro) {
        mostrarMensagem(erro.message, "erro");
      }
    });

    lista.appendChild(li);
  }
}

async function carregarEventos() {
  listaEstado.hidden = false;
  listaEstado.textContent = "Carregando...";
  lista.innerHTML = "";

  try {
    const eventos = await api("/eventos");
    renderLista(eventos);
  } catch (erro) {
    listaEstado.hidden = false;
    listaEstado.textContent = "Não foi possível carregar os eventos.";
    mostrarMensagem(erro.message, "erro");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  limparMensagem();

  const corpo = lerFormulario();
  const id = campoId.value;
  btnSalvar.disabled = true;

  try {
    if (id) {
      await api(`/eventos/${id}`, {
        method: "PUT",
        body: JSON.stringify(corpo),
      });
      mostrarMensagem("Evento atualizado.", "ok");
    } else {
      await api("/eventos", {
        method: "POST",
        body: JSON.stringify(corpo),
      });
      mostrarMensagem("Evento criado.", "ok");
    }

    modoCriacao();
    await carregarEventos();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  } finally {
    btnSalvar.disabled = false;
  }
});

btnCancelar.addEventListener("click", () => {
  modoCriacao();
  limparMensagem();
});

btnAtualizar.addEventListener("click", () => {
  limparMensagem();
  carregarEventos();
});

carregarEventos();
