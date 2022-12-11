class RegexUtils {

    static getFirstMatch(str, regex) {

        const matches = RegexUtils.getGroups(str, regex);

        if (!matches || matches.length == 0) {
            return null;
        }

        return matches[0];
    }

    static getGroups(str, regex) {

        if (!str || str.length === 0) {
            return null;
        }

        if (!regex || regex.length === 0) {
            return null;
        }

        const matches = str.matchAll(regex);

        const output = [];

        for (const match of matches) {
            // the end index is not included so we can use match.length
            output.push(match.slice(1, match.length));
        }

        return output;
    }
}

export default RegexUtils;
