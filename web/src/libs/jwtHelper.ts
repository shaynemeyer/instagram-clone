export function tokenIsExpired(token: string) {
  if (token) {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp ? decoded.exp * 1000 < Date.now() : false;
  }
  return false;
}
