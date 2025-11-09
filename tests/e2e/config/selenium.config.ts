import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const options = new chrome.Options();

// Optional: Headless mode für CI
// options.addArguments('--headless=new');

// Deaktiviere Passwortmanager & Leak Detection
options.setUserPreferences({
  'credentials_enable_service': false,
  'profile.password_manager_enabled': false,
  'profile.password_manager_leak_detection_enabled': false
});

// Schalte Features explizit aus, um Warnungen zu verhindern
options.addArguments(
  '--disable-save-password-bubble',
  '--disable-features=PasswordLeakDetection,PasswordManagerOnboarding',
  '--incognito'
);

// Optional: Entfernt das "Chrome wird von automatisierter Software gesteuert"-Banner
options.excludeSwitches(['enable-automation', 'enable-logging']);

export const buildDriver = () => {
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
};
