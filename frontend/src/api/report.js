export async function createReport(data) {
  const response = await fetch(
    'http://localhost/portalgegendiskriminierung/api/report.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error('Fehler beim Speichern des Reports');
  }

  return response.json();
}
