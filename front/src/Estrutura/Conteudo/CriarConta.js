import "./CriarConta.css";

function CriarConta() {
    return (

        <div class="Colorletters">
            <h1><center>Criar Conta</center></h1>
            <center>Já tem conta? Login</center>

            <br />
            <div class="grid-container3">
                <div class="grid-item3"></div>
                <div class="grid-item3">Nome
                    <br />
                    <input type="text" id="txtNome" placeholder="Nome Completo" />
                </div>
                <div class="grid-item3">User
                    <br />
                    <input type="text" id="txtUser" placeholder="User" /></div>
                <div class="grid-item3"></div>
                <div class="grid-item3"></div>
                <div class="grid-item3">E-mail
                    <br />
                    <input type="text" id="txtEmail" placeholder="RA@escolas.anchieta.br" /></div>
                <div class="grid-item3">Curso
                    <br />
                    <input type="text" id="txtCurso" placeholder="Nome do Curso" /></div>
                <div class="grid-item3"></div>
                <div class="grid-item3"></div>
                <div class="grid-item3">Senha
                    <br />
                    <input type="text" id="txtSenha" placeholder="********" /></div>
                <div class="grid-item3">RA
                    <br />
                    <input type="text" id="txtRA" placeholder=" Número RA" /></div>

            </div>
            <button>ENVIAR</button> 





        </div>
    );
}

export default CriarConta;
