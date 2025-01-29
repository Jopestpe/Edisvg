function adicionar_elemento(elemento){
    switch (elemento) {
        case 'retangulo':
            adicionar_retangulo();
            break;
        case 'gradiente':
            adicionar_gradiente();
            break;
        case 'circulo':
            adicionar_circulo();
            break;
        case 'elipse':
            adicionar_elipse();
            break;
        case 'linha':
            adicionar_linha();
            break;
        case 'poligono':
            adicionar_poligono();
            break;
        case 'caminho':
            adicionar_caminho();
            break;
        case 'texto':
            adicionar_texto();
            break;
        default:
            return;
    }
}

function adicionar_retangulo() {
    const svg = div_vizualizar_svg.querySelector('svg');
    const novoRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    novoRect.setAttribute("x", "128");
    novoRect.setAttribute("y", "128");
    novoRect.setAttribute("width", "256");
    novoRect.setAttribute("height", "256");
    novoRect.setAttribute("fill", "rgb(235,235,235)");
    novoRect.setAttribute("stroke-width", "5");
    novoRect.setAttribute("stroke", "rgb(50,50,50)");
    svg.appendChild(novoRect);
}

function adicionar_gradiente() {
    const svg = div_vizualizar_svg.querySelector('svg');
    const novoGradiente = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradient.setAttribute("id", "gradiente");
    linearGradient.setAttribute("x1", "0%");
    linearGradient.setAttribute("y1", "0%");
    linearGradient.setAttribute("x2", "100%");
    linearGradient.setAttribute("y2", "0%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", "stop-color:rgb(235,235,235);");

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("style", "stop-color:rgb(50,50,50);");

    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    novoGradiente.appendChild(linearGradient);

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("fill", "url(#gradiente)");
    rect.setAttribute("width", "256");
    rect.setAttribute("height", "256");
    rect.setAttribute("x", "128");
    rect.setAttribute("y", "128");

    svg.appendChild(novoGradiente);
    svg.appendChild(rect);
}

function adicionar_circulo() {
    const svg = div_vizualizar_svg.querySelector('svg');
    const novoCirculo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    novoCirculo.setAttribute("cx", "128");
    novoCirculo.setAttribute("cy", "128");
    novoCirculo.setAttribute("r", "64");
    novoCirculo.setAttribute("stroke", "rgb(50,50,50)");
    novoCirculo.setAttribute("stroke-width", "6");
    novoCirculo.setAttribute("fill", "rgb(235,235,235)");
    svg.appendChild(novoCirculo);
}

function adicionar_elipse() {
    const svg = div_vizualizar_svg.querySelector('svg');
    const novaElipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    novaElipse.setAttribute("cx", "128");
    novaElipse.setAttribute("cy", "128");
    novaElipse.setAttribute("rx", "32");
    novaElipse.setAttribute("ry", "64");
    novaElipse.setAttribute("stroke", "rgb(50,50,50)");
    novaElipse.setAttribute("stroke-width", "6");
    novaElipse.setAttribute("fill", "rgb(235,235,235)");
    svg.appendChild(novaElipse);
}

function adicionar_linha() {
    const svg = div_vizualizar_svg.querySelector('svg');
    const novaLinha = document.createElementNS("http://www.w3.org/2000/svg", "line");
    novaLinha.setAttribute("x1", "0");
    novaLinha.setAttribute("y1", "0");
    novaLinha.setAttribute("x2", "256");
    novaLinha.setAttribute("y2", "256");
    novaLinha.setAttribute("stroke", "rgb(50,50,50)");
    novaLinha.setAttribute("stroke-width", "6");
    novaLinha.setAttribute("stroke-linecap", "round");
    svg.appendChild(novaLinha);
}

function adicionar_poligono() {
    const svg = div_vizualizar_svg.querySelector('svg');
    const novoPoligono = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    novoPoligono.setAttribute("points", "50 5 95 35 95 75 50 95 5 75 5 35");
    novoPoligono.setAttribute("stroke", "rgb(50,50,50)");
    novoPoligono.setAttribute("stroke-width", "6");
    novoPoligono.setAttribute("fill", "rgb(235,235,235)");
    svg.appendChild(novoPoligono);
}

function adicionar_caminho() {
    const svg = div_vizualizar_svg.querySelector('svg');
    const novoCaminho = document.createElementNS("http://www.w3.org/2000/svg", "path");
    novoCaminho.setAttribute("d", "M128 0 L128 256 L256 256 Z");
    novoCaminho.setAttribute("stroke", "rgb(50,50,50)");
    novoCaminho.setAttribute("stroke-width", "6");
    novoCaminho.setAttribute("fill", "rgb(235,235,235)");
    svg.appendChild(novoCaminho);
}

function adicionar_texto() {
    const svg = div_vizualizar_svg.querySelector('svg');
    const novoTexto = document.createElementNS("http://www.w3.org/2000/svg", "text");
    novoTexto.setAttribute("x", "128");
    novoTexto.setAttribute("y", "128");
    novoTexto.setAttribute("fill", "rgb(0,255,0)");
    novoTexto.textContent = "Texto";
    svg.appendChild(novoTexto);
}
