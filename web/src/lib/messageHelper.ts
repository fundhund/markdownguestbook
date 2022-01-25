export const markupToHtml = (text: string): string =>
    text
        .replace(/---/g, '<hr />')
        .replace(/\n/g, '<br />')
        .replace(/(?<!\\)__(.*?)(?<!\\)__/gm, '<strong>$1</strong>')
        .replace(/(?<!\\)_(.*?)(?<!\\)_/gm, '<em>$1</em>')
        .replace(/\\_/g, '_')

export const removeMarkup = (text: string): string =>
    text
        .replace(/(?<!\\)_/g, '')
        .replace(/\n/g, ' ')
        .replace(/---/g, '')
