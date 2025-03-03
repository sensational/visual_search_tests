import { firefox, test } from '@playwright/test';
import { deleteAndRecreateFolder, login, takeScreenshot, combineScreenshots, getSearchTermsFromCSV, handleCookieBotConsent } from './helpers.ts';
const config = require('./config');

// Function to read search terms from a CSV file, with initial metadata rows skipped
// Function to read search terms from a CSV file, with headers on a specific row
const numAnalyticsTerms = config.constants.numAnalyticsTerms;
const combOutputFolder = config.constants.combOutputFolder;


test('take screenshots with login and configuration', async () => {
  var target

  const portal = "hr_gastro"
  const language = "de"
  const useAsBaseline = true
  const use_search_debug_param = true

  if (useAsBaseline) {
    target = "BASE"
  } else {
    target = "NEW"
  }
  const { url, searchparams, custom_terms } = config.portals[portal][target];
  const url_lang = `${url}${language}/`
  const url_login = `${url_lang}simplelogin`
  const csvSearchTerms = await getSearchTermsFromCSV(`./analytics_files/${portal}_${language}.csv`);
  const searchTerms = (csvSearchTerms.slice(0, numAnalyticsTerms)).concat(custom_terms[language]);

  const base_screenshots_folder = `screenshots_base/${portal}/${language}/`
  const compScreenshotsFolder = `screenshots/${portal}/${language}/`

  test.setTimeout(800000)

  const browser = await firefox.launch()

  // Create a custom browser context
  const context = await browser.newContext({
    viewport: { width: 1024, height: 16000 },
    deviceScaleFactor: 2 // For Mac
  });

  const page = await context.newPage();

  if (config.portals[portal][target].login) {
    await login(page, url_login)
  } else {
    await page.goto(url_lang);
  }

  await handleCookieBotConsent(page)
  if (useAsBaseline) {
    deleteAndRecreateFolder(base_screenshots_folder)
    await takeScreenshot(page, url_lang, searchparams, searchTerms, base_screenshots_folder, use_search_debug_param);
  } else {
    deleteAndRecreateFolder(compScreenshotsFolder)
    deleteAndRecreateFolder(`${combOutputFolder}/${portal}/${language}/`)
    await takeScreenshot(page, url_lang, searchparams, searchTerms, compScreenshotsFolder, use_search_debug_param);
    await combineScreenshots(compScreenshotsFolder, base_screenshots_folder, `${combOutputFolder}/${portal}/${language}/`);
  }
});

test("combine any screenshots", async () => {
  test.setTimeout(800000)
  await combineScreenshots(`screenshots/gastroport/de_ai/`, `screenshots/gastroport/de/`, `combined_screenshots/gastroport/de_ai_and_improved`)

})

