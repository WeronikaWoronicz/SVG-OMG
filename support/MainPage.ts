const { I } = inject()

module.exports  = {

  checkThatMetaDataAreRemoved () {
    I.say('Check that metadata are removed by Remove <metadata>')
    I.dontSeeInThisFile('structures:metadata=')
    I.dontSeeInThisFile('MetadataType')
    I.dontSeeInThisFile('structures:')
  },

  checkThatCommentsAreRemoved () {
    I.say('Check that comments are removed by Remove comments')
    I.dontSeeInThisFile('<!--')
    I.dontSeeInThisFile('-->')
  },

  checkThatXMLInstructionsAreRemoved () {
    I.say('Check that xml instructions are removed by “Remove XMLinstructions”')
    I.dontSeeInThisFile('<?')
    I.dontSeeInThisFile('?>')
    I.click('Reset all')
    
  }

}
