import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import ExcelJS from 'exceljs';

const templateDir = path.join(process.cwd(), 'data-template');
const outputFile = path.join(process.cwd(), 'Arena_2026_Data.xlsx');

const tabs = [
  'Config',
  'Departments',
  'Sports',
  'Players',
  'Matches',
  'Coordinators',
  'Gallery',
  'Announcements',
  'Check',
];

async function generate() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Arena 2026';
  workbook.created = new Date();

  for (const tabName of tabs) {
    const csvPath = path.join(templateDir, `${tabName}.csv`);
    if (!fs.existsSync(csvPath)) continue;

    const content = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(content, {
      columns: false,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    });

    const worksheet = workbook.addWorksheet(tabName);

    if (records.length > 0) {
      // Add rows
      records.forEach((row, idx) => {
        const addedRow = worksheet.addRow(row);
        if (idx === 0) {
          // Style header row
          addedRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          addedRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1E40AF' }, // Royal Blue
          };
          addedRow.alignment = { vertical: 'middle', horizontal: 'center' };
        }
      });

      // Auto-fit column widths
      worksheet.columns.forEach((column) => {
        let maxLength = 12;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const val = cell.value ? String(cell.value) : '';
          if (val.length > maxLength) maxLength = Math.min(val.length + 3, 40);
        });
        column.width = maxLength;
      });
    }

    // Tab-specific format rules
    if (tabName === 'Players') {
      // Column E (roll_no) format as text
      worksheet.getColumn(5).numFmt = '@';
    } else if (tabName === 'Coordinators') {
      // Column D (phone) format as text
      worksheet.getColumn(4).numFmt = '@';
    }
  }

  await workbook.xlsx.writeFile(outputFile);
  console.log(`Successfully generated single Excel file at ${outputFile}`);
}

generate().catch(console.error);
