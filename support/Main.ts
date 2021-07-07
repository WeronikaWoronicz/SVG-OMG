const selectors = {
    aboutButton: locate('span').withText('About'),
    demoButton: '.load-demo',
    openSVGButton: locate('input').withAttr({class :'load-file-input'}),
    toolbar: '.toolbar',
    globalSettingSection: locate('section').withAttr({class :'global'}),
    featuresSection: locate('section').withAttr({class :'plugins'}),
    showOriginalCheckbox: 'Show original'
    
}
  module.exports = selectors