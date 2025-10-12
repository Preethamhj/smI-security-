// backend/src/services/scannerService.js

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const fs = require('fs').promises;
const path = require('path');

class ScannerService {
  constructor() {
    // Output directory for scan results
    this.outputDir = '/tmp/scan-results';
    this.ensureOutputDir();
  }

  /**
   * Create output directory if it doesn't exist
   */
  async ensureOutputDir() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
      console.log(`[ScannerService] Output directory ready: ${this.outputDir}`);
    } catch (error) {
      console.error('[ScannerService] Failed to create output directory:', error);
    }
  }

  /**
   * ========================================
   * NMAP - NETWORK SCANNER
   * ========================================
   */
  async runNmap(target, scanType = 'QUICK') {
    console.log(`[Nmap] Starting ${scanType} scan on ${target}`);
    
    const timestamp = Date.now();
    const outputFile = path.join(this.outputDir, `nmap-${timestamp}.xml`);
    
    let nmapArgs = '';
    
    // Configure Nmap arguments based on scan type
    switch (scanType) {
      case 'QUICK':
        // Fast scan - top 1000 ports with service detection
        nmapArgs = '-sV -T4 --top-ports 1000';
        break;
        
      case 'FULL':
        // Comprehensive scan - all 65535 ports with scripts
        nmapArgs = '-sV -sC -p- -T4';
        break;
        
      case 'NETWORK':
        // Network mapping - OS detection and aggressive scanning
        nmapArgs = '-sV -O -A -T4 --top-ports 1000';
        break;
        
      default:
        // Default to quick scan
        nmapArgs = '-sV -T4 --top-ports 100';
    }
    
    // Build complete command
    const command = `nmap ${nmapArgs} -oX ${outputFile} ${target}`;
    
    console.log(`[Nmap] Executing: ${command}`);
    
    try {
      // Execute Nmap command
      const startTime = Date.now();
      const { stdout, stderr } = await execPromise(command, { 
        timeout: 300000, // 5 minute timeout
        maxBuffer: 10 * 1024 * 1024 // 10MB buffer for large outputs
      });
      const duration = Date.now() - startTime;
      
      console.log(`[Nmap] Scan completed in ${duration}ms`);
      
      // Read the XML output file
      const xmlContent = await fs.readFile(outputFile, 'utf-8');
      
      // Clean up the file (optional - comment out for debugging)
      // await fs.unlink(outputFile);
      
      return {
        success: true,
        scanner: 'nmap',
        scanType: scanType,
        rawOutput: xmlContent,
        stdout: stdout,
        stderr: stderr,
        duration: duration,
        outputFile: outputFile
      };
      
    } catch (error) {
      console.error(`[Nmap] Scan failed:`, error.message);
      
      return {
        success: false,
        scanner: 'nmap',
        scanType: scanType,
        error: error.message,
        stderr: error.stderr || ''
      };
    }
  }

  /**
   * ========================================
   * SSLSCAN - SSL/TLS SCANNER
   * ========================================
   */
  async runSSLScan(target) {
    console.log(`[SSLScan] Starting SSL/TLS scan on ${target}`);
    
    const timestamp = Date.now();
    const outputFile = path.join(this.outputDir, `sslscan-${timestamp}.xml`);
    
    // SSLScan command with XML output
    const command = `sslscan --xml=${outputFile} ${target}:443`;
    
    console.log(`[SSLScan] Executing: ${command}`);
    
    try {
      const startTime = Date.now();
      const { stdout, stderr } = await execPromise(command, {
        timeout: 120000, // 2 minute timeout
        maxBuffer: 5 * 1024 * 1024
      });
      const duration = Date.now() - startTime;
      
      console.log(`[SSLScan] Scan completed in ${duration}ms`);
      
      // Read XML output
      const xmlContent = await fs.readFile(outputFile, 'utf-8');
      
      return {
        success: true,
        scanner: 'sslscan',
        rawOutput: xmlContent,
        stdout: stdout,
        stderr: stderr,
        duration: duration,
        outputFile: outputFile
      };
      
    } catch (error) {
      console.error(`[SSLScan] Scan failed:`, error.message);
      
      return {
        success: false,
        scanner: 'sslscan',
        error: error.message,
        stderr: error.stderr || ''
      };
    }
  }

  /**
   * ========================================
   * TESTSSL.SH - COMPREHENSIVE SSL/TLS TESTING
   * ========================================
   */
  async runTestSSL(target) {
    console.log(`[Testssl] Starting SSL/TLS scan on ${target}`);
    
    const timestamp = Date.now();
    const outputFile = path.join(this.outputDir, `testssl-${timestamp}.json`);
    
    // Testssl.sh command with JSON output
    const command = `testssl.sh --jsonfile ${outputFile} --quiet ${target}:443`;
    
    console.log(`[Testssl] Executing: ${command}`);
    
    try {
      const startTime = Date.now();
      
      // Note: testssl.sh might return non-zero exit code even on success
      // We need to handle this gracefully
      let stdout, stderr;
      try {
        const result = await execPromise(command, {
          timeout: 180000, // 3 minute timeout
          maxBuffer: 10 * 1024 * 1024
        });
        stdout = result.stdout;
        stderr = result.stderr;
      } catch (execError) {
        // Testssl might exit with code 2 (warnings) which is acceptable
        stdout = execError.stdout || '';
        stderr = execError.stderr || '';
      }
      
      const duration = Date.now() - startTime;
      
      console.log(`[Testssl] Scan completed in ${duration}ms`);
      
      // Read JSON output
      const jsonContent = await fs.readFile(outputFile, 'utf-8');
      
      return {
        success: true,
        scanner: 'testssl',
        rawOutput: jsonContent,
        stdout: stdout,
        stderr: stderr,
        duration: duration,
        outputFile: outputFile
      };
      
    } catch (error) {
      console.error(`[Testssl] Scan failed:`, error.message);
      
      return {
        success: false,
        scanner: 'testssl',
        error: error.message,
        stderr: error.stderr || ''
      };
    }
  }

  /**
   * ========================================
   * NIKTO - WEB SERVER SCANNER
   * ========================================
   */
  async runNikto(target) {
    console.log(`[Nikto] Starting web scan on ${target}`);
    
    const timestamp = Date.now();
    const outputFile = path.join(this.outputDir, `nikto-${timestamp}.xml`);
    
    // Nikto command with XML output
    const command = `nikto -h ${target} -Format xml -output ${outputFile} -Tuning x 6`;
    
    console.log(`[Nikto] Executing: ${command}`);
    
    try {
      const startTime = Date.now();
      const { stdout, stderr } = await execPromise(command, {
        timeout: 300000, // 5 minute timeout
        maxBuffer: 10 * 1024 * 1024
      });
      const duration = Date.now() - startTime;
      
      console.log(`[Nikto] Scan completed in ${duration}ms`);
      
      // Read XML output
      const xmlContent = await fs.readFile(outputFile, 'utf-8');
      
      return {
        success: true,
        scanner: 'nikto',
        rawOutput: xmlContent,
        stdout: stdout,
        stderr: stderr,
        duration: duration,
        outputFile: outputFile
      };
      
    } catch (error) {
      console.error(`[Nikto] Scan failed:`, error.message);
      
      // Nikto sometimes exits with non-zero even on success
      // Try to read the file anyway
      try {
        const xmlContent = await fs.readFile(outputFile, 'utf-8');
        if (xmlContent.length > 0) {
          return {
            success: true,
            scanner: 'nikto',
            rawOutput: xmlContent,
            stdout: error.stdout || '',
            stderr: error.stderr || '',
            duration: 0,
            outputFile: outputFile,
            warning: 'Nikto exited with non-zero code but produced output'
          };
        }
      } catch (readError) {
        // File doesn't exist, actual failure
      }
      
      return {
        success: false,
        scanner: 'nikto',
        error: error.message,
        stderr: error.stderr || ''
      };
    }
  }

  /**
   * ========================================
   * OWASP ZAP - WEB APPLICATION SCANNER
   * ========================================
   */
  async runZAP(target) {
    console.log(`[ZAP] Starting web application scan on ${target}`);
    
    const timestamp = Date.now();
    const outputFile = path.join(this.outputDir, `zap-${timestamp}.xml`);
    
    // Ensure target has protocol
    const targetUrl = target.startsWith('http') ? target : `http://${target}`;
    
    // ZAP baseline scan command
    const command = `zap-baseline.py -t ${targetUrl} -x ${outputFile} -I`;
    
    console.log(`[ZAP] Executing: ${command}`);
    
    try {
      const startTime = Date.now();
      
      // ZAP returns non-zero on findings, which is expected
      let stdout, stderr;
      try {
        const result = await execPromise(command, {
          timeout: 600000, // 10 minute timeout
          maxBuffer: 20 * 1024 * 1024
        });
        stdout = result.stdout;
        stderr = result.stderr;
      } catch (execError) {
        stdout = execError.stdout || '';
        stderr = execError.stderr || '';
      }
      
      const duration = Date.now() - startTime;
      
      console.log(`[ZAP] Scan completed in ${duration}ms`);
      
      // Read XML output
      const xmlContent = await fs.readFile(outputFile, 'utf-8');
      
      return {
        success: true,
        scanner: 'zap',
        rawOutput: xmlContent,
        stdout: stdout,
        stderr: stderr,
        duration: duration,
        outputFile: outputFile
      };
      
    } catch (error) {
      console.error(`[ZAP] Scan failed:`, error.message);
      
      // Try to read output anyway
      try {
        const xmlContent = await fs.readFile(outputFile, 'utf-8');
        if (xmlContent.length > 0) {
          return {
            success: true,
            scanner: 'zap',
            rawOutput: xmlContent,
            stdout: error.stdout || '',
            stderr: error.stderr || '',
            duration: 0,
            outputFile: outputFile,
            warning: 'ZAP exited with non-zero code but produced output'
          };
        }
      } catch (readError) {
        // File doesn't exist, actual failure
      }
      
      return {
        success: false,
        scanner: 'zap',
        error: error.message,
        stderr: error.stderr || ''
      };
    }
  }

  /**
   * ========================================
   * MAIN ORCHESTRATOR
   * ========================================
   * Execute appropriate scanners based on scan type
   */
  async executeScan(target, scanType) {
    console.log(`[ScannerService] Starting ${scanType} scan for ${target}`);
    
    const results = {
      target: target,
      scanType: scanType,
      scanners: [],
      startTime: new Date(),
      endTime: null,
      duration: 0
    };

    try {
      switch (scanType) {
        case 'QUICK':
          // Quick scan - Nmap only (fast)
          console.log('[ScannerService] Running QUICK scan: Nmap');
          results.scanners.push(await this.runNmap(target, 'QUICK'));
          break;
          
        case 'FULL':
          // Full scan - Nmap + SSL + Web
          console.log('[ScannerService] Running FULL scan: Nmap + SSLScan + Nikto');
          results.scanners.push(await this.runNmap(target, 'FULL'));
          results.scanners.push(await this.runSSLScan(target));
          results.scanners.push(await this.runNikto(target));
          break;
          
        case 'NETWORK':
          // Network scan - Advanced Nmap
          console.log('[ScannerService] Running NETWORK scan: Nmap (advanced)');
          results.scanners.push(await this.runNmap(target, 'NETWORK'));
          break;
          
        case 'WEB':
          // Web scan - Nikto + ZAP
          console.log('[ScannerService] Running WEB scan: Nikto + ZAP');
          results.scanners.push(await this.runNikto(target));
          results.scanners.push(await this.runZAP(target));
          break;
          
        case 'SSL':
          // SSL scan - SSLScan + Testssl
          console.log('[ScannerService] Running SSL scan: SSLScan + Testssl');
          results.scanners.push(await this.runSSLScan(target));
          results.scanners.push(await this.runTestSSL(target));
          break;
          
        default:
          // Default to quick scan
          console.log('[ScannerService] Unknown scan type, defaulting to QUICK');
          results.scanners.push(await this.runNmap(target, 'QUICK'));
      }

      results.endTime = new Date();
      results.duration = results.endTime - results.startTime;

      // Count successful and failed scans
      const successCount = results.scanners.filter(s => s.success).length;
      const failCount = results.scanners.filter(s => !s.success).length;

      console.log(`[ScannerService] Scan completed: ${successCount} successful, ${failCount} failed`);
      console.log(`[ScannerService] Total duration: ${results.duration}ms`);

      return results;

    } catch (error) {
      console.error(`[ScannerService] Fatal error during scan execution:`, error);
      
      results.endTime = new Date();
      results.duration = results.endTime - results.startTime;
      results.error = error.message;
      
      return results;
    }
  }

  /**
   * ========================================
   * UTILITY METHODS
   * ========================================
   */

  /**
   * Get list of output files in the directory
   */
  async listOutputFiles() {
    try {
      const files = await fs.readdir(this.outputDir);
      return files;
    } catch (error) {
      console.error('[ScannerService] Failed to list output files:', error);
      return [];
    }
  }

  /**
   * Clean up old output files
   */
  async cleanupOutputFiles(olderThanMs = 3600000) {
    try {
      const files = await fs.readdir(this.outputDir);
      const now = Date.now();
      let deletedCount = 0;

      for (const file of files) {
        const filePath = path.join(this.outputDir, file);
        const stats = await fs.stat(filePath);
        const age = now - stats.mtimeMs;

        if (age > olderThanMs) {
          await fs.unlink(filePath);
          deletedCount++;
        }
      }

      console.log(`[ScannerService] Cleaned up ${deletedCount} old output files`);
      return deletedCount;

    } catch (error) {
      console.error('[ScannerService] Failed to cleanup output files:', error);
      return 0;
    }
  }

  /**
   * Test if a scanner is available
   */
  async testScanner(scannerName) {
    const commands = {
      nmap: 'nmap --version',
      sslscan: 'sslscan --version',
      testssl: 'testssl.sh --version',
      nikto: 'nikto -Version',
      zap: 'zap-baseline.py --version'
    };

    const command = commands[scannerName];
    if (!command) {
      return { available: false, error: 'Unknown scanner' };
    }

    try {
      const { stdout } = await execPromise(command, { timeout: 5000 });
      return { 
        available: true, 
        version: stdout.trim().split('\n')[0] 
      };
    } catch (error) {
      return { 
        available: false, 
        error: error.message 
      };
    }
  }

  /**
   * Test all scanners availability
   */
  async testAllScanners() {
    const scanners = ['nmap', 'sslscan', 'testssl', 'nikto', 'zap'];
    const results = {};

    for (const scanner of scanners) {
      results[scanner] = await this.testScanner(scanner);
    }

    return results;
  }
}

// Export singleton instance
module.exports = new ScannerService();