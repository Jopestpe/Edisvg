const ImagemSVG = document.getElementById('ImagemSVG');
var TextoSVG = document.getElementById('TextoSVG');
TextoSVG.addEventListener('input',()=>{
    AtulizarSVG(TextoSVG.value)
});
const EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
const BotaoEntradaDeArquivo = document.getElementById('BotaoEntradaDeArquivo');
EntradaDeArquivo.addEventListener('change',()=>{
    var LeitorDeDocumentos = new FileReader();
    LeitorDeDocumentos.readAsText(EntradaDeArquivo.files[0]);
    LeitorDeDocumentos.onload = function(){
        AtulizarSVG(LeitorDeDocumentos.result)
    }
});
function AtulizarSVG(ScriptSVG){
    ImagemSVG.innerHTML = ScriptSVG
    reatribuirEventos();
}
BotaoEntradaDeArquivo.addEventListener('click',()=>{
    EntradaDeArquivo.click()
});
const BotaoBaixar = document.getElementById('BotaoBaixar');
BotaoBaixar.addEventListener('click',()=>{
    var Baixa = document.createElement('a');
    Baixa.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(TextoSVG.value));
    Baixa.setAttribute('download', "EditorSVG.svg");
    Baixa.style.display = 'none';
    document.body.appendChild(Baixa);
    Baixa.click();
    document.body.removeChild(Baixa);
});
const SelecionarCor = document.getElementById('SelecionarCor');
const BotaoCor = document.getElementById('BotaoCor');
SelecionarCor.addEventListener("input",() => {
    ImagemSVG.style.backgroundColor = SelecionarCor.value;
    BotaoCor.style.backgroundColor = SelecionarCor.value;
});
BotaoCor.addEventListener("click",() => {
    SelecionarCor.click();
});

const BotaoExemplos = document.getElementById('BotaoExemplos');
const ListaExemplos = document.getElementById('ListaExemplos');
BotaoExemplos.addEventListener('click',()=>{
    ListaExemplos.style.display = ListaExemplos.style.display === 'flex' ? 'none' : 'flex';
    ExemploTextoSVG.style.display = ExemploTextoSVG.style.display === 'flex' ? 'none' : 'flex';
});
const ExemploTextoSVG = document.getElementById('ExemploTextoSVG');
function SelecionarExemplo(ExemploChave) {
    ExemploTextoSVG.innerHTML = ExemploSVG[ExemploChave];
    ExemploTextoSVG.style.display = "flex"
}
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        ListaExemplos.style.display = "none";
        ExemploTextoSVG.style.display = "none";
    }
}); 
ImagemSVG.addEventListener("mouseenter",() => {
    Coordenadas.style.display = 'flex';
});
ImagemSVG.addEventListener("mouseleave",() => {
    Coordenadas.style.display = 'none';
});
function reatribuirEventos() {
    var ImagemSVGsvg = document.querySelector('#ImagemSVG svg');
    ImagemSVGsvg.addEventListener("mousemove", function (Evento) {
        Coordenadas.style.left = 10 + Evento.clientX + "px";
        Coordenadas.style.top = 10 + Evento.clientY + "px";
        const rect = ImagemSVGsvg.getBoundingClientRect();
        const PosX = parseInt(Evento.clientX - rect.left);
        const PosY = parseInt(Evento.clientY - rect.top);
        Coordenadas.innerText="x"+PosX.toString()+" y"+PosY.toString();
        ImagemSVGsvg.onclick = (Evento) => {
            Posicao.innerHTML += "x:"+PosX.toString()+"\n y:"+PosY.toString()+"\n";
        };
    });
}