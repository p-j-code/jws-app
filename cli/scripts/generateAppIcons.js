const sharp = require('sharp');
const path = require('path');
const config = require('../cli-config');


const resizeAndSaveIcon = (source, size, outputPath, round = false) => {
  let image = sharp(source).resize(size, size);

  if (round) {
    // Create a circular mask
    const circle = Buffer.from(
      `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${
        size / 2
      }" fill="#fff"/></svg>`,
    );

    image.composite([{input: circle, blend: 'dest-in'}]).png(); // Ensure the output is png to preserve transparency
  }

  image.toFile(outputPath, err => {
    if (err) {
      console.error('Error generating icon:', err);
    } else {
      console.log(`Generated icon at ${outputPath}`);
    }
  });
};

// Generate Android icons
config.androidIconSizes.forEach(({size, directory}) => {
  const baseOutputPath = path.join(config.androidPath, directory);
  const squareIconPath = path.join(baseOutputPath, 'ic_launcher.png');
  const roundIconPath = path.join(baseOutputPath, 'ic_launcher_round.png');

  // Generate square icons
  resizeAndSaveIcon(config.sourceIconPath, size, squareIconPath);

  // Generate round icons
  resizeAndSaveIcon(config.sourceIconPath, size, roundIconPath, true);
});

// Generate iOS icons (similar process can be applied if needed)
config.iosIconSizes.forEach(({size, name}) => {
  const outputPath = path.join(config.iosPath, name);
  resizeAndSaveIcon(config.sourceIconPath, size, outputPath);
});
