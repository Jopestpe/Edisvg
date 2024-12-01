
const EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
const div_vizualizar_svg = document.getElementById('vizualizar_svg');
const div_texto_svg = document.getElementById('texto_svg');
const criar_aba = document.getElementById('criar_aba');
const div_abas = document.getElementById('abas');
const BotaoCorFundo = document.getElementById('BotaoCorFundo');
const CorFundo = document.getElementById('CorFundo');
//
const svg_padrao = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect
        x="128" y="128"
        width="256" height="256" 
        fill="rgb(235,235,235)" 
        stroke-width="5"
        stroke="rgb(50,50,50)" 
    />
</svg>`;
const salvo = { abas: [{ nome: "Nova aba", conteudo: svg_padrao }] };
div_texto_svg.value = '';
let aba_atual = 1;
//
recarregar_abas();
document.querySelector('.aba').click();
//
criar_aba.addEventListener('click', () => {
    const nome_padrao = `Nova Aba ${salvo.abas.length + 1}`;
    salvo.abas.push({
        nome: nome_padrao,
        conteudo: svg_padrao
    });
    recarregar_abas();
    aba_atual = salvo.abas.length - 1;
    atualizar_svg(svg_padrao);
    const abas = document.querySelectorAll('.aba');
    abas[abas.length - 1].click();
});
document.getElementById('BotaoEntradaDeArquivo').addEventListener('click', () => {
    EntradaDeArquivo.click();
});
EntradaDeArquivo.addEventListener('change', () => {
    const arquivos = Array.from(EntradaDeArquivo.files);
    arquivos.forEach((arquivo, indice) => {
        const leitor = new FileReader();
        leitor.onload = (evento) => {
            salvo.abas.push({
                nome: arquivo.name,
                conteudo: evento.target.result
            });
            if (indice === arquivos.length - 1) {
                recarregar_abas();
            }
        };
        leitor.readAsText(arquivo);
    });
});
function recarregar_abas() {
    div_abas.innerHTML = '';
    const fragmento = document.createDocumentFragment();
    salvo.abas.forEach((aba, indice) => {
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
        div_vizualizar_svg.style.border = '2px solid var(--cor-vermelha)';
        return;
    }
    div_vizualizar_svg.style.border = '2px solid transparent';
    div_vizualizar_svg.innerHTML = '';
    div_vizualizar_svg.appendChild(doc.documentElement);
    div_texto_svg.value = svg;
    salvo.abas[aba_atual].conteudo = svg;
}
div_texto_svg.addEventListener("input", () => {
    atualizar_svg(div_texto_svg.value);
});
function configurarBotaoCor(botao, input, callback) {
    botao.addEventListener('click', () => input.click());
    input.addEventListener('input', callback);
}
configurarBotaoCor(BotaoCorFundo, CorFundo, () => {
    div_vizualizar_svg.style.backgroundColor = CorFundo.value;
    BotaoCorFundo.style.backgroundColor = CorFundo.value;
});
function adicionar_exemplo() {
    let atual = salvo?.abas[aba_atual]?.conteudo;
    if (!atual) { return }
    let svg = div_vizualizar_svg.querySelector('svg');
    const elemento = selecionar_elemento.value;
    adicionar_elemento(elemento);
    const novoSvg = new XMLSerializer().serializeToString(svg);
    atualizar_svg(novoSvg);
} 
document.getElementById('BotaoBaixar').addEventListener('click', function() {
    salvo.abas.forEach((aba) => {
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
document.getElementById('BotaoBaixarPNG').addEventListener('click', function() {
    salvo.abas.forEach((aba) => {
        const svgData = aba.conteudo;
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = function() {
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
