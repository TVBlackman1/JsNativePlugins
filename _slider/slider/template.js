export function handleTemplate(template) {
    const $templateInner = template.innerHTML

    template.innerHTML = '<div class="slider-content"></div>'

    const $content = template.querySelector('.slider-content')
    $content.innerHTML = $templateInner

    const $ul = $content.querySelector('ul')
    $ul.classList.remove(...$ul.classList)
    $ul.classList.add('slider-content-ul')

    const $contentElems = $content.querySelectorAll('li')
    $contentElems.forEach(($li => {
        $li.classList.remove(...$li.classList)
        $li.classList.add('slider-content-li')
    }))

    addNavigation(template, $contentElems.length)

}

function addNavigation(template, count) {
    let templateHtml = '<div class="slider-nav">'
    for(let i = 0; i < count; i++) {
        templateHtml += '<div class="slider-nav-elem"></div>'
    }
    templateHtml += '</div>'

    template.innerHTML += templateHtml
}

function editList(template) {

}