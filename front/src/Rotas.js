import EnviarNoticias from "./Estrutura/Noticias/EnviarNoticias";
const { BrowserRouter, Routes, Route } = require("react-router-dom");


function Rotas()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/enviar" element={<EnviarNoticias />} />
               
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;