"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Client } = require("cassandra-driver");
const PromptSync = require("prompt-sync");
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
function Listar(rs) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        yield client.execute("use mercadolivre");
        let ts = yield client.execute(rs);
        let linhas = ts.rows;
        for (var i = 0; i < linhas.length; i++) {
            console.log(JSON.stringify(linhas[i]));
        }
        yield client.shutdown();
    });
}
function Start() {
    console.log(`****************************`);
    console.log(`| Por favor, selecione uma opção...`);
    console.log(`----------------------`);
    console.log(`| Opções do sistema:`);
    console.log(`----------------------`);
    console.log(`| 1 - Usuario`);
    console.log(`| 2 - Vendedor`);
    console.log(`| 3 - Produto`);
    console.log(`| 4 - Compra`);
    console.log(`****************************`);
    console.log(`| 0 - Sair`);
    console.log(`----------------------`);
    let opcao = Number(prompt("Insire a opção desejada: "));
    Switch(opcao);
}
function Switch(opcao) {
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
    console.log(`****************************`);
    console.log(`| Opções para Usuario:`);
    console.log(`----------------------`);
    console.log(`| 1 - Cadastrar Usuario`);
    console.log(`| 2 - Editar Usuario`);
    console.log(`| 3 - Listar Usuarios`);
    console.log(`| 4 - Excluir Usuario`);
    console.log(`****************************`);
    console.log(`| 0 - Sair`);
    let opcao = Number(prompt("Insire a opção desejada: "));
    switch (opcao) {
        case 3:
            const rs = ("SELECT * from usuario;");
            Listar(rs);
            break;
        case 0:
            console.log('Até logo!');
            console.clear();
            break;
    }
}
function Vendedor() {
    console.log(`****************************`);
    console.log(`| Opções para Vendedor:`);
    console.log(`----------------------`);
    console.log(`| 1 - Cadastrar Vendedor`);
    console.log(`| 2 - Editar Vendedor`);
    console.log(`| 3 - Listar Vendedores`);
    console.log(`| 4 - Excluir Vendedor`);
    console.log(`****************************`);
    console.log(`| 0 - Sair`);
    let opcao = Number(prompt("Insire a opção desejada: "));
}
function Produto() {
    console.log(`****************************`);
    console.log(`| Opções para Produto:`);
    console.log(`----------------------`);
    console.log(`| 1 - Cadastrar Produto`);
    console.log(`| 2 - Editar Produto`);
    console.log(`| 3 - Listar Produtos`);
    console.log(`| 4 - Excluir Produto`);
    console.log(`****************************`);
    console.log(`| 0 - Sair`);
    let opcao = Number(prompt("Insire a opção desejada: "));
}
function Compra() {
    console.log(`****************************`);
    console.log(`| Opções para Compra:`);
    console.log(`----------------------`);
    console.log(`| 1 - Cadastrar Compra`);
    console.log(`| 2 - Editar Compra`);
    console.log(`| 3 - Listar Compra`);
    console.log(`| 4 - Excluir Compra`);
    console.log(`****************************`);
    console.log(`| 0 - Sair`);
    let opcao = Number(prompt("Insire a opção desejada: "));
}
