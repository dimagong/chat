let users = [];

exports.addUser = ({ id, name, }) => {
  if (!name ) return { error: "name required." };
  const user = { id, name, };

  users.push(user);

  return { user };
};