var browser, result;
browser = new Browser(Browser.chromeOptions());
browser.setScreenSize(Number(1280), Number(720));
screens = [];
const screenshot = '';
try {
    browser.navigate("https://github.com/login");
    screens.push(browser.getScreenshot());
    
    // enter username
    var el = browser.findElement("xpath", "//{$USER:1}[@{$USER:2}='{$USER:3}']");
    if (el === null) {throw Error("cannot find name input field");}
    el.sendKeys("{$USER:4}");
    screens.push(browser.getScreenshot());
    
    // enter password
    el = browser.findElement("xpath", "//{$PASS:1}[@{$PASS:2}='{$PASS:3}']");
    if (el === null) { throw Error("cannot find password input field"); }
    el.sendKeys("{$PASS:4}");
    screens.push(browser.getScreenshot());
    
    // login
    el = browser.findElement("xpath", "//input[@name='commit']");
    if (el === null) { throw Error("cannot find login button"); }
    el.click();
    screens.push(browser.getScreenshot());

}
catch (err) {
    if (!(err instanceof BrowserError)) {
        browser.setError(err.message);
    }
    result = browser.getResult();
    result.error.screenshot = browser.getScreenshot();
}
finally {
    return JSON.stringify(screens);
}