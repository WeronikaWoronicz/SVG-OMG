const Main = require('../support/Main.ts')
const MainPage = require('../support/Main.ts')
const { expect } = require('chai')



Feature('SVG OMG main page')

Scenario('Check layout', async ({ I, homePage }) => {
  homePage.goToHome()
  I.say('Check that menu items are visible')
  I.see('Open SVG')
  I.see('Paste markup')
  I.see('Demo')
  I.see('Contribute')
  I.see('About')
  I.click(Main.demoButton)
  I.waitForVisible(Main.toolbar)
  I.see('Global settings', Main.globalSettingSection)
  I.see('Features', Main.featuresSection)
  I.say('Main menu, section (even sections !), toolbar exist on the page')

})

Scenario('Check that About option from menu list works ', async ({ I, homePage }) => {
  homePage.goToHome()
  I.click(Main.aboutButton)
  I.seeInCurrentUrl('https://github.com/jakearchibald/svgomg/blob/master/README.md')
})

Scenario('Check that yo can not attach gif file', async ({ I, homePage }) => {
  homePage.goToHome()
  I.attachFile(Main.openSVGButton, 'test_data/giphy-5.gif')
  I.dontSee(Main.globalSettingSection)
  I.dontSee('Download')
})

Scenario('Check that Open SVG and file optimization works as expected', async ({ I, homePage }) => {
  homePage.goToHome()
  I.attachFile(Main.openSVGButton, 'test_data/Umbrella_icon.svg')
  I.handleDownloads('optimized.svg')
  I.click('Download')
  I.amInPath('output')
  I.waitForFile('optimized.svg', 5)
  I.seeInThisFile('<svg')
  I.seeInThisFile('</svg>')
  I.say('Open SVG works as expected')
  MainPage.checkThatCommentsAreRemoved
  MainPage.checkThatMetaDataAreRemoved
  MainPage.checkThatXMLInstructionsAreRemoved
  I.click(Main.showOriginalCheckbox)
  I.seeCheckboxIsChecked(Main.showOriginalCheckbox)
  I.handleDownloads('original.svg')
  I.click('Download')
  I.amInPath('output')
  I.waitForFile('original.svg')
  var originalFileInfo = await I.getFileInfo('output/original.svg')
  var optimizedFileInfo = await I.getFileInfo('output/optimized.svg')
  expect(originalFileInfo.size).to.be.above(optimizedFileInfo.size) 
  I.say('Original file is bigger than optimized file')
})


Scenario('Check that optimization in Demo works as expected', async ({ I, homePage }) => {
  homePage.goToHome()
  I.click(Main.demoButton)
  I.handleDownloads('optimized.svg')
  I.click('Download')
  I.amInPath('output')
  I.waitForFile('optimized.svg', 5)
  I.seeInThisFile('<svg')
  I.seeInThisFile('</svg>')
  MainPage.checkThatCommentsAreRemoved
  MainPage.checkThatMetaDataAreRemoved
  MainPage.checkThatXMLInstructionsAreRemoved
  I.click('Reset all')
  I.click(Main.showOriginalCheckbox)
  I.seeCheckboxIsChecked(Main.showOriginalCheckbox)
  I.handleDownloads('original.svg')
  I.click('Download')
  I.amInPath('output')
  I.waitForFile('original.svg')
  var originalFileInfo = await I.getFileInfo('output/original.svg')
  var optimizedFileInfo = await I.getFileInfo('output/optimized.svg')
  expect(originalFileInfo.size).to.be.above(optimizedFileInfo.size) 
  I.say('Original file is bigger than optimized file')
  I.click('Markup')
  I.click(Main.showOriginalCheckbox)
  I.dontSeeCheckboxIsChecked(Main.showOriginalCheckbox)
  I.seeCheckboxIsChecked('Remove comments')
  I.seeCheckboxIsChecked('Remove <metadata>')
  I.seeCheckboxIsChecked('Remove XML instructions')
  I.say('Check that comments are removed by Remove comments')
  I.dontSee('<!--')
  I.dontSee('-->')
  I.say('Check that metadata are removed by Remove <metadata>')
  I.dontSee('structures:metadata=')
  I.dontSee('MetadataType')
  I.dontSee('structures:')
  I.say('Check that xml instructions are removed by “Remove XMLinstructions”')
  I.dontSee('<?')
  I.dontSee('?>')
})
