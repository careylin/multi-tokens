const StyleDictionaryPackage = require('style-dictionary');
const fse = require('fs-extra');
const buildPath = 'build/';

function getStyleDictionaryConfig(brand, platform) {
  return {
    "source": [
      `src/tokens/brands/${brand}/*.json`,
      "src/tokens/globals/**/*.json",
      `src/tokens/platforms/${platform}/*.json`
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `build/web/${brand}/`,
        "files": [{
          "destination": "tokens.scss",
          "format": "scss/variables"
        }]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `build/android/${brand}/`,
        "files": [{
          "destination": "tokens.colors.xml",
          "format": "android/colors"
        },{
          "destination": "tokens.dimens.xml",
          "format": "android/dimens"
        },{
          "destination": "tokens.font_dimens.xml",
          "format": "android/fontDimens"
        }]
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": `build/ios/${brand}/`,
        "files": [{
          "destination": "tokens.h",
          "format": "ios/macros"
        }]
      }
    }
  };
}

// REMOVE OLD iOS ASSET FILES BEFORE GENERATING NEW ONES
console.log('\n==============================================');
console.log(`cleaning ${buildPath}...`);

fse.removeSync(buildPath);

console.log('\n==============================================');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['brand-1', 'brand-2'].map(function (brand) {
  ['web', 'ios', 'android'].map(function (platform) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [${brand}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));

    StyleDictionary.buildPlatform(platform);

    console.log('\nEnd processing');

  })
})

console.log('\n==============================================');
console.log('\nBuild completed!');