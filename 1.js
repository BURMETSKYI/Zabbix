// login
el = browser.findElement("xpath", "//{$BUTTON:1}[@{$BUTTON:2}='{$BUTTON:3}']");
if (el === null) { throw Error("cannot find login button"); }
el.click();
screens.push(browser.getScreenshot());