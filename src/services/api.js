import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/navigation';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'thesubhankar';

export const api = {
  // Fetch live GitHub Telemetry
  async getGitHubProfile() {
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (res.ok) {
        const data = await res.json();
        return {
          login: data.login,
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          bio: data.bio,
          avatar_url: data.avatar_url,
          status: 'Live API Synced'
        };
      }
    } catch (err) {
      console.warn('GitHub API offline or rate-limited, falling back to local telemetry:', err);
    }

    return {
      login: GITHUB_USERNAME,
      public_repos: 12,
      followers: 2,
      following: 5,
      status: 'Fallback Telemetry'
    };
  },

  // Send Contact Message via EmailJS
  async sendContactMessage(formData) {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || portfolioData.emailjs.serviceId;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || portfolioData.emailjs.templateId;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || portfolioData.emailjs.publicKey;

    return await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
        to_email: portfolioData.email
      },
      publicKey
    );
  }
};
