export const markupToHtml = (text: string): string =>
    text
        .replace(/>([^\n]*)\n/g, '<p style="border-left: 2px solid lightgray; padding-left: 10px;">$1</p>')
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
