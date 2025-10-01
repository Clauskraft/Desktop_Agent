#!/usr/bin/env node
/**
 * CVI Violation Scanner
 * Scans codebase for TDC CVI violations
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const violations = [];
let filesScanned = 0;

// Patterns to detect
const PATTERNS = {
  hexColor: /#[0-9a-fA-F]{3,8}/g,
  rgbColor: /rgb\([^)]+\)/g,
  rgbaColor: /rgba\([^)]+\)/g,
  hslColor: /hsl\([^)]+\)/g,
  inlineStyle: /style={{/g,
};

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Skip lines that are in theme/tokens.ts
    if (filePath.includes('theme/tokens.ts') || filePath.includes('theme\\tokens.ts')) {
      return;
    }

    // Check for hex colors
    if (PATTERNS.hexColor.test(line)) {
      violations.push({
        file: filePath,
        line: index + 1,
        type: 'hex-color',
        content: line.trim(),
      });
    }

    // Check for RGB colors
    if (PATTERNS.rgbColor.test(line) || PATTERNS.rgbaColor.test(line)) {
      violations.push({
        file: filePath,
        line: index + 1,
        type: 'rgb-color',
        content: line.trim(),
      });
    }

    // Check for HSL colors
    if (PATTERNS.hslColor.test(line)) {
      violations.push({
        file: filePath,
        line: index + 1,
        type: 'hsl-color',
        content: line.trim(),
      });
    }

    // Check for inline styles
    if (PATTERNS.inlineStyle.test(line)) {
      violations.push({
        file: filePath,
        line: index + 1,
        type: 'inline-style',
        content: line.trim(),
      });
    }
  });

  filesScanned++;
}

// Scan all TypeScript/TSX files
const files = glob.sync('src/**/*.{ts,tsx}', {
  cwd: path.join(__dirname, '..'),
  absolute: true,
});

console.log('🔍 Scanning for CVI violations...\n');

files.forEach(scanFile);

// Output results
console.log(`📊 Scanned ${filesScanned} files\n`);

if (violations.length === 0) {
  console.log('✅ No CVI violations found!\n');
  process.exit(0);
} else {
  console.log(`❌ Found ${violations.length} CVI violations:\n`);

  const grouped = {};
  violations.forEach((v) => {
    if (!grouped[v.type]) grouped[v.type] = [];
    grouped[v.type].push(v);
  });

  Object.entries(grouped).forEach(([type, items]) => {
    console.log(`\n${type.toUpperCase()} (${items.length}):`);
    items.forEach((item) => {
      console.log(`  ${item.file}:${item.line}`);
      console.log(`    ${item.content.substring(0, 80)}...`);
    });
  });

  // Write violations to JSON
  fs.writeFileSync(
    path.join(__dirname, '..', 'cvi-violations.json'),
    JSON.stringify(violations, null, 2)
  );

  console.log('\n📄 Full report saved to: cvi-violations.json\n');
  process.exit(1);
}
