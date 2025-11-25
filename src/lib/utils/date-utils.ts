const DateFormater = {
    toBaseFormat: (date: Date): string => {
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
} as const;


export class DateUtils {
    static Formater = DateFormater;
}