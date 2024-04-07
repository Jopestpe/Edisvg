document.addEventListener("DOMContentLoaded", function() {
    const colunasInput = document.getElementById("colunas");
    const linhasInput = document.getElementById("linhas");
    const gridContainer = document.getElementById("grade");
    const svgContainer = document.getElementById('svg');

    const tamanho_pixel = 16;
    let linhas_svg = [];

    document.body.appendChild(gridContainer);

    function criarGrid(colunas, linhas, larguraQuadrado, alturaQuadrado) {
        gridContainer.innerHTML = "";
        linhas_svg = new Array(colunas * linhas).fill(false);

        gridContainer.style.gridTemplateColumns = `repeat(${colunas}, ${larguraQuadrado}px)`;
        gridContainer.style.gridTemplateRows = `repeat(${linhas}, ${alturaQuadrado}px)`;
     
        for (let indice = 0; indice < colunas * linhas; indice++) {
            const quadrado = document.createElement("div");
            quadrado.classList.add("quadrado");
            quadrado.style.width = `${larguraQuadrado}px`;
            quadrado.style.height = `${alturaQuadrado}px`;
            quadrado.addEventListener("click", function() {
                if (linhas_svg[indice]) {
                    quadrado.classList.remove("quadrado_pressionado");
                    linhas_svg[indice] = false;
                } else {
                    quadrado.classList.add("quadrado_pressionado");
                    linhas_svg[indice] = true;
                }
                atualizarSVG();
            });
            gridContainer.appendChild(quadrado);
        }
    }    

    function criarSVG(linhas_svg) {
        let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" 
        width="${8 * parseInt(colunasInput.value)}" height="${8 * parseInt(linhasInput.value)}" 
        viewBox="0 0 ${8 * parseInt(colunasInput.value)} ${8 * parseInt(linhasInput.value)}" 
        fill="cecece" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">`;

        for (let i = 0; i < linhas_svg.length; i++) {
            if (linhas_svg[i]) {
                const coluna = i % parseInt(colunasInput.value) + 1;
                const linha = Math.floor(i / parseInt(colunasInput.value)) + 1;

                svgContent += `<rect x="${(coluna - 1) * 8}" y="${(linha - 1) * 8}" width="8" height="8" fill="#ffffff"></rect>`;
            }
        }

        svgContent += `</svg>`;
        return svgContent;
    }

    function atualizarSVG() {
        svgContainer.innerHTML = criarSVG(linhas_svg);
    }

    function atualizarGrid() {
        const colunas = parseInt(colunasInput.value);
        const linhas = parseInt(linhasInput.value);
        criarGrid(colunas, linhas, tamanho_pixel, tamanho_pixel);
        atualizarSVG();
    }

    colunasInput.addEventListener("input", atualizarGrid);
    linhasInput.addEventListener("input", atualizarGrid);

    const colunasInicial = parseInt(colunasInput.value);
    const linhasInicial = parseInt(linhasInput.value);
    criarGrid(colunasInicial, linhasInicial, tamanho_pixel, tamanho_pixel);
    atualizarSVG();

});