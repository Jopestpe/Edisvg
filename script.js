var EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
var BotaoEntradaDeArquivo = document.getElementById('BotaoEntradaDeArquivo');
var TextoSVGAtual = document.getElementById('TextoSVGAtual');
var BotaoAtualizar = document.getElementById('BotaoAtualizar');
var BotaoBaixar = document.getElementById('BotaoBaixar');
var MostrarSVG = document.getElementById('MostrarSVG');
var Coordenadas = document.getElementById('Coordenadas');
var SelecionarCor = document.getElementById('SelecionarCor');
var BotaoCor = document.getElementById('BotaoCor');
var NomeDoArquivo
EntradaDeArquivo.addEventListener('change',()=>{
    var LeitorDeDocumentos = new FileReader();
    LeitorDeDocumentos.readAsText(EntradaDeArquivo.files[0]);
    LeitorDeDocumentos.onload = function(){
        TextoSVGAtual.value = LeitorDeDocumentos.result
        MostrarSVG.innerHTML = TextoSVGAtual.value
    }
    NomeDoArquivo = EntradaDeArquivo.files[0].name
});
MostrarSVG.addEventListener("mousemove",MostrarCoordenadas);
function MostrarCoordenadas(Evento){
    Coordenadas.style.left = 20 + Evento.clientX + "px";
    Coordenadas.style.top = 20 + Evento.clientY + "px";
    var Margem = MostrarSVG.getBoundingClientRect();
    var PosX = parseInt(Evento.clientX-Margem.left);
    var PosY = parseInt(Evento.clientY-Margem.top);
    Coordenadas.innerText=PosX.toString()+" | "+PosY.toString();
    MostrarSVG.onclick = (event) => {
        console.log("click",PosX,PosY)
    };
};
BotaoBaixar.addEventListener('click',()=>{
    BaixarArquivo();
});
BotaoEntradaDeArquivo.addEventListener('click',()=>{
    EntradaDeArquivo.click()
});
BotaoCor.addEventListener("click",(Evento) => {
    SelecionarCor.click();
});
SelecionarCor.addEventListener("input",(Evento) => {
    MostrarSVG.style.backgroundColor = SelecionarCor.value;
    BotaoCor.style.backgroundColor = SelecionarCor.value;
});
// Limpar coordenadas
MostrarSVG.addEventListener("mouseenter",(Evento) => {
    Coordenadas.style.opacity = 1;
    Coordenadas.style.display = 'flex';
});
// Limpar coordenadas
MostrarSVG.addEventListener("mouseleave",(Evento) => {
    Coordenadas.style.opacity = 0;
    Coordenadas.style.display = 'none';
});
TextoSVGAtual.addEventListener('input', Atualizar);
TextoSVGAtual.addEventListener('change', Atualizar);
BotaoAtualizar.addEventListener('click', Atualizar);
function Atualizar(){
    MostrarSVG.innerHTML = TextoSVGAtual.value
    // document.getElementById('meue').addEventListener('click',()=>{
        // console.log("svg meue");
    // });
}
function BaixarArquivo(){
    var Baixa = document.createElement('a');
    Baixa.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(TextoSVGAtual.value));
    Baixa.setAttribute('download', NomeDoArquivo + "_EditorSVG.svg");
    Baixa.style.display = 'none';
    document.body.appendChild(Baixa);
    Baixa.click();
    document.body.removeChild(Baixa);
};
document.addEventListener("keydown", Atalhos);
function Atalhos(Evento) {
    if (Evento.shiftKey){
        if (Evento.code == "KeyA"){
            EntradaDeArquivo.click();
        }if (Evento.code == "KeyS"){
            BotaoAtualizar.click();
        }if (Evento.code == "KeyD"){
            BotaoBaixar.click();
        }if (Evento.code == "KeyC"){
            SelecionarCor.click();
        }if (Evento.code == "KeyT"){
            ExtrairDoTexto();
}}}
function ExtrairDoTexto(){
    var Texto = document.getElementById('TextoSVGAtual').value
    var PegarAtributos = /(.*)(?=\=)/gm;
    var ProcuraAtributos = Texto.matchAll(PegarAtributos);
    var Atributos =  Array.from(ProcuraAtributos)
    var PegarVariaveis = /(?<=\=")(.+?)(?=\")/gs;
    var ProcuraVariaveis = Texto.matchAll(PegarVariaveis);
    var Variaveis =  Array.from(ProcuraVariaveis);
    console.log(Variaveis.length);
    for (var Lugar=0;Lugar<Variaveis.length;Lugar+=1) {
        console.log(Atributos[Lugar+1]+" AV ");
    }
}
function AdicionarElementoSVG(){

    var Elementos = ["rect","circle","ellipse"]
    var Estilos = {'stroke-linecap': ['butt','round','square']};
    var Retangulo= '<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"/>'
    var Circulo = '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>'
    var Elipse = '<ellipse cx="200" cy="80" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2"/>'
    var Linha = '<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2"/>'
    var Poligono = ' <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1"/>'
    var Linhas = '<polyline points="20,20 40,25 60,40 80"style="fill:none;stroke:black;stroke-width:3"/>'
    var Caminhos = '<path d="M150 0 L75 200 L225 200 Z" />'
    var Texto = '<text x="0" y="15" fill="red">I love SVG!</text>'
}
const s = document.createElement('s');
const options = ["Four", "Five", "Six"];
options.forEach((element,key) => {
    s[key] = new Option(element,key);
});
document.body.appendChild(s);
