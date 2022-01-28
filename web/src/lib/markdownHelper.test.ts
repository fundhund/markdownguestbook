import { markdownToHtml } from './markdownHelper'

test('adds line breaks', () => {
    const expected = 'first line<br />second line'
    const actual = markdownToHtml('first line\nsecond line')

    expect(actual).toBe(expected)
})

test('italicizes word', () => {
    const expected = '<em>word</em>'
    const actual = markdownToHtml('_word_')

    expect(actual).toBe(expected)
})

test('italicizes phrase', () => {
    const expected = '<em>hello world</em>'
    const actual = markdownToHtml('_hello world_')

    expect(actual).toBe(expected)
})
