import {request} from './api';
export const getUserCalendarData = (userId) => {
  return request(`/api/calendar/${userId}`);
};
