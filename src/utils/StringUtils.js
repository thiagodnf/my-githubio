import RegexUtils from "./RegexUtils";

class StringUtils {

    static getScreenshotUrl(str) {

        if (!str || str.length === 0) {
            return null;
        }

        const htmlImageWithClass = StringUtils.getHTMLImageWithClass(str);

        if (htmlImageWithClass) return htmlImageWithClass;

        const markdownImage = StringUtils.getMarkdownImage(str);

        if (markdownImage) return markdownImage;

        const htmlImage = StringUtils.getHTMLImage(str);

        if (htmlImage) return htmlImage;

        return null;
    }

    static getHTMLImage(str) {

        if (!str || str.length === 0) {
            return null;
        }

        const regex = /<img.*src=\"(https?:\/\/.*\.(?:png|jpg|gif))\".*\/>/gm;

        return RegexUtils.getFirstMatch(str, regex);
    }

    static getHTMLImageWithClass(str) {

        if (!str || str.length === 0) {
            return null;
        }

        const regex = /<img.*class=\"screenshot\".*src=\"(https?:\/\/.*\.(?:png|jpg|gif))\".*\/>/gm;

        return RegexUtils.getFirstMatch(str, regex);
    }

    static getMarkdownImage(str) {

        if (!str || str.length === 0) {
            return null;
        }

        const regex = /\!\[.*\]\((.*)\)/gm;

        return RegexUtils.getFirstMatch(str, regex);
    }
}

export default StringUtils;
