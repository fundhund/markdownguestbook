const regex = {
    underscoresInLinksAndImages: /(?<=\[[^\]]*\]\([^)]*)_(?=[^)\n]*\))/gm,
    htmlTags: /<\/?\w+[^>]*>/g,
}

class MarkdownObject {
    constructor(private text: string) {}

    private parseBlockquote() {
        const attributes = 'style="border-left: 3px solid lightgray; padding-left: 10px; margin: 0;"'

        let pattern = '(?<!<[^>]*[^>]|\\\\)> ([^\\n]*)'
        let replacement = `<blockquote ${attributes}>$1</blockquote>`
        let re = new RegExp(pattern, 'gm')

        while (this.text.match(re)) {
            this.text = this.text.replace(re, replacement)
            pattern = `<blockquote [^>]*>${pattern}<\\/blockquote>`
            replacement = `<blockquote ${attributes}>${replacement}</blockquote>`
            re = new RegExp(pattern, 'gm')
        }

        this.text = this.text.replace(/<\/blockquote>\n*<blockquote/g, '</blockquote><blockquote')

        return this
    }

    private parseHorizontalRule() {
        this.text = this.text
            .replace(/^---$/gm, '<hr />')
            .replace(/^\*\*\*$/gm, '<hr />')
            .replace(/^___$/gm, '<hr />')
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
            .replace(regex.underscoresInLinksAndImages, '\\_')
            .replace(/((?<!\\)_){2}([^_].*?)((?<!\\)_){2}/gm, '<strong>$2</strong>')
            .replace(/(?<!\\)_(?!blank")(.*?)(?<!\\)_(?!blank")/gm, '<em>$1</em>')
            .replace(/((?<!\\)\*){2}([^*].*?)((?<!\\)\*){2}/gm, '<strong>$2</strong>')
            .replace(/(?<!\\)\*(.*?)(?<!\\)\*/gm, '<em>$1</em>')
            .replace(/\\_/g, '_')
            .replace(/\\\*/g, '*')
        return this
    }
    
    private parseNewLine() {
        this.text = this.text.replace(/\n/g, '<br />')
        return this
    }

    private parseStrikethrough() {
        this.text = this.text.replace(/~~([^~]*)~~/gm, '<s>$1</s>')
        return this
    }

    private parseSubscript() {
        this.text = this.text.replace(/~([^~]*)~/gm, '<sub>$1</sub>')
        return this
    }

    private parseSuperscript() {
        this.text = this.text.replace(/\^([^^]*)\^/gm, '<sup>$1</sup>')
        return this
    }

    private parseEscapeCharacters() {
        this.text = this.text
            .replace(/\\>/g, '>')
        return this
    }

    private parseLink() {
        this.text = this.text
            .replace(regex.underscoresInLinksAndImages, '\\_')
            .replace(/(?<!!)\[([^\]\n]*)\]\(([^)\n]*)\)/g, '<a href="$2" target="_blank">$1</a>')
        return this
    }

    private parseImage() {
        this.text = this.text.replace(/!\[([^\]\n]*)\]\(([^)\n]*)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;"/>')
        return this
    }

    private parseCode() {
        this.text = this.text
            .replace(/(?<!\\|`)`(.*?)(?<!\\|`)`/gm, '<span style="background-color: lightgray; padding: 0 5px; font-family: \'Courier New\', monospace;">$1</span>')
            .replace(/((?<!\\)`){3}\n((.*\n)+)((?<!\\)`){3}/gm, '<div style="background-color: lightgray; padding: 5px; font-family: \'Courier New\', monospace;">$2</div>')
            .replace(/\\`/g, '`')
        return this
    }

    public getHtml() {
        return this
            .parseLink()
            .parseImage()
            .parseList()
            .parseBlockquote()
            .parseHorizontalRule()
            .parseBoldAndItalic()
            .parseHeading()
            .parseCode()
            .parseNewLine()
            .parseStrikethrough()
            .parseSubscript()
            .parseSuperscript()
            .parseEscapeCharacters()
            .text
    }
}

export const markdownToHtml = (text: string): string => {
    const markdownObject = new MarkdownObject(removeHtml(text))
    return markdownObject.getHtml()
}

export const removeHtml = (text: string): string => {
    while (text.match(regex.htmlTags)) {
        text = text.replace(regex.htmlTags, '')
    }
    return text
}
