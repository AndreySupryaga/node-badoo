const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 2000, height: 1000 },
    args: ['--window-size=2000,1000'],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(0);
  await page.goto('https://badoo.com/signin/?f=top');
  await page.$eval('.js-signin-login', el => el.value = 'LOGIN');
  await page.$eval('.js-signin-password', el => el.value = 'PASSWORD');
  await page.waitForTimeout(2000);
  await page.click('.btn--block');
  while (true) {
    await page.waitForSelector('.js-profile-header-vote-yes');
    let cookiesAccept = await page.$('#notice > div.message-component.message-row.box-shadow > div:nth-child(3) > div.message-component.message-row.button-row > button.message-component.message-button.no-children.focusable.button.sp_choice_type_11');
    if (cookiesAccept) {
      await page.click('#notice > div.message-component.message-row.box-shadow > div:nth-child(3) > div.message-component.message-row.button-row > button.message-component.message-button.no-children.focusable.button.sp_choice_type_11');
      await page.waitForTimeout(2000);
    }

    await page.click('.js-profile-header-vote-yes');
    await page.waitForTimeout(2000);

    let crossLike = await page.$('.ovl-match');
    if (crossLike) {
      await page.click('.icon.icon--white.js-ovl-close');
      await page.waitForTimeout(2000);
    }
    const pushAlert = await page.$('.js-chrome-pushes-deny');
    if (pushAlert) {
      await page.click('.js-chrome-pushes-deny');
    }
  }
})();
