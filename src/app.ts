const { Client } = require("cassandra-driver");
import PromptSync = require("prompt-sync");
let prompt = PromptSync();

const client = new Client({
   cloud: {
      secureConnectBundle: "C:\\Users\\ddaiw\\Desktop\\cassandra\\secure-connect-fateccassandra.zip",
   },
   credentials: {
      username: "",
      password: "",
   },
});

Start();

async function Listar(rs: string) {
   await client.connect();
   await client.execute("use mercadolivre");
   let ts = await client.execute(rs)
   let linhas = ts.rows;

   for (var i = 0; i < linhas.length; i++) {
      console.log(JSON.stringify(linhas[i]))
   }

   await client.shutdown();
}

function Start() {

   console.log(`****************************`)
   console.log(`| Por favor, selecione uma opção...`)
   console.log(`----------------------`)
   console.log(`| Opções do sistema:`)
   console.log(`----------------------`)
   console.log(`| 1 - Usuario`)
   console.log(`| 2 - Vendedor`)
   console.log(`| 3 - Produto`)
   console.log(`| 4 - Compra`)
   console.log(`****************************`)
   console.log(`| 0 - Sair`)
   console.log(`----------------------`)
   let opcao = Number(prompt("Insire a opção desejada: "))
   Switch(opcao)
}

function Switch(opcao: number) {
   switch (opcao) {
      case 1:
         Usuarios();
         break;
      case 2:
         Vendedor();
         break;
      case 3:
         Produto();
         break;
      case 4:
         Compra();
         break;
      case 0:
         console.log('Até logo!');
         console.clear();
         break;
   }
}

function Usuarios() {
   console.log(`****************************`)
   console.log(`| Opções para Usuario:`)
   console.log(`----------------------`)
   console.log(`| 1 - Cadastrar Usuario`)
   console.log(`| 2 - Editar Usuario`)
   console.log(`| 3 - Listar Usuarios`)
   console.log(`| 4 - Excluir Usuario`)
   console.log(`****************************`)
   console.log(`| 0 - Sair`)
   let opcao = Number(prompt("Insire a opção desejada: "))
   switch (opcao) {
      case 3:
         const rs = ("SELECT * from usuario;");
         Listar(rs);
         break
      case 0:
         console.log('Até logo!')
         console.clear()
         break
   }
}

function Vendedor() {
   console.log(`****************************`)
   console.log(`| Opções para Vendedor:`)
   console.log(`----------------------`)
   console.log(`| 1 - Cadastrar Vendedor`)
   console.log(`| 2 - Editar Vendedor`)
   console.log(`| 3 - Listar Vendedores`)
   console.log(`| 4 - Excluir Vendedor`)
   console.log(`****************************`)
   console.log(`| 0 - Sair`)
   let opcao = Number(prompt("Insire a opção desejada: "))
}

function Produto() {
   console.log(`****************************`)
   console.log(`| Opções para Produto:`)
   console.log(`----------------------`)
   console.log(`| 1 - Cadastrar Produto`)
   console.log(`| 2 - Editar Produto`)
   console.log(`| 3 - Listar Produtos`)
   console.log(`| 4 - Excluir Produto`)
   console.log(`****************************`)
   console.log(`| 0 - Sair`)
   let opcao = Number(prompt("Insire a opção desejada: "))
}

function Compra() {
   console.log(`****************************`)
   console.log(`| Opções para Compra:`)
   console.log(`----------------------`)
   console.log(`| 1 - Cadastrar Compra`)
   console.log(`| 2 - Editar Compra`)
   console.log(`| 3 - Listar Compra`)
   console.log(`| 4 - Excluir Compra`)
   console.log(`****************************`)
   console.log(`| 0 - Sair`)
   let opcao = Number(prompt("Insire a opção desejada: "))
}