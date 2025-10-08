// Coming Soon Page Configuration
// Control what sections to show/hide

export const comingSoonConfig = {
  // Sections visibility
  showEmailForm: true,           // Show/hide email notification form
  showSocialLinks: true,         // Show/hide social media icons
  showFeaturePreviews: true,     // Show/hide feature cards (Premium Quality, Fast Delivery, Best Price)
  showFooter: true,              // Show/hide footer text
  showTrustBadge: true,          // Show/hide "Since 2019 • ISO Certified" badge
  
  // Content customization
  mainHeading: "Something Amazing Is Coming",
  subHeading: "We're crafting an exceptional experience for premium brass products. Get ready for excellence in manufacturing.",
  
  // Countdown settings
  countdownDays: 7,              // Number of days for countdown (7 = 1 week)
  
  // Feature cards (only shown if showFeaturePreviews = true)
  features: [
    { icon: '🏆', title: 'Premium Quality', desc: 'ISO Certified Products' },
    { icon: '⚡', title: 'Fast Delivery', desc: 'Quick Turnaround Time' },
    { icon: '💎', title: 'Best Price', desc: 'Competitive Pricing' },
  ],
  
  // Social media links (only shown if showSocialLinks = true)
  socialLinks: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#',
  },
};
