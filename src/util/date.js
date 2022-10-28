import moment from 'moment';
import 'moment-timezone';

export function MomentSpeed(date) {
  if (!date) {
    return moment().locale('pt-br').tz('America/Sao_Paulo');
  }

  return moment(date).locale('pt-br').tz('America/Sao_Paulo');
}

export function FormatDate(format, date) {
  return MomentSpeed(date).format(format);
}

export function MomentTzString(date) {
  return MomentSpeed(date).locale('pt-br').tz('America/Sao_Paulo').format();
}

export function TransformDateUsa(date, hour = '') {
  const [day, mounth, year] = date.split('/');

  const [hours, minutes] = hour.split(':');

  const dateString = `${year}-${mounth}-${day}`;

  const response = MomentSpeed(dateString.trim())
    .hours(hours || 0)
    .minutes(minutes || 0)
    .seconds(0);

  return response;
}

export function TransformDateUsaString(date, hour = '') {
  const dateGenerated = TransformDateUsa(date, hour);

  return String(dateGenerated.format());
}

export function SetZeroDate(date) {
  return MomentSpeed(date).hours(0).minutes(0).seconds(0);
}

export function IsBetween(date, initialDate, finalDate) {
  return date.isBetween(initialDate, finalDate, undefined, '[]');
}
