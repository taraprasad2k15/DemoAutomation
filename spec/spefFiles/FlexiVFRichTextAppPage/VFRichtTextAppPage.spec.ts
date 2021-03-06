import { WebDriver, WebElement } from 'selenium-webdriver';
import { CompleteAction } from '../../../App/automationApi/messages/enum/CompleteAction';
import { RunMode } from '../../../App/automationApi/messages/enum/RunMode';
import { BeginAddToTestCaseResponse } from '../../../App/automationApi/messages/response/BeginAddToTestCaseResponse';
import { CompleteAddToTestCaseResponse } from '../../../App/automationApi/messages/response/CompleteAddToTestCaseResponse';
import { BaseSpec } from '../BaseSpec';
import { Standard } from '../../testdata/sfObjects/Standard';
import { VFRichtTextAppPageData } from './VFRichtTextAppPageData';
import { join } from 'path';

export class VFRichTextAppPageSpec extends BaseSpec {
    public runTest() {
        const connectionName: string = 'Regmain';
        let remoteWebdriver: WebDriver;
        let pageStructureInfo: any[];
     //   let VFframeId = ["(//iframe)[2]"];
      //  let VFframeId = ["//iframe[contains(@title,'Salesforce - Enterprise Edition')]"];
        let VFframeId = ["//iframe[contains(@title,'accessibility title') or contains(@title,'Salesforce - Enterprise Edition')]"];
        this.zephyrTest('AutomationAPI', 'PROT-1543', 'FS_MAP_SF_STD_RICHTEXT.AP', () => {
            beforeAll(async done => {
                const debug: boolean = false;
                const tcName = 'VFRichtTextAppPage.testcase';
                const absPathForTC = join(__dirname, tcName).replace(/\\/g, '/').replace('/target/build/', '/');
                await this.beforeAll(debug, absPathForTC, tcName, RunMode.TestAuthoring, done);
                pageStructureInfo = [VFRichtTextAppPageData.richtextfield.Psi];
            }, 200 * 1000);
            beforeEach(() => {
                this.beforeEach();
            });
            this.step('Map Rich text flexi comp', async () => {
                remoteWebdriver = await this.getRemoteWebDriver(connectionName);
                await this.findElement(remoteWebdriver, VFRichtTextAppPageData.richtextfield.xpath, 20 * 1000);
                const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(VFRichtTextAppPageData.richtextfield.xpath);
                this.assertTestBuilderState(pageStructureInfo, VFRichtTextAppPageData.richtextfield.fieldDetails, Standard.interaction.readAssert,Standard.applicableInteractions.ReadOnly, response.testbuilderState);
            });
            this.step('Add & Do Rich text flexi comp', async () => {
                await this.modifyAddToTestCase(VFRichtTextAppPageData.richtextfield.modificationParameter);
                const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
                const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
                const newValues: any = {
                    'type': 'Icon-Successful',
                    'executionStatus': 'Executed',
                    'successfulCount': 1
                };
                this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValues, testItemId);
                await this.assertTestCaseXML("0", VFRichtTextAppPageData.richtextfield.testCaseXML);
                this.assertExecutionStatus("0", VFRichtTextAppPageData.richtextfield.executionStatus, response.runExecutionStatus.currentTestCase);
            });
        });
        this.zephyrTest('AutomationAPI', 'PROT-1544', 'FS_MAP_SF_STD_VF.AP', () => {
			beforeEach(() => {
				this.beforeEach();
            });
            afterAll(async done => {
                await this.endTestSession(done);
            });
			this.step('Mapping Account Name field', async () => {
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(VFRichtTextAppPageData.accountName.Xpath, VFframeId);
				this.assertTestBuilderState([VFRichtTextAppPageData.VFPSI.new], VFRichtTextAppPageData.accountName.fieldDetails, Standard.interaction.set,Standard.applicableInteractions.Text.enterableMode, response.testbuilderState);
			});
			this.step('Add & Do Account Name field', async () => {
				await this.modifyAddToTestCase(VFRichtTextAppPageData.accountName.interactionParameters);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				const newValues: any = {
					'type': 'Icon-Successful',
					'executionStatus': 'Executed',
					'successfulCount': 1
				};
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValues, testItemId);
				await this.assertTestCaseXML("0", VFRichtTextAppPageData.accountName.testCaseXML);
				this.assertExecutionStatus("0", VFRichtTextAppPageData.accountName.executionStatus, response.runExecutionStatus.currentTestCase);
            });
            this.step('Mapping Type field', async () => {
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(VFRichtTextAppPageData.type.Xpath, VFframeId);
				this.assertTestBuilderState([VFRichtTextAppPageData.VFPSI.existing], VFRichtTextAppPageData.type.fieldDetails, Standard.interaction.set,Standard.applicableInteractions.Picklist.enterableMode, response.testbuilderState);
			});
			this.step('Add & Do Type field', async () => {
				await this.modifyAddToTestCase(VFRichtTextAppPageData.type.interactionParameters);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				await this.assertTestCaseXML(testItemId, VFRichtTextAppPageData.type.testCaseXML);
				this.assertExecutionStatus(testItemId, VFRichtTextAppPageData.type.executionStatus, response.runExecutionStatus.currentTestCase);
            });
            this.step('Mapping Phone field', async () => {
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(VFRichtTextAppPageData.phone.Xpath, VFframeId);
				this.assertTestBuilderState([VFRichtTextAppPageData.VFPSI.existing], VFRichtTextAppPageData.phone.fieldDetails, Standard.interaction.set, Standard.applicableInteractions.Text.enterableMode, response.testbuilderState);
			});
			this.step('Add & Do Phone field', async () => {
				await this.modifyAddToTestCase(VFRichtTextAppPageData.phone.interactionParameters);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				await this.assertTestCaseXML(testItemId, VFRichtTextAppPageData.phone.testCaseXML);
				this.assertExecutionStatus(testItemId, VFRichtTextAppPageData.phone.executionStatus, response.runExecutionStatus.currentTestCase);
            });
            this.step('Mapping Save Button', async () => {
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(VFRichtTextAppPageData.save.Xpath, VFframeId);
				this.assertTestBuilderState([VFRichtTextAppPageData.VFPSI.existing], VFRichtTextAppPageData.save.fieldDetails, Standard.interaction.click,Standard.applicableInteractions.Button, response.testbuilderState);
			});
			this.step('Add & Do Save Button', async () => {
				await this.modifyAddToTestCase(VFRichtTextAppPageData.save.interactionParameters);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				await this.assertTestCaseXML(testItemId, VFRichtTextAppPageData.save.testCaseXML);
				this.assertExecutionStatus(testItemId, VFRichtTextAppPageData.save.executionStatus, response.runExecutionStatus.currentTestCase);
			});
		});
    }
}