class UserDto {
  id;
  phone;
  name;
  avatar;
  activated;
  createdAt;
  email;

  constructor(user) {
    this.id = user._id;
    this.phone = user.phone;
    this.email = user?.email;
    this.name = user.name;
    this.avatar = user.avatar;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDto;
