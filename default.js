const Website = {
    params: {},

    setParams(params) {
        ['scheme', 'domain','width', 'height'].forEach(function (field) {
            if (typeof params !== 'object' || !params[field]) {
                throw new Error('Required param is not set: ' + field + '.');
            }
        });
        this.params = params;
    },

    getOptions(browser) {
        switch ((browser || '').trim().toLowerCase()) {
            case 'firefox':
                return Browser.firefoxOptions();
            case 'safari':
                return Browser.safariOptions();
            case 'edge':
                return Browser.edgeOptions();
            default:
                return Browser.chromeOptions();
        }
    },

    getPerformance() {
        const browser = new Browser(Website.getOptions(Website.params.browser));
        const url = Website.params.scheme + '://' + Website.params.domain + '/' + Website.params.path
        const screenshot = '';
        browser.setScreenSize(Number(Website.params.width), Number(Website.params.height))
        browser.navigate(url);
        browser.collectPerfEntries();
        screenshot = browser.getScreenshot();
        const result = browser.getResult();
        result.screenshot = screenshot;

        return JSON.stringify(result);
    }
};

try {
    Website.setParams(JSON.parse(value));
    return Website.getPerformance();

} catch (error) {
    error += (String(error).endsWith('.')) ? '' : '.';
    Zabbix.log(3, '[ Website get metrics] ERROR: ' + error);
    return JSON.stringify({ 'error': error });
}
