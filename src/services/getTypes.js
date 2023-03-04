export function getRemoteTicketType(array) {
  return array.filter((item) => item.isRemote === true)[0];
}

export function getPresencialWithoutHotelTicketType(array) {
  return array.filter((item) => item.isRemote === false && item.includesHotel === false)[0];
}

export function getPresencialWithHotelTicketType(array) {
  return array.filter((item) => item.isRemote === false && item.includesHotel === true)[0];
}
