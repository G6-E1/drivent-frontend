export function getRemoteTicketType(array) {
  return array.filter((item) => item.isRemote === true)[0];
}

export function getPresencialWithoutHotelTicketType(array) {
  return array.filter((item) => item.isRemote === false && item.includesHotel === false)[0];
}

export function getPresencialWithHotelTicketType(array) {
  return array.filter((item) => item.isRemote === false && item.includesHotel === true)[0];
}

export function getAllTicketsTypes(ticketsTypes) {
  const remoteTicket = getRemoteTicketType(ticketsTypes);
  const presencialTicket = getPresencialWithoutHotelTicketType(ticketsTypes);
  const presencialWithHotelTicket = getPresencialWithHotelTicketType(ticketsTypes);

  return { remoteTicket, presencialTicket, presencialWithHotelTicket };
}

export function getTicketTypeById(array, ticketTypeId) {
  return array.filter((item) => item.id === ticketTypeId)[0];
}
