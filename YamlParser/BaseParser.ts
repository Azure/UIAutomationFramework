import * as ejs from 'ejs';
import * as fs from 'fs';
import { ControlDataBlock, UtilityDataBlock, CustomTestDataBlock } from "./DataTypes"

export class BaseParser {

    protected templateData: string;

    protected templatePath: string;  

    public data: ControlDataBlock | UtilityDataBlock | CustomTestDataBlock;
    
    constructor(templatePath: string, data: ControlDataBlock | UtilityDataBlock | CustomTestDataBlock) {
        this.templatePath = templatePath;
        this.templateData = "";
        this.data = data;
    } 

    public async renderTemplate() {
        this.templateData = await ejs.renderFile(this.templatePath, this.data);   
        fs.writeFileSync(this.data.currentTestPath, this.templateData);
        logger.info("\"" + this.data.testName + "\"" + " testfile created successfully as " + "\"" + this.data.currentTestPath + "\"");
    }
}