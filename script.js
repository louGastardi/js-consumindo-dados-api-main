"use strict";
// var consultaCEP = fetch("https://viacep.com.br/ws/29052999/json/")
//   .then((resposta) => resposta.json())
//   .then((r) => {
//     if (r.erro) {
//       throw Error("Esse CEP nao existe!");
//     } else console.log(r);
//   })
//   .catch((erro) => console.log(erro))
//   .finally((mensagem) => console.log("precessamento concluido!"));
// console.log(consultaCEP);

// Async function

async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var convertidoCEP = await consultaCEP.json();
    if (convertidoCEP.erro) {
      throw Error("CEP NAO EXISTE!");
    }

    var cidade = document.getElementById("cidade");
    var rua = document.getElementById("endereco");
    var estado = document.getElementById("estado");
    var bairro = document.getElementById("bairro");

    cidade.value = convertidoCEP.localidade;
    rua.value = convertidoCEP.logradouro;
    estado.value = convertidoCEP.uf;
    bairro.value = convertidoCEP.bairro;

    console.log(convertidoCEP);
    return convertidoCEP;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inexistente! Por favor tente novamente!</p>`;
    console.log(erro);
  }
}

// let ceps = ["01001000", "29052320", "29052125"];
// let conjuntoCEPS = ceps.map((valores) => buscaEndereco(valores));

// Promise.all(conjuntoCEPS).then((respostas) => console.log(respostas));

// buscaEndereco();

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
