const ExemploSVG = {
    "Retangulo":`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <rect
            x="128" y="128"
            width="256" height="256" 
            fill="rgb(235,235,235)" 
            stroke-width="5"
            stroke="rgb(50,50,50)" />
</svg>` ,"Gradiente":`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <defs>
            <linearGradient id="gradiente" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(235,235,235);"/>
                <stop offset="100%" style="stop-color:rgb(50,50,50);"/>
            </linearGradient>
        </defs>
        <rect fill="url(#gradiente)" width="256" height="256" x="128" y="128"/>
</svg>`,"Circulo":`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <circle 
            cx="128" cy="128" 
            r="64" 
            stroke="rgb(50,50,50)" stroke-width="6" fill="rgb(235,235,235)"/>
</svg>`,"Elipse":`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <ellipse 
        cx="128" cy="128"  
        rx="32" ry="64" 
        stroke="rgb(50,50,50)" stroke-width="6" fill="rgb(235,235,235)"/>
</svg>`,"Linha":`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <line 
        x1="0" y1="0" x2="256" y2="256" 
        stroke="rgb(50,50,50)" stroke-width="6"
        stroke-linecap="round"/>
</svg>`,"Poligono":`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <polygon 
            points="50 5 95 35 95 75 50 95 5 75 5 35" 
            stroke="rgb(50,50,50)" stroke-width="6" fill="rgb(235,235,235)"/>
</svg>`,"LinhaPoligono":`
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <polyline 
            points="0,0 64,64 128,64"
            stroke="rgb(50,50,50)" stroke-width="6" fill="none"
            stroke-linecap="butt"/>
</svg>`,"Caminho":`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <path 
            d="M128 0 
               L128 256 
               L256 256  
            Z"/>
</svg>`,"Texto":`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <text 
            x="128" y="128" 
            fill="rgb(50,50,50)">Texto</text>
</svg>`
}