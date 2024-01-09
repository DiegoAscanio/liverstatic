/*
Script para mudar dinamicamente o tamanho do texto de cada elemento.
*/

// Função para calcular em pixels a largura e altura do texto
function textShape(text, fontsize) {
	var tag = document.createElement('div');
	tag.style.position = 'absolute';
	tag.style.left = '-99in';
	tag.style.whiteSpace = 'nowrap';
	tag.style.fontSize = fontsize;
	tag.innerHTML = text;
	
	document.body.appendChild(tag);
	var w = tag.clientWidth;
	var h = tag.clientHeight;
	document.body.removeChild(tag);
	return {width: w, height: h};
}

// Função para retornar em pixels as dimensões (altura e largura) do elemento
function elementShape(element) {
	// retorno o tamanho do elemento pela sua propriedade CSS
	return {
		'width': window.parseInt(
			window.getComputedStyle(
				element
			).width.replace(
				'px', ''
			)
		),
		'height': window.parseInt(
			window.getComputedStyle(
				element
			).height.replace(
				'px', ''
			)
		)
	}
}

// Função para mudar o tamanho do texto de um elemento se ele exceder seu tamanho CSS

function changeFontSize(element) {
	// pego o tamanho do elemento
	var elementSize = elementShape(element);
	// pego o tamaho de sua fonte
	var fontSize = window.getComputedStyle(element).fontSize;
	// pego o tamanho do texto
	var textSize = textShape(element.innerHTML, fontSize);
	// Enquanto o tamanho do texto for maior que o tamanho do elemento
	while (
		textSize.width > elementSize.width - 0.1 * elementSize.width || 
		textSize.height > elementSize.height - 0.1 * elementSize.height
	) {
		// diminuo 1px do tamanho da fonte
		fontSize = (window.parseInt(fontSize.replace('px', '')) - 2) + 'px';
		// recalculo o tamanho do texto
		textSize = textShape(element.innerHTML, fontSize);
	}
	// mudo o tamanho da fonte do elemento
	element.style.fontSize = fontSize;
}

function changeElementsFontSize () {
    var elements = document.getElementsByClassName('texto');
    for (var i = 0; i < elements.length; i ++) {
        changeFontSize(elements[i]);
    }
};
