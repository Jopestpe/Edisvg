const div_vizualizar_svg = document.getElementById('pixel_svg');
const criar_aba = document.getElementById('criar_aba');
const div_abas = document.getElementById('abas');
const BotaoCorPixel = document.getElementById('BotaoCorPixel');
const CorPixel = document.getElementById('CorPixel');
const BotaoCorFundo = document.getElementById('BotaoCorFundo');
const CorFundo = document.getElementById('CorFundo');
const BotaoBorracha = document.getElementById('BotaoBorracha')
//
let svg_padrao = `<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5"></svg>`;
const pixel_salvo = { abas: [{ nome: "Nova aba", conteudo: svg_padrao }] };
let aba_atual = 1;
let tamanho_grade = document.getElementById('TamanhoGrade').value;
let tamanho_svg = document.getElementById('TamanhoSVG').value;
let cor_pixel = document.getElementById('CorPixel').value;
let desenhando = false;
let intervalo;
let borracha = false;
//
recarregar_abas();
document.querySelector('.aba').click();
//
criar_aba.addEventListener('click', () => {
    const nome_padrao = `Nova Aba ${pixel_salvo.abas.length + 1}`;
    pixel_salvo.abas.push({
        nome: nome_padrao,
        conteudo: svg_padrao
    });
    recarregar_abas();
    aba_atual = pixel_salvo.abas.length - 1;
    atualizar_svg(svg_padrao);
    const abas = document.querySelectorAll('.aba');
    abas[abas.length - 1].click();
});
function recarregar_abas() {
    div_abas.innerHTML = '';
    const fragmento = document.createDocumentFragment();
    pixel_salvo.abas.forEach((aba, indice) => {
        const divAba = document.createElement('div');
        divAba.className = 'aba';
        divAba.textContent = aba.nome;
        divAba.addEventListener('click', () => {
            aba_atual = indice;
            atualizar_svg(aba.conteudo);
            document.querySelectorAll('.aba').forEach(aba => aba.classList.remove('aba_atual'));
            divAba.classList.add('aba_atual');
        });
        fragmento.appendChild(divAba);
    });
    div_abas.appendChild(fragmento);
}
function atualizar_svg(svg) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const parseError = doc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
        div_vizualizar_svg.style.border = '2px solid red';
        return;
    }
    div_vizualizar_svg.style.border = '2px solid var(--cor-borda)';
    div_vizualizar_svg.innerHTML = '';
    div_vizualizar_svg.appendChild(doc.documentElement);
    pixel_salvo.abas[aba_atual].conteudo = svg;
}
function configurarBotaoCor(botao, input, callback) {
    botao.addEventListener('click', () => input.click());
    input.addEventListener('input', callback);
}
configurarBotaoCor(BotaoCorFundo, CorFundo, () => {
    div_vizualizar_svg.style.backgroundColor = CorFundo.value;
    BotaoCorFundo.style.backgroundColor = CorFundo.value;
});
configurarBotaoCor(BotaoCorPixel, CorPixel, () => {
    cor_pixel = CorPixel.value;
    BotaoCorPixel.style.backgroundColor = CorPixel.value;
});
function adicionar_exemplo() {
    let atual = pixel_salvo?.abas[aba_atual]?.conteudo;
    if (!atual) { return }
    let svg = div_vizualizar_svg.querySelector('svg');
    const elemento = selecionar_elemento.value;
    adicionar_elemento(elemento);
    const novoSvg = new XMLSerializer().serializeToString(svg);
    atualizar_svg(novoSvg);
}
document.getElementById('BotaoBaixar').addEventListener('click', function () {
    pixel_salvo.abas.forEach((aba) => {
        const nomeArquivo = aba.nome.endsWith('.svg') ? aba.nome : `${aba.nome}.svg`;
        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(aba.conteudo));
        link.setAttribute('download', nomeArquivo);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
document.getElementById('BotaoBaixarPNG').addEventListener('click', function () {
    pixel_salvo.abas.forEach((aba) => {
        const svgData = aba.conteudo;
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `${aba.nome.replace('.svg', '.png')}`;
            link.click();
            URL.revokeObjectURL(url);
        };
        img.src = url;
    });
});
function atualizarValor(id, valor) {
    const input = document.getElementById(id);
    input.value = parseFloat(input.value) + valor;
    atualizarVariavel(id);
}
function atualizarVariavel(id) {
    const input = document.getElementById(id);
    let valor = parseInt(input.value);
    input.value = valor;
    switch (id) {
        case 'TamanhoGrade':
            tamanho_grade = valor;
            alterar_tamanho_svg()
            break;
        case 'TamanhoSVG':
            tamanho_svg = valor;
            alterar_tamanho_svg()
            break;
    }
}
function iniciarRepeticao(id, valor) {
    intervalo = setInterval(() => {
        atualizarValor(id, valor);
    }, 100);
}
function pararRepeticao() {
    clearInterval(intervalo);
}
document.querySelectorAll('.seta').forEach((botao) => {
    botao.addEventListener('mousedown', (e) => {
        const id = e.target.parentNode.querySelector('.numeral').id;
        const valor = e.target.textContent === '◀' ? -1 : 1;
        iniciarRepeticao(id, valor);
    });
    botao.addEventListener('mouseup', () => {
        pararRepeticao();
    });
    botao.addEventListener('mouseout', () => {
        pararRepeticao();
    });
});
document.querySelectorAll('.numeral').forEach((input) => {
    input.addEventListener('input', () => {
        atualizarVariavel(input.id);
    });
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'e' || e.key === 'E') {
        BotaoBorracha.click();
    }
});
BotaoBorracha.addEventListener('click', () => {
    borracha = !borracha;
    if (borracha) {
        BotaoBorracha.style.border = '2px solid var(--cor-azul)';
    } else {
        BotaoBorracha.style.border = 'var(--borda-normal)';
    }
});
function alterar_tamanho_svg() {
    const novoSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    novoSvg.setAttribute('width', tamanho_svg);
    novoSvg.setAttribute('height', tamanho_svg);
    novoSvg.setAttribute('viewBox', `0 0 ${tamanho_svg} ${tamanho_svg}`);
    novoSvg.innerHTML = svg_padrao; // Use o svg_padrao em vez do svg atual
    div_vizualizar_svg.innerHTML = '';
    div_vizualizar_svg.appendChild(novoSvg);
    svg_padrao = novoSvg;
    const novoSvgSerializado = new XMLSerializer().serializeToString(novoSvg);
    atualizar_svg(novoSvgSerializado);
}
div_vizualizar_svg.addEventListener('mousedown', (event) => {
    desenhando = true;
    desenharPixel(event);
});
div_vizualizar_svg.addEventListener('mousemove', (event) => {
    if (desenhando) {
        desenharPixel(event);
    }
});
div_vizualizar_svg.addEventListener('mouseup', () => {
    desenhando = false;
});
div_vizualizar_svg.addEventListener('mouseleave', () => {
    desenhando = false;
});
function desenharPixel(event) {
    const svg = div_vizualizar_svg.querySelector('svg');
    const rect = svg.getBoundingClientRect();
    const escalaX = svg.viewBox.baseVal.width / rect.width;
    const escalaY = svg.viewBox.baseVal.height / rect.height;
    let x = (event.clientX - rect.left) * escalaX;
    let y = (event.clientY - rect.top) * escalaY;
    x = Math.floor(x / tamanho_grade) * tamanho_grade;
    y = Math.floor(y / tamanho_grade) * tamanho_grade;
    const svgElement = div_vizualizar_svg.querySelector('svg');
    const rects = svgElement.querySelectorAll('rect');
    Array.from(rects).some(rect => {
        const rectX = parseFloat(rect.getAttribute('x'));
        const rectY = parseFloat(rect.getAttribute('y'));
        if (rectX === x && rectY === y) {
            rect.remove();
            const novoSvg = new XMLSerializer().serializeToString(svgElement);
            atualizar_svg(novoSvg);
        }
    });
    if (borracha) { return; }
    const novoRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    novoRect.setAttribute('x', x);
    novoRect.setAttribute('y', y);
    novoRect.setAttribute('width', tamanho_grade);
    novoRect.setAttribute('height', tamanho_grade);
    novoRect.setAttribute('fill', cor_pixel);
    svgElement.appendChild(novoRect);
    const novoSvg = new XMLSerializer().serializeToString(svgElement);
    atualizar_svg(novoSvg);
}

