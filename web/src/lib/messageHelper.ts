export const markupToHtml = (text: string): string =>
    text
        .replace(/\n/g, '<br />')
        .replace(/(?<!\\)__(.*?)(?<!\\)__/gm, '<strong>$1</strong>')
        .replace(/(?<!\\)_(.*?)(?<!\\)_/gm, '<em>$1</em>')
        .replace(/\\_/g, '_')
