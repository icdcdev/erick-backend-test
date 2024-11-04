import * as moment from 'moment-timezone';

export default function getCurrentDate(): string {
  return moment.tz('America/Mexico_City').format('YYYY-MM-DDTHH:mm:ss');
}
