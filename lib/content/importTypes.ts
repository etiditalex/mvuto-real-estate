export type ImportResult = {
  imported: number;
  failed: number;
  errors: string[];
  titles: string[];
};

export function emptyImportResult(): ImportResult {
  return { imported: 0, failed: 0, errors: [], titles: [] };
}
