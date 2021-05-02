import { HttpResponse } from '@angular/common/http';
import moment from 'moment';
import pako from 'pako';

function toCDT(utc: string): string {
  return moment.utc(utc).utcOffset(-5).format('hA [CDT] ddd MMM D YYYY');
}

export const TimeUtils = { toCDT };
