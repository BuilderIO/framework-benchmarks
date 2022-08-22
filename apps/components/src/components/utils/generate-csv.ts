export function downloadFile(name: string, contents: string) {
  const link = document.createElement('a');
  link.setAttribute('download', name);
  link.href = URL.createObjectURL(
    new Blob([contents], {
      type: 'text/csv',
    })
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function escapeQuote(str: string) {
  return String(str).replace(/"/g, '""');
}

export function downloadCsv(data: any[], name = 'results.csv') {
  const rows = data;
  const keys = Object.keys(rows[0] || {});
  const csv = [
    keys.map((key) => `"${escapeQuote(key)}"`).join(','),
    ...rows.map((obj: any) => {
      return keys.map((key) => `"${escapeQuote(obj[key])}"`).join(',');
    }),
  ];
  downloadFile(name, csv.join('\n'));
}
