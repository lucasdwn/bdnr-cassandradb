const { Client } = require("cassandra-driver");
import PromptSync = require("prompt-sync");
let prompt = PromptSync();

const client = new Client({
   cloud: {
      secureConnectBundle: "C:\\Users\\ddaiw\\Desktop\\cassandra\\secure-connect-fateccassandra.zip",
   },
   credentials: {
      username: "erqchagCaJppsujYWbGvJtZj",
      password: "dwNO65hOjWHGWBooffJEGuR+xqXg_pLLxq-,BB9CvdzII_l.tqj23iPf0J4DLv4rCKIW,7.nBxhHWtqOqJzncXNGyNmG+Uimh_Dp.-i4W5W3R98dSz+pn1xHuG_UguU9",
   },
});

Start();

// Usuarios

async function CadastrarUsuario() {

   let email = prompt("Insira um E-mail Válido: ")
   let nome = prompt("Insira seu Nome: ")
   let sobrenome = prompt("Insira seu Sobrenome: ")
   let cpf = prompt("Insira seu CPF: ")
   let end = prompt("Insira seu endereço: ")

   await client.connect();
   await client.execute("use mercadolivre");

   let validacao = await client.execute(`SELECT * FROM usuario WHERE Email = '${email}'`);

   if (validacao.rows.length == 0) {
      await client.execute(`INSERT INTO usuario(email, nome, sobrenome, cpf, end) VALUES('${email}','${nome}','${sobrenome}','${cpf}','${end}')`);

      console.log("Usuario cadastrado com sucesso!");

      let opcao = Number(prompt("Deseja cadastrar novamente? 1-Sim 2-Não: "))

      switch (opcao) {
         case 1:
            CadastrarUsuario();
            break
         case 2:
            console.clear();
            Usuarios();
            break
      }

   }

   else {
      console.clear();
      console.log('Email já cadastrado')
      Usuarios();
   }


}

async function EditarUsuario() {
   let opcaoEmail = prompt("Digite o Email do usuario que deseja editar: ")

   await client.connect();
   await client.execute("use mercadolivre");


   let validacao = await client.execute(`SELECT * FROM usuario WHERE Email = '${opcaoEmail}'`);

   if (validacao.rows.length == 0) {
      console.clear();
      console.log('Usuario não existe')
      Usuarios();
   }

   else {
      let novoNome = prompt(`Nome Atual: ${validacao.rows[0].nome}, Digite o Novo nome: `);
      let novoSobrenome = prompt(`Sobrenome Atual: ${validacao.rows[0].sobrenome}, Digite o Novo sobrenome: `);
      let novoCPF = prompt(`CPF Atual: ${validacao.rows[0].cpf}, Digite o Novo cpf: `)
      let novoEnd = prompt(`Endereço Atual: ${validacao.rows[0].cpf}, Digite o Novo endereço: `)

      if (novoNome == '' && novoSobrenome == '' && novoCPF == '' && novoEnd == '') {
         console.log('Preencha todos os campos por favor!')
         Usuarios();
      }
      else {
         await client.execute(`UPDATE usuario SET nome = '${novoNome}', sobrenome = '${novoSobrenome}', cpf = '${novoCPF}', end = '${novoEnd}' WHERE email = '${opcaoEmail}'`)
         console.log("Usuario Editado com sucesso");
         Usuarios();
      }
   }

}

async function ListarUsuarios() {
   await client.connect();
   await client.execute("use mercadolivre");
   let query = await client.execute("SELECT * from usuario;");
   let queryResult = query.rows;

   for (var i = 0; i < queryResult.length; i++) {
      console.log(`----------------------`)
      console.log(`Email: ${queryResult[i].email} | Nome: ${queryResult[i].nome} | Sobrenome: ${queryResult[i].sobrenome} | CPF: ${queryResult[i].cpf} | Endereço: ${queryResult[i].end}`)
   }

   Usuarios()
}

async function ExcluirUsuario() {
   let opcaoEmail = prompt("Digite o Email do usuario que deseja excluir: ")

   await client.connect();
   await client.execute("use mercadolivre");

   let validacao = await client.execute(`SELECT * FROM usuario WHERE Email = '${opcaoEmail}'`);

   if (validacao.rows.length == 0) {
      console.clear();
      console.log('Usuario não existe')
      Usuarios();
   }
   else {
      await client.execute(`DELETE FROM usuario WHERE email = '${opcaoEmail}'`)
      console.log("Usuario foi excluido com sucesso");
      Usuarios();
   }

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

async function Switch(opcao: number) {
   switch (opcao) {
      case 1:
         console.clear();
         Usuarios();
         break;
      case 2:
         console.clear();
         Vendedor();
         break;
      case 3:
         console.clear();
         Produto();
         break;
      case 4:
         console.clear();
         Compra();
         break;
      case 0:
         console.log('Até logo!');
         console.clear();
         await client.shutdown();
         break;
   }
}

async function Usuarios() {
   console.log(`****************************`)
   console.log(`| Opções para Usuario:`)
   console.log(`----------------------`)
   console.log(`| 1 - Cadastrar Usuario`)
   console.log(`| 2 - Editar Usuario`)
   console.log(`| 3 - Listar Usuarios`)
   console.log(`| 4 - Excluir Usuario`)
   console.log(`****************************`)
   console.log(`| 5 - Voltar`)
   console.log(`| 0 - Sair`)
   let opcao = Number(prompt("Insire a opção desejada: "))
   switch (opcao) {
      case 1:
         CadastrarUsuario();
         break
      case 2:
         EditarUsuario();
         break
      case 3:
         ListarUsuarios();
         break
      case 4:
         ExcluirUsuario();
         break
      case 5:
         console.clear();
         Start();
      case 0:
         console.log('Até logo!');
         console.clear();
         await client.shutdown();
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
   console.log(`| 5 - Voltar`)
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
   console.log(`| 5 - Voltar`)
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
   console.log(`| 5 - Voltar`)
   console.log(`| 0 - Sair`)
   let opcao = Number(prompt("Insire a opção desejada: "))
}