const AUTH_SESSION_KEY = 'subhankar_portfolio_admin_auth_v1';
const DEFAULT_PIN = import.meta.env.VITE_ADMIN_PIN || '1234';

export const auth = {
  login(pin) {
    if (!pin) return { success: false, message: 'PIN cannot be empty' };
    if (pin.trim() === DEFAULT_PIN) {
      const token = btoa(`auth_subhankar_${Date.now()}`);
      sessionStorage.setItem(AUTH_SESSION_KEY, token);
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Security PIN' };
  },

  logout() {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  },

  isAuthenticated() {
    const token = sessionStorage.getItem(AUTH_SESSION_KEY);
    return !!token;
  }
};
