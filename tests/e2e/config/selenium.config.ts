import { Builder, logging } from 'selenium-webdriver';
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
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--disable-save-password-bubble',
  '--disable-features=PasswordLeakDetection,PasswordManagerOnboarding',
  '--incognito'
);

// Optional: Entfernt das "Chrome wird von automatisierter Software gesteuert"-Banner
options.excludeSwitches('enable-automation');

export const buildDriver = () => {
  const prefs = new logging.Preferences();
  prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);

  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setLoggingPrefs(prefs)
    .build();
};
