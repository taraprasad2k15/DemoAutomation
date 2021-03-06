import { WebDriver, WebElement } from 'selenium-webdriver';
import { CompleteAction } from '../../../App/automationApi/messages/enum/CompleteAction';
import { RunMode } from '../../../App/automationApi/messages/enum/RunMode';
import { BeginAddToTestCaseResponse } from '../../../App/automationApi/messages/response/BeginAddToTestCaseResponse';
import { CompleteAddToTestCaseResponse } from '../../../App/automationApi/messages/response/CompleteAddToTestCaseResponse';
import { BaseSpec } from '../BaseSpec';
import { Standard } from '../../testdata/sfObjects/Standard';
import { PCO } from '../../testdata/sfObjects/PCO';
import { Case } from '../../testdata/sfObjects/Case';
import { SfCommonFIeld } from '../SfCommonField';
import { QuickLinkData,CaseRL } from './QuickLinkHSR.data';
import { join } from 'path';

export class QuickLinkHSRSpec extends BaseSpec {
    public runTest() {
        const connectionName: string = 'Regmain';
        let remoteWebdriver: WebDriver;
        let pageStructureInfo: any[];
        const assertInteractionParameters = {
			interactionParameters: {
				id: 'Read/Assert',
				settings: {
					extractValue: true,
					assertValue: true,
				},
			}
		};
		const executionStatusAssert = [{
			"name": "UiAssert",
			"type": "Icon-Successful",
			"text": "UI Assert",
			"executionStatus": "Executed",
			"successfulCount": 1,
		}];
		const rowLocators = [
			{
					"label": "Case (CASES_CASE_NUMBER)",
					"selected": true,
					"value": /[0-9{8}]/
			},
			{
					"label": "Contact Name (ContactId)",
					"selected": false,
					"value": ""
			},
			{
					"label": "Subject (CASES_SUBJECT)",
					"selected": false,
					"value": "Testing Case RL on PCO"
			},
			{
					"label": "Priority (CASES_PRIORITY)",
					"selected": false,
					"value": "Medium"
			},
			{
					"label": "Date Opened (CASES_CREATED_DATE_DATE_ONLY)",
					"selected": false,
					"value": /.*/
			},
			{
					"label": "Status (CASES_STATUS)",
					"selected": false,
					"value": "New"
			},
			{
					"label": "Owner (OWNER_NAME)",
					"selected": false,
					"value": /.*/
			}
	];
        
		this.zephyrTest('AutomationAPI', 'PROT-1759', 'FS_MAP_SF_STD_RL_QuickLinks.RP.HSR', () => {
            beforeAll(async done => {
                const debug: boolean = false;
                const tcName = 'QuickLinkHSR.testcase';
                const absPathForTC = join(__dirname, tcName).replace(/\\/g, '/').replace('/target/build/', '/');
                await this.beforeAll(debug, absPathForTC, tcName, RunMode.TestAuthoring, done);
                pageStructureInfo = [QuickLinkData.PSI];
            }, 200 * 1000);
            beforeEach(() => {
				this.beforeEach();
			});
			afterAll(async done => {
				await this.endTestSession(done);
			});
			this.step('Mapping Case Number Field ', async () => {
				remoteWebdriver = await this.getRemoteWebDriver(connectionName);
				await this.findElement(remoteWebdriver, CaseRL.caseNumber.Xpath);
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(CaseRL.caseNumber.Xpath);
				this.assertTestBuilderState(pageStructureInfo, PCO.RL.Cases.caseNumber, Standard.interaction.click, Standard.applicableInteractions.ReadOnlyLink, response.testbuilderState, rowLocators);
			});
			this.step('Add & Do Case Number Field ', async () => {
				await this.modifyAddToTestCase(assertInteractionParameters);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				const newValues: any = {
					'type': 'Icon-Successful',
					'executionStatus': 'Executed',
					'successfulCount': 1
				};
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValues, testItemId);
				await this.assertTestCaseXML("0", CaseRL.caseNumber.testCaseXML);
				this.assertExecutionStatus("0", CaseRL.caseNumber.executionStatus, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping Subject Field ', async () => {
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(CaseRL.subject.Xpath);
				this.assertTestBuilderState(pageStructureInfo, PCO.RL.Cases.subject, Standard.interaction.click, Standard.applicableInteractions.ReadOnlyLink, response.testbuilderState, rowLocators);
			});
			this.step('Add & Do Subject Field ', async () => {
				await this.modifyAddToTestCase(assertInteractionParameters);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithRow', true);
				await this.assertTestCaseXML(testItemId, CaseRL.subject.testCaseXML);
				this.assertExecutionStatus(testItemId, executionStatusAssert, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping Contact Name Field ', async () => {
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(CaseRL.contactName.Xpath);
				this.assertTestBuilderState(pageStructureInfo, PCO.RL.Cases.contactName, Standard.interaction.readAssert, Standard.applicableInteractions.ReadOnlyLink, response.testbuilderState, rowLocators);
			});
			this.step('Add & Do Contact Name Field ', async () => {
				await this.modifyAddToTestCase(assertInteractionParameters);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithRow', true);
				await this.assertTestCaseXML(testItemId, CaseRL.contactName.testCaseXML);
				this.assertExecutionStatus(testItemId, executionStatusAssert, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping Status Field ', async () => {
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(CaseRL.status.Xpath);
				this.assertTestBuilderState(pageStructureInfo, PCO.RL.Cases.status, Standard.interaction.readAssert, Standard.applicableInteractions.ReadOnlyLink, response.testbuilderState, rowLocators);
			});
			this.step('Add & Do Status Field ', async () => {
				await this.modifyAddToTestCase(assertInteractionParameters);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithRow', true);
				await this.assertTestCaseXML(testItemId, CaseRL.status.testCaseXML);
				this.assertExecutionStatus(testItemId, executionStatusAssert, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping RL Heading', async () => {
				await this.findElement(remoteWebdriver, "//span[@title='Cases']");
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase("//h2/a[@title='Cases']");
				this.assertTestBuilderState(pageStructureInfo, {disposition:"Existing", text:"Cases (Cases)"}, Standard.interaction.hover, Standard.applicableInteractions.PageError, response.testbuilderState);
			});
			this.step('Add & Do RL Heading', async () => { 
				const assertRowcount = {
					interactionParameters: {
						id: 'Read/Assert',
						settings: {
							assertTableAttributes: true,
							extractTableAttributes: true,
							expectedAttributes: {
								displayRowCount: {
									value: 1,
								},
								totalRowCount: {
									value: 1,
								},
							},
						}
					},	
				};
				await this.modifyAddToTestCase(assertRowcount);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemIdwithrow: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithRow', true);
				const newValueswithrow: any = {
					'type': 'Icon-Successful',
					'executionStatus': 'Executed',
					'successfulCount': 1
				};
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValueswithrow, testItemIdwithrow);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				const newValues: any = {
					'type': 'Icon-ExecutingPaused',
				};
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValues, testItemId);
				await this.assertTestCaseXML(testItemId, CaseRL.rowcountAssertionXML);
				this.assertExecutionStatus(testItemId, executionStatusAssert, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping Subject Field ', async () => {
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(CaseRL.subject.Xpath);
				this.assertTestBuilderState(pageStructureInfo, PCO.RL.Cases.subject, Standard.interaction.click, Standard.applicableInteractions.ReadOnlyLink, response.testbuilderState, rowLocators);
			});
			this.step('Add & Do Subject Field ', async () => {
				await this.modifyAddToTestCase(CaseRL.subject.assertColumnInteractionParameter);
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				await this.assertTestCaseXML(testItemId, CaseRL.subject.assertColumntestcaseXML);
				this.assertExecutionStatus(testItemId, executionStatusAssert, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping Edit Button', async () => {
				const showmoreactionWE: WebElement = await this.findElement(remoteWebdriver, "//tbody//th/following-sibling::td[7]//a");
				showmoreactionWE.sendKeys(" ");
				await this.findElement(remoteWebdriver, CaseRL.editButton.Xpath);
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(CaseRL.editButton.Xpath);
				this.assertTestBuilderState(pageStructureInfo, PCO.RL.Cases.editButton, Standard.interaction.click, Standard.applicableInteractions.Button, response.testbuilderState, rowLocators);
			});
			this.step('Add & Do Edit Button', async () => {
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase(this.executionStatusTemplate, 'type', 'Icon-ExecutingChildPaused', testItemId);
				await this.assertTestCaseXML(testItemId, CaseRL.editButton.testCaseXML);
				this.assertExecutionStatus(testItemId, CaseRL.editButton.executionStatus, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping Cancel button', async () => {
				const CancelbuttonWE: WebElement = await this.findElement(remoteWebdriver, SfCommonFIeld.cancelButton.Xpath2);
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(SfCommonFIeld.cancelButton.Xpath2);
				this.assertTestBuilderState([Case.caseEditPsi], Standard.cancelButton, Standard.interaction.click, Standard.applicableInteractions.Button, response.testbuilderState);
			});
			this.step('Add & Do Cancel button', async () => {
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemIdwithrow: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithRow', true);
				const newValueswithrow: any = {
					'type': 'Icon-Successful',
					'executionStatus': 'Executed',
					'successfulCount': 1
				};
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValueswithrow, testItemIdwithrow);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				const newValues: any = {
					'type': 'Icon-Successful',
					'executionStatus': 'Executed',
					'successfulCount': 1
				};
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValues, testItemId);
				await this.assertTestCaseXML("0", CaseRL.cancelButtonOnEdit.testCaseXML);
				this.assertExecutionStatus("0", CaseRL.cancelButtonOnEdit.executionStatus, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping ViewAll button', async () => {
				const QuickLinkWE: WebElement = await this.findElement(remoteWebdriver,"//lst-related-list-quick-links-container//a/span[contains((.),'Cases')] | //div[contains(@class,'forceRelatedListQuickLinksContainer')]//a/span[contains((.),'Cases')]", 15*1000);
				await remoteWebdriver.executeScript("arguments[0].scrollIntoView(true);", QuickLinkWE);
				await remoteWebdriver.executeScript("var evObj = document.createEvent('MouseEvents');evObj.initEvent('mouseover',true, false); arguments[0].dispatchEvent(evObj);", QuickLinkWE);
				await this.findElement(remoteWebdriver, CaseRL.viewAllButton.Xpath);
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(CaseRL.viewAllButton.Xpath);
				this.assertTestBuilderState(pageStructureInfo, PCO.RL.Cases.viewAllButton, Standard.interaction.click, Standard.applicableInteractions.Button, response.testbuilderState);
			});
			this.step('Mapping New Button', async () => {
				await this.findElement(remoteWebdriver, CaseRL.newButton.Xpath);
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(CaseRL.newButton.Xpath);
				this.assertTestBuilderState(pageStructureInfo, CaseRL.newButton.fieldDetails, Standard.interaction.click, Standard.applicableInteractions.Button, response.testbuilderState);
			});
			this.step('Add & Do New Button', async () => {
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				const newValues: any = {
					'type': 'Icon-Successful',
					'executionStatus': 'Executed',
					'successfulCount': 1
				};
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValues, testItemId);
				await this.assertTestCaseXML("0", CaseRL.newButton.testCaseXML);
				this.assertExecutionStatus("0", CaseRL.newButton.executionStatus, response.runExecutionStatus.currentTestCase);
			});
			this.step('Mapping Cancel button', async () => {
				await this.findElement(remoteWebdriver, SfCommonFIeld.cancelButton.Xpath2);
				const response: BeginAddToTestCaseResponse = await this.beginAddToTestCase(SfCommonFIeld.cancelButton.Xpath2);
				this.assertTestBuilderState([Case.caseNewPsi], Standard.cancelButton, Standard.interaction.click, Standard.applicableInteractions.Button, response.testbuilderState);
			});
			this.step('Add & Do Cancel button', async () => {
				const response: CompleteAddToTestCaseResponse = await this.completeAddToTestCase(CompleteAction.AddAndDo);
				const testItemId: string = this.miscUtils.findTestItemIdForName(this.testCaseXMLStringTemplate, 'UiWithScreen');
				const newValues: any = {
					'type': 'Icon-Successful',
					'executionStatus': 'Executed',
					'successfulCount': 1
				};
				this.executionStatusTemplate = this.miscUtils.updateValueInTestCase2(this.executionStatusTemplate, newValues, testItemId);
				await this.assertTestCaseXML("0", CaseRL.cancelButtonOnNew.testCaseXML);
				this.assertExecutionStatus("0", CaseRL.cancelButtonOnNew.executionStatus, response.runExecutionStatus.currentTestCase);
			});
        }); 
    };
}; 
