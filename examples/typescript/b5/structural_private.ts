class UserId {
  #value = 0;
}

class OrderId {
  #value = 0;
}

function loadUser(id: UserId): void {
  console.log("loading", id);
}

loadUser(new OrderId());
