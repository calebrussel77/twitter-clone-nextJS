export function withAuthComponent(Component) {
  return ({ user, data }) => {
    if (!user) {
      return <h1>Denied</h1>; // or redirect, we can use the Router because we are client side here
    }
    return <Component {...data.props} />;
  };
}
