// src/utils/dateHelpers.js

import { format, parseISO } from "date-fns";

/**
 * Formats an ISO date string to the specified format.
 * @param {string} dateString - The ISO date string.
 * @returns {string} - The formatted date string in 'dd/MM/yy HH:mm:ss' format.
 */
export function formatDate(dateString) {
  return format(parseISO(dateString), "dd/MM/yy HH:mm:ss");
}
