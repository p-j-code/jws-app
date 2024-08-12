// Configuration for app icon generation
module.exports = {
  sourceIconPath: 'cli/data/icons/small.png',
  androidIconSizes: [
    {size: 48, directory: 'mipmap-mdpi'},
    {size: 72, directory: 'mipmap-hdpi'},
    {size: 96, directory: 'mipmap-xhdpi'},
    {size: 144, directory: 'mipmap-xxhdpi'},
    {size: 192, directory: 'mipmap-xxxhdpi'},
  ],
  iosIconSizes: [
    {size: 20, name: 'Icon-20.png'},
    {size: 29, name: 'Icon-29.png'},
    {size: 40, name: 'Icon-40.png'},
    {size: 60, name: 'Icon-60.png'},
  ],
  androidPath: 'android/app/src/main/res',
  iosPath: 'ios/jwsApp/Images.xcassets/AppIcon.appiconset',
};
