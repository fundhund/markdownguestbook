class MarkdownObject {
    constructor(private text: string) {}

    private parseBlockquote() {
        this.text = this.text
            .replace(/(?<!\\)>([^\n]*)$/gm, '<p style="border-left: 3px solid lightgray; padding-left: 10px;">$1</p>')
            .replace(/\\>/g, '>')
        return this
    }

    private parseHorizontalRule() {
        this.text = this.text.replace(/---/g, '<hr />')
        return this
    }

    private parseHeading() {
        this.text = this.text
            .replace(/(?<![\\#])#{6} (.*?)$/gm, '<h6>$1</h6>')
            .replace(/(?<![\\#])#{5} (.*?)$/gm, '<h5>$1</h5>')
            .replace(/(?<![\\#])#{4} (.*?)$/gm, '<h4>$1</h4>')
            .replace(/(?<![\\#])#{3} (.*?)$/gm, '<h3>$1</h3>')
            .replace(/(?<![\\#])#{2} (.*?)$/gm, '<h2>$1</h2>')
            .replace(/(?<![\\#])# (.*?)$/gm, '<h1>$1</h1>')
            .replace(/\\#/g, '#')
        return this
    }

    private parseList() {
        this.text = this.text
            .replace(/(?<!\\)(\d+)\. (.*?)$/gm, '<li value="$1">$2</li>')
            .replace(/<\/li>\n<li value=/g, '</li><li value=')
            .replace(/(<li value="[^"]*">(.*?)<\/li>)+/g, '<ol>$&</ol>')
            .replace(/(?<!\\)- (.*?)$/gm, '<li>$1</li>')
            .replace(/<\/li>\n<li>/g, '</li><li>')
            .replace(/(<li>(.*?)<\/li>)+/g, '<ul>$&</ul>')
        return this
    }

    private parseBoldAndItalic() {
        this.text = this.text
            .replace(/(?<!\\)__(.*?)(?<!\\)__/gm, '<strong>$1</strong>')
            .replace(/(?<!\\)_(.*?)(?<!\\)_/gm, '<em>$1</em>')
            .replace(/\\_/g, '_')
        return this
    }

    private parseCode() {
        this.text = this.text
            .replace(/(?<!\\)`(.*?)(?<!\\)`/gm, '<span style="background-color: lightgray; padding: 0 5px;">$1</span>')
        return this
    }
    
    private parseNewLine() {
        this.text = this.text.replace(/\n/g, '<br />')
        return this
    }

    public getHtml() {
        return this
            .parseBlockquote()
            .parseHorizontalRule()
            .parseHeading()
            .parseList()
            .parseBoldAndItalic()
            .parseCode()
            .parseNewLine()
            .text
    }
}

export const markdownToHtml = (text: string): string => {
    const markdownObject = new MarkdownObject(text)
    return markdownObject.getHtml()
}

export const removeMarkdown = (text: string): string =>
    text
        .replace(/(?<!\\)_/g, '')
        .replace(/\n/g, ' ')
        .replace(/---/g, '')
