document.getElementById('BotaoOtimizar').addEventListener('click', () => {
  const svg = salvo.abas[aba_atual].conteudo;
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const svgElement = doc.documentElement;

  const elements = svgElement.querySelectorAll('rect, circle, ellipse, polygon, polyline');
  elements.forEach(element => {
    if (element.tagName === 'rect') {
      atualizar_svg(rect_para_path(element, svgElement));
    } else if (element.tagName === 'circle') {
      atualizar_svg(circle_para_path(element, svgElement));
    } else if (element.tagName === 'ellipse') {
      atualizar_svg(ellipse_para_path(element, svgElement));
    } else if (element.tagName === 'polygon') {
      atualizar_svg(polygon_para_path(element, svgElement));
    } else if (element.tagName === 'polyline') {
      atualizar_svg(polyline_para_path(element, svgElement));
    }
  });
});

function rect_para_path(rect, svgElement) {
  const x = parseFloat(rect.getAttribute('x')) || 0;
  const y = parseFloat(rect.getAttribute('y')) || 0;
  const width = parseFloat(rect.getAttribute('width')) || 0;
  const height = parseFloat(rect.getAttribute('height')) || 0;
  const fill = rect.getAttribute('fill') || 'none';
  const stroke = rect.getAttribute('stroke') || 'none';
  const strokeWidth = rect.getAttribute('stroke-width') || '1';

  const d = `M${x} ${y} L${x + width} ${y} L${x + width} ${y + height} L${x} ${y + height}Z`;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", stroke);
  path.setAttribute("stroke-width", strokeWidth);

  rect.replaceWith(path);
  return new XMLSerializer().serializeToString(svgElement);
}

function circle_para_path(circle, svgElement) {
  const cx = parseFloat(circle.getAttribute('cx')) || 0;
  const cy = parseFloat(circle.getAttribute('cy')) || 0;
  const r = parseFloat(circle.getAttribute('r')) || 0;
  const fill = circle.getAttribute('fill') || 'none';
  const stroke = circle.getAttribute('stroke') || 'none';
  const strokeWidth = circle.getAttribute('stroke-width') || '1';

  const d = `
    M${cx - r} ${cy} 
    A${r} ${r} 0 1 0 ${cx + r} ${cy} 
    A${r} ${r} 0 1 0 ${cx - r} ${cy}Z`;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d.trim());
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", stroke);
  path.setAttribute("stroke-width", strokeWidth);

  circle.replaceWith(path);
  return new XMLSerializer().serializeToString(svgElement);
}

function ellipse_para_path(ellipse, svgElement) {
  const cx = parseFloat(ellipse.getAttribute('cx')) || 0;
  const cy = parseFloat(ellipse.getAttribute('cy')) || 0;
  const rx = parseFloat(ellipse.getAttribute('rx')) || 0;
  const ry = parseFloat(ellipse.getAttribute('ry')) || 0;
  const fill = ellipse.getAttribute('fill') || 'none';
  const stroke = ellipse.getAttribute('stroke') || 'none';
  const strokeWidth = ellipse.getAttribute('stroke-width') || '1';

  const d = `
    M${cx - rx} ${cy} 
    A${rx} ${ry} 0 1 0 ${cx + rx} ${cy} 
    A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d.trim());
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", stroke);
  path.setAttribute("stroke-width", strokeWidth);

  ellipse.replaceWith(path);
  return new XMLSerializer().serializeToString(svgElement);
}

function polygon_para_path(polygon, svgElement) {
  const points = polygon.getAttribute('points') || '';
  const fill = polygon.getAttribute('fill') || 'none';
  const stroke = polygon.getAttribute('stroke') || 'none';
  const strokeWidth = polygon.getAttribute('stroke-width') || '1';
  const pointArray = points.trim().split(/\s+/);
  const d = `M${pointArray[0]} ${pointArray[1]} ` + pointArray.slice(2).map((p, i) => (i % 2 === 0 ? ` L${p}` : ` ${p}`)).join('') + 'Z';
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", stroke);
  path.setAttribute("stroke-width", strokeWidth);
  polygon.replaceWith(path);
  return new XMLSerializer().serializeToString(svgElement);
}

function polyline_para_path(polyline, svgElement) {
  const points = polyline.getAttribute('points') || '';
  const fill = polyline.getAttribute('fill') || 'none';
  const stroke = polyline.getAttribute('stroke') || 'none';
  const strokeWidth = polyline.getAttribute('stroke-width') || '1';
  const pointArray = points.trim().split(/\s+/);
  const d = `M${pointArray[0]} ${pointArray[1]} ` + pointArray.slice(2).map((p, i) => (i % 2 === 0 ? ` L${p}` : ` ${p}`)).join('');
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", stroke);
  path.setAttribute("stroke-width", strokeWidth);
  polyline.replaceWith(path);
  return new XMLSerializer().serializeToString(svgElement);
}
