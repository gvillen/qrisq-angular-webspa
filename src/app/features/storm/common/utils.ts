import { HttpResponse } from '@angular/common/http';
import moment from 'moment';
import pako from 'pako';

function toCDT(utc: string): string {
  return moment.utc(utc).utcOffset(-5).format('hA [CDT] ddd MMM D YYYY');
}

export function getESRISurgeLevelColor(depth: number) {
  if (depth < 1) {
    return '#004343ff';
  }
  if (depth < 1.5) {
    return '#00fefeff';
  }
  if (depth < 2) {
    return '#00d0a2ff';
  }
  if (depth < 2.5) {
    return '#00a245ff';
  }
  if (depth < 3) {
    return '#ffff00ff';
  }
  if (depth < 3.5) {
    return '#ffe600ff';
  }
  if (depth < 4) {
    return '#ffd300ff';
  }
  if (depth < 4.5) {
    return '#ffbf00ff';
  }
  if (depth < 5) {
    return '#ffab00ff';
  }
  if (depth < 5.5) {
    return '#ff9300ff';
  }
  if (depth < 6) {
    return '#ff7f00ff';
  }
  if (depth < 6.5) {
    return '#ff6b00ff';
  }
  if (depth < 7) {
    return '#ff5600ff';
  }
  if (depth < 7.5) {
    return '#ff3d00ff';
  }
  if (depth < 8) {
    return '#ff2900ff';
  }
  if (depth < 8.5) {
    return '#ff1400ff';
  }
  if (depth < 9) {
    return '#ff0000ff';
  }
  if (depth < 9.5) {
    return '#e50000ff';
  }
  if (depth < 10) {
    return '#d00000ff';
  }
  if (depth < 10.5) {
    return '#bb0000ff';
  }
  if (depth < 11) {
    return '#a70000ff';
  }
  if (depth < 11.5) {
    return '#8d0000ff';
  }
  if (depth < 12) {
    return '#820082ff';
  }
  if (depth < 12.5) {
    return '#8c098cff';
  }
  if (depth < 13) {
    return '#961296ff';
  }
  if (depth < 13.5) {
    return '#a31da3ff';
  }
  if (depth < 14) {
    return '#ad27adff';
  }
  if (depth < 14.5) {
    return '#b730b7ff';
  }
  if (depth < 15) {
    return '#c139c1ff';
  }
  if (depth < 15.5) {
    return '#ce44ceff';
  }
  if (depth < 16) {
    return '#d84dd8ff';
  }
  if (depth < 16.5) {
    return '#e256e2ff';
  }
  if (depth >= 16.5) {
    return '#e256e2ff';
  }
}

export const TimeUtils = { toCDT };
