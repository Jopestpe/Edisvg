var EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
var TextoSVGAtual = document.getElementById('TextoSVGAtual');
var BotaoAtualizar = document.getElementById('BotaoAtualizar');
var BotaoBaixar = document.getElementById('BotaoBaixar');
var NomeDoArquivo = document.getElementById('NomeDoArquivo');
var MostrarSVG = document.getElementById('MostrarSVG');
var Coordenadas = document.getElementById('Coordenadas');
var PosicaoRegistradaAtual 

document.addEventListener("mousemove", (Evento) => { 
    Coordenadas.style.left = 20 + Evento.clientX + "px";
    Coordenadas.style.top = 20 + Evento.clientY + "px";
});
NomeDoArquivo.onfocus = (Evento) => {
    Foco = true
    NomeDoArquivo.value = ""
}
NomeDoArquivo.onblur = (Evento) => {
    Foco = false
}
MostrarSVG.onfocus = (Evento) => {
    Coordenadas.style.hover  = 1
}
MostrarSVG.onblur = (Evento) => {
    Coordenadas.style.opacity = 0
}
MostrarSVG.onmousemove = function MostrarSVG(Evento){
    var Margem = Evento.target.getBoundingClientRect();
    var PosX = parseInt(Evento.clientX-Margem.left)
    var PosY = parseInt(Evento.clientY-Margem.top)
    CoordenadasNoPonteiro(PosX,PosY)
    onclick = (event) => { 
        RegistrarCoordenadas(PosX,PosY)
    };
    
}
function CoordenadasNoPonteiro(PosX,PosY){
    Coordenadas.innerText="x "+PosX.toString()+" y "+PosY.toString();
}

function RegistrarCoordenadas(PosX,PosY){
    PosicaoRegistradaAtual = {
        x: PosX,
        y: PosY
    }
    // console.log(PosicaoRegistradaAtual.x + " | " + PosicaoRegistradaAtual.y)
}

BotaoAtualizar.addEventListener('click',()=>{
    Atualizar()
})

BotaoBaixar.addEventListener('click',()=>{
    BaixarArquivo()
})

EntradaDeArquivo.addEventListener('change',()=>{
    var LeitorDeDocumentos = new FileReader();
    LeitorDeDocumentos.readAsText(EntradaDeArquivo.files[0]);
    LeitorDeDocumentos.onload = function(){
        TextoSVGAtual.value = LeitorDeDocumentos.result
    }
});

TextoSVGAtual.addEventListener('change',()=>{
    Atualizar() 
});
// Atualizar SVG tela
function Atualizar(){
   MostrarSVG.innerHTML = TextoSVGAtual.value
}
// Baixar Arquivo
function BaixarArquivo() { 
    var Baixa = document.createElement('a');
    Baixa.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(TextoSVGAtual.value));
    Baixa.setAttribute('download',NomeDoArquivo.value+".svg"); 
    Baixa.style.display = 'none';
    document.body.appendChild(Baixa);
    Baixa.click();
    document.body.removeChild(Baixa);
}
// https://www.w3schools.com/graphics/svg_intro.asp
function Adicionar1(){
    // Rectangle <rect>
    // <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
    // Circle <circle>
    // Ellipse <ellipse>
    // Line <line>
    // Polyline <polyline>
    // Polygon <polygon>
    // Path <path>
}
// Pegar Variaveis e Atributos
function ExtrairDoTexto(){
    var Texto = document.getElementById('TextoSVGAtual').value
    var PegarVariaveis = /(?<=\=").+?(?=\")/gi;
    var ProcuraVariaveis = Texto.matchAll(PegarVariaveis);
    var Variaveis =  Array.from(ProcuraVariaveis)
    console.log("Variaveis: "+Variaveis)
    var PegarAtributos = /(?<=[ ,\n,\s]).+?(?=\=)/gi;
    var ProcuraAtributos = Texto.matchAll(PegarAtributos);
    var Variaveis =  Array.from(ProcuraAtributos)
    console.log("Atributos: "+Variaveis)
}
// Atalhos
document.addEventListener("keydown", Tecla_Apertada);
function Tecla_Apertada(Evento) {
    switch (Evento.code){
        case "KeyA":
            if (Foco == false){
            EntradaDeArquivo.click();
            }
            break;
        case "KeyS":
            if (Foco == false){
            BotaoAtualizar.click();
            }
            break;
        case "KeyD":
            if (Foco == false){
            NomeDoArquivo.focus();
            }
            break;
        case "KeyF":
            if (Foco == false){
                BotaoBaixar.click();
            }
            break;
        case "KeyT":
            // ExtrairDoTexto()
            soma()
            break;
    }
}
function soma(){
    var o = 16
    var i = 0
    var rs = []
    var n = 16
    while (i<o){
        i+=1;
        rs.push(i * n);
    }
    console.log(rs);
}
