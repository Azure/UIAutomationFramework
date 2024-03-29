/// <reference path="../bootstrap.ts" />
import { Util } from "../Utilities/Utils"

export class BaseControl {

    /**
     * Represents the name of the element
     */
    public name: string

    /**
     * Represents the css selector for the element
     */
    protected selector: string;

    /**
     * Represents the page object for the element
     */
    protected page: any;

    /**
     * Represents the utilities object for the element
     */
    protected utils: Util;

    /**
     * Represents the control element object
     */
    public controlElement: any;

    protected TIMEOUT_ELEMENTS_EXISTENCE: number = 10000;

    protected TIMEOUT_POLL_ELEMENTS_EXISTENCE: number = 5000;

    constructor(name: string, selector: string, page: any) {
        this.name = name;
        this.selector = selector;
        this.page = page;
        this.utils = Util.getUtilities(page);
    }

    /**
     * Initializing the control object
     */

    //We have separate init function if we choose to initailize all the objects in some other manner in future. 
    public async init() {
        try {
            this.controlElement = await this.page.waitFor(this.selector);
            return this.controlElement;
        } catch {
            await this.page.screenshot({ path: "Screenshots/" + this.name + "-does-not-exist-screenshot.png" });
        }
    }

    /**
     * To explicitly check if an elements exists of not with the required timeout
     */
    public async exists() {
        try {
            await this.page.waitFor(this.selector, { timeout: this.TIMEOUT_ELEMENTS_EXISTENCE });
            logger.info(this.name + " exists");
            return true;
        } catch {
            logger.info(this.name + " does not exist");
            return false;
        }
    }

    /**
     * To keep polling for the element's existense
     */
    public async waitUntilElementExists(duration: number = 3600 /* 60 minutes by default */) {
        var elementPresent: boolean = false;
        let startTime: Date = new Date();
        while (!elementPresent) {
            let currentTime: Date = new Date();
            let timeDiff: number = (currentTime.getTime() - startTime.getTime()) / 1000;

            if (timeDiff > duration) {
                break;
            }

            const timeoutValue = this.TIMEOUT_POLL_ELEMENTS_EXISTENCE;

            await (new Promise(function (resolve, reject) {
                setTimeout(resolve, timeoutValue);
            }));

            elementPresent = await this.exists();
        }

        if (!elementPresent) {
            logger.error(this.name + " not found!");
        }

        return elementPresent;
    }

    public async updatePage() {
        await this.utils.delay(3000);
        let pages: any = await global.browser.pages();
        global.page = pages[pages.length - 1];
    }
}