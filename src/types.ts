/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
}

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  hoursWeekday: string;
  hoursSunday: string;
}
