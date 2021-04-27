import moment from 'moment';

function toCDT(utc: string): string {
  return moment.utc(utc).utcOffset(-5).format('hA [CDT] ddd MMM D YYYY');
}

export const TimeUtils = { toCDT };
