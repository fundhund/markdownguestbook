import { markdownToHtml } from './markdownHelper'

test('adds line breaks', () => {
    const expected = 'first line<br />second line'
    const actual = markdownToHtml('first line\nsecond line')
    expect(actual).toBe(expected)
})

test('italicizes word with underscores', () => {
    const expected = '<em>word</em>'
    const actual = markdownToHtml('_word_')
    expect(actual).toBe(expected)
})

test('italicizes phrase with underscores', () => {
    const expected = '<em>hello world</em>'
    const actual = markdownToHtml('_hello world_')
    expect(actual).toBe(expected)
})

test('italicizes word with asterisks', () => {
    const expected = '<em>word</em>'
    const actual = markdownToHtml('*word*')
    expect(actual).toBe(expected)
})

test('italicizes phrase with asterisks', () => {
    const expected = '<em>hello world</em>'
    const actual = markdownToHtml('*hello world*')
    expect(actual).toBe(expected)
})

test('emboldens word with underscores', () => {
    const expected = '<strong>word</strong>'
    const actual = markdownToHtml('__word__')
    expect(actual).toBe(expected)
})

test('emboldens phrase with underscores', () => {
    const expected = '<strong>hello world</strong>'
    const actual = markdownToHtml('__hello world__')
    expect(actual).toBe(expected)
})

test('emboldens word with asterisks', () => {
    const expected = '<strong>word</strong>'
    const actual = markdownToHtml('**word**')
    expect(actual).toBe(expected)
})

test('emboldens phrase with asterisks', () => {
    const expected = '<strong>hello world</strong>'
    const actual = markdownToHtml('**hello world**')
    expect(actual).toBe(expected)
})

test('parses escaped underscores', () => {
    const expected = '_hello world_'
    const actual = markdownToHtml('\\_hello world\\_')
    expect(actual).toBe(expected)
})

test('parses escaped asterisks', () => {
    const expected = '*hello world*'
    const actual = markdownToHtml('\\*hello world\\*')
    expect(actual).toBe(expected)
})

test('parses code span', () => {
    const expected = '<span style="background-color: lightgray; padding: 0 5px; font-family: \'Courier New\', monospace;">some code</span>'
    const actual = markdownToHtml('`some code`')
    expect(actual).toBe(expected)
})

test('parses heading h1', () => {
    const expected = '<h1>heading</h1>'
    const actual = markdownToHtml('# heading')
    expect(actual).toBe(expected)
})

test('parses heading h2', () => {
    const expected = '<h2>heading</h2>'
    const actual = markdownToHtml('## heading')
    expect(actual).toBe(expected)
})

test('parses heading h3', () => {
    const expected = '<h3>heading</h3>'
    const actual = markdownToHtml('### heading')
    expect(actual).toBe(expected)
})

test('parses heading h4', () => {
    const expected = '<h4>heading</h4>'
    const actual = markdownToHtml('#### heading')
    expect(actual).toBe(expected)
})

test('parses heading h5', () => {
    const expected = '<h5>heading</h5>'
    const actual = markdownToHtml('##### heading')
    expect(actual).toBe(expected)
})

test('parses heading h6', () => {
    const expected = '<h6>heading</h6>'
    const actual = markdownToHtml('###### heading')
    expect(actual).toBe(expected)
})

test('does not parse heading if space is missing', () => {
    const expected = '#heading'
    const actual = markdownToHtml('#heading')
    expect(actual).toBe(expected)
})

test('does not parse more than six number signs', () => {
    const expected = '####### heading'
    const actual = markdownToHtml('####### heading')
    expect(actual).toBe(expected)
})

test('parses horizontal rule with minus signs', () => {
    const expected = '<hr />'
    const actual = markdownToHtml('---')
    expect(actual).toBe(expected)
})

test('parses horizontal rule with underscores', () => {
    const expected = '<hr />'
    const actual = markdownToHtml('___')
    expect(actual).toBe(expected)
})

test('parses horizontal rule with asterisks', () => {
    const expected = '<hr />'
    const actual = markdownToHtml('***')
    expect(actual).toBe(expected)
})

test('parses bold and italic text', () => {
    const expected = '<em><strong>bold and italic</strong></em>'
    const actual = markdownToHtml('***bold and italic***')
    expect(actual).toBe(expected)
})

const bqStart = '<blockquote style="border-left: 3px solid lightgray; padding-left: 10px; margin: 0;">'
const bqEnd = '</blockquote>'

test('parses blockquote', () => {
    const expected = `${bqStart}This is a quote${bqEnd}`
    const actual = markdownToHtml('> This is a quote')
    expect(actual).toBe(expected)
})

test('parses nested blockquote', () => {
    const expected = `${bqStart}one${bqEnd}${bqStart.repeat(2)}two${bqEnd.repeat(2)}${bqStart.repeat(3)}three${bqEnd.repeat(3)}`
    const actual = markdownToHtml('> one\n> > two\n> > > three')
    expect(actual).toBe(expected)
})

test('parses unordered list', () => {
    const expected = '<ul><li>one</li><li>two</li><li>three</li></ul>'
    const actual = markdownToHtml('- one\n- two\n- three')
    expect(actual).toBe(expected)
})

test('parses ordered list', () => {
    const expected = '<ol><li value="1">one</li><li value="2">two</li><li value="3">three</li></ol>'
    const actual = markdownToHtml('1. one\n2. two\n3. three')
    expect(actual).toBe(expected)
})

test('parses ordered with custom values', () => {
    const expected = '<ol><li value="13">one</li><li value="15">two</li><li value="17">three</li></ol>'
    const actual = markdownToHtml('13. one\n15. two\n17. three')
    expect(actual).toBe(expected)
})

test('parses strikethrough', () => {
    const expected = '<s>one</s> two'
    const actual = markdownToHtml('~~one~~ two')
    expect(actual).toBe(expected)
})

test('parses superscript', () => {
    const expected = 'x<sup>2</sup>'
    const actual = markdownToHtml('x^2^')
    expect(actual).toBe(expected)
})

test('parses subscript', () => {
    const expected = 'H<sub>2</sub>O'
    const actual = markdownToHtml('H~2~O')
    expect(actual).toBe(expected)
})

test('parses link', () => {
    const expected = '<a href="http://www.example.com" target="_blank">title</a>'
    const actual = markdownToHtml('[title](http://www.example.com)')
    expect(actual).toBe(expected)
})

test('parses image', () => {
    const expected = '<img src="image_url" alt="alt" style="max-width: 100%;"/>'
    const actual = markdownToHtml('![alt](image_url)')
    expect(actual).toBe(expected)
})

test('parses code block', () => {
    const expected = '<div style="background-color: lightgray; padding: 5px; font-family: \'Courier New\', monospace;">some<br />code<br />block<br /></div>'
    const actual = markdownToHtml('```\nsome\ncode\nblock\n```')
    expect(actual).toBe(expected)
})
