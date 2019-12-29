
export class Utils {

    static formatDate(d: any) {
        if (d == null || d === 'undefined') {
            return ""
        }
        let date = new Date(d)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return date.getDate().toString() + "/" + months[date.getMonth()] + "/" + date.getFullYear().toString()
    }

    static formatDateForEdit(d: any) {
        const date = new Date(d)
        // const frmDate = (new Intl.DateTimeFormat("en-GB", { year: 'numeric', month: 'short', day: '2-digit' } )).format(date)
        const dateAsString = date.getFullYear().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getDate().toString()
        return dateAsString
    }

    static formatAmount(a: number) {
        const dp = 2
        var w = a.toFixed(dp), k = (w as any) | 0, b = a < 0 ? 1 : 0,
            u = Math.abs((w as any) - k), d = ('' + u.toFixed(dp)).substr(2, dp),
            s = '' + k, i = s.length, r = '';
        while ((i -= 3) > b) { r = ',' + s.substr(i, 3) + r; }
        return "\u20AC " + s.substr(0, i + 3) + r + (d ? '.' + d : '');
    }

    static dateSorter(a: any, b: any, desc: boolean) {
        // force null and undefined to the bottom
        a = a === null || a === undefined ? -Infinity : a
        b = b === null || b === undefined ? -Infinity : b

        let aDate = new Date(a)
        let bDate = new Date(b)

        if (aDate > bDate) {
            return desc ? -1 : 1
        }
        if (aDate < bDate) {
            return desc ? 1 : -1
        }
        // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
        return 0
    }

}