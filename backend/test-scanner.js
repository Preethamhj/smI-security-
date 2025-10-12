// backend/test-scanner.js

const ScannerService = require('./services/scannerservice');

async function testScanners() {
  console.log('================================');
  console.log('SCANNER SERVICE TEST');
  console.log('================================\n');

  // Test 1: Check scanner availability
  console.log('1. Testing scanner availability...\n');
  const availability = await ScannerService.testAllScanners();
  
  for (const [scanner, result] of Object.entries(availability)) {
    if (result.available) {
      console.log(`✅ ${scanner}: ${result.version}`);
    } else {
      console.log(`❌ ${scanner}: ${result.error}`);
    }
  }

  console.log('\n================================\n');

  // Test 2: Run a quick scan
  const testTarget = process.argv[2] || 'scanme.nmap.org';
  const testScanType = process.argv[3] || 'QUICK';

  console.log(`2. Running ${testScanType} scan on ${testTarget}...\n`);

  try {
    const results = await ScannerService.executeScan(testTarget, testScanType);

    console.log('\n================================');
    console.log('SCAN RESULTS');
    console.log('================================\n');

    console.log(`Target: ${results.target}`);
    console.log(`Scan Type: ${results.scanType}`);
    console.log(`Duration: ${results.duration}ms`);
    console.log(`Scanners executed: ${results.scanners.length}\n`);

    results.scanners.forEach((scanner, index) => {
      console.log(`--- Scanner ${index + 1}: ${scanner.scanner} ---`);
      console.log(`Success: ${scanner.success}`);
      
      if (scanner.success) {
        console.log(`Duration: ${scanner.duration}ms`);
        console.log(`Output file: ${scanner.outputFile}`);
        console.log(`Output size: ${scanner.rawOutput?.length || 0} bytes`);
      } else {
        console.log(`Error: ${scanner.error}`);
      }
      console.log('');
    });

    console.log('================================');
    console.log('Test completed successfully!');
    console.log('================================\n');

    // List output files
    console.log('Output files created:');
    const files = await ScannerService.listOutputFiles();
    files.forEach(file => console.log(`  - ${file}`));

  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
}

// Run tests
testScanners().then(() => {
  console.log('\nExiting...');
  process.exit(0);
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});