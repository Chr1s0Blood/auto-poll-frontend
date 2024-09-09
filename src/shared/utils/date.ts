import { format } from "date-fns";

export const DateFormat = {
    formatDateToBrazilianFormat (date: string | number | Date, includeHour = false) {

        if (includeHour) {
            return format(date, "dd/MM/yyyy 'às' HH:mm");
        }
        return format(date, "dd/MM/yyyy");

    }
}
