import './App.css';
import Cabecalho from './Estrutura/Cabecalho/Cabecalho';
import Conteudo from './Estrutura/Conteudo/Conteudo';
import CriarConta from './Estrutura/Conteudo/CriarConta';
import EnviarNoticia from './Estrutura/Conteudo/EnviarNoticia';
import Logar from './Estrutura/Conteudo/Logar';
import NoticiaSolo from './Estrutura/Conteudo/NoticiaSolo';
import Rodape from './Estrutura/Rodape/Rodape';
import Rotas from './Rotas';
function App() {
  return (
    <div id="Fundo">
    <Cabecalho titulo="Portal de Notícias" />
    {/* <Conteudo/> */}
    {/* <NoticiaSolo/> */}
    {/* <EnviarNoticia/> */}
    {/* <CriarConta/> */}
    <Logar/>
    <Rotas />
    <Rodape/>
    </div>
  );
}

export default App;
