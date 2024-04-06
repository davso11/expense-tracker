import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/fr';

dayjs.locale('fr');
dayjs.extend(isLeapYear);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

export { dayjs };
