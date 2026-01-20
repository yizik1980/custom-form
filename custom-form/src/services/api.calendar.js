import {request} from './api';
export const getUserCalendarData = (userId) => {
  return request(`/api/calendar/${userId}`);
};

export const createCalendarEvent = (eventData) => {
  return request('/api/calendar/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
};

export const deleteEvent = (eventId) => {
  return request(`/api/calendar/${eventId}`, {
    method: 'DELETE',
  });
}
