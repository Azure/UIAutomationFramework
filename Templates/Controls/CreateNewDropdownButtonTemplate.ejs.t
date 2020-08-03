describe("<%- testName %>", async function () {
    let <%= controlName %>: TestCreateNewDropdownButton;
    before(async function () {
        /* Initialization */
        <%= controlName %> = new TestCreateNewDropdownButton("<%= controlName %>", "<%- selector %>", page);
        await <%= controlName %>.init();

        /* All actions to be performed prior to the running of test case */
        <%_ if (!!before && before.input) { _%>
        await <%= controlName %>.createNew.input(<%-JSON.stringify(before.input) %>);
        <%_ } _%>

    })

    it('Run Tests', async function () {
        /* All test cases to be performed */
        <%_ if (!!test && test.testExists == "yes") { _%>
        await <%= controlName %>.testExists();
        <%_ } _%>
    })

    after(async function () { 
        /* All actions to be performed after running test case */
        <%_ if (!!after && after.input) { %>
        await <%= controlName %>.createNew.input(<%-JSON.stringify(after.input) %>);
        <%_ } %>

        /* Include the other test cases here */
        <%% if (locals.nextTest) { %>
            <%%- locals.nextTest %>
        <%% } %>
    })
});
/* CreateNewDropdownButton Template ending */

