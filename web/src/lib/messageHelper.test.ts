import { markupToHtml } from './messageHelper'

test('adds line breaks', () => {
    const expected = 'first line<br />second line'
    const actual = markupToHtml('first line\nsecond line')

    expect(actual).toBe(expected)
})

test('italicizes word', () => {
    const expected = '<em>word</em>'
    const actual = markupToHtml('_word_')

    expect(actual).toBe(expected)
})

test('italicizes phrase', () => {
    const expected = '<em>hello world</em>'
    const actual = markupToHtml('_hello world_')

    expect(actual).toBe(expected)
})
