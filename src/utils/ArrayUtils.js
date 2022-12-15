class ArrayUtils {

    static filter(array, searchTerm = "") {

        return array.filter(item => {

            if (!searchTerm) {
                return true;
            }

            let str = `${item.repo} ${item.description} ${item.language} ${item.topics.join(" ")}`;

            return str.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    static sort(array, sortKey = "", sortDirection = 1) {

        array.sort((a, b) => {

            let v1 = a[sortKey];
            let v2 = b[sortKey];

            if (typeof v1 === "string") {
                v1 = new Date(v1);
            }

            if (typeof v2 === "string") {
                v2 = new Date(v2);
            }

            let diff = 0;

            if ((v1 instanceof Date) && (v2 instanceof Date)) {
                diff = v1.getTime() - v2.getTime();
            } else {
                diff = v1 - v2;
            }

            if (sortDirection === -1) {
                return diff;
            } else {
                return diff * -1;
            }
        });

        return array;
    }
}


export default ArrayUtils;
