import { BaseControl } from "../Controls/BaseControl"
import 'mocha';
import { assert, expect } from 'chai';

export class TestBaseControl extends BaseControl{

    constructor(name: string, selector: string, page: any) {
        super(name, selector, page);
    }

    protected async testExists(control: BaseControl) {
        describe('Element Exists', async function() {
            before(async function() {
                console.log("Inside before of test exists");
            })
            it('Element Exists', async function () {
                let result = await control.exists();
                assert.isTrue(result, control.name + " does not exist");

            });
        })
    };

}
