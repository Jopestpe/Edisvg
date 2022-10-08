//Atualizar svg
function fn(){
    document.getElementById('psvg').innerHTML = document.getElementById('textosvg').value
}
function fn2(){
    Baixar("meusvg.svg",document.getElementById('textosvg').value)
}
function Baixar(Nome,Conteudo) { 
    var Baixa = document.createElement('a');
    // // Arquivo aqui aqui é o conteudo do arquivo
    Baixa.setAttribute('href', Nome); 
    // Arquivo aqui aqui é o caminho do arquivo
    Baixa.setAttribute('download', Conteudo); 
    Baixa.style.display = 'none';
    document.body.appendChild(Baixa);
    Baixa.click();
    document.body.removeChild(Baixa);
}
