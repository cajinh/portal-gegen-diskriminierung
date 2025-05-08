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
    throw new Error('Fehler beim Absenden der Meldung');
  }

  return response.json;
}

export async function fetchReports() {
  const response = await fetch(
    'http://localhost/portalgegendiskriminierung/api/report.php',
    {
      method: 'GET',
    },
  );

  if (!response.ok) {
    throw new Error('Fehler beim Abrufen der Reports');
  }

  return response.json();
}

export async function updateReport(reportId) {
  try {
    const response = await fetch(
      `http://localhost/portalgegendiskriminierung/api/report.php?id=${reportId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increment_report_count: true }),
      },
    );

    const data = await response.json();
  } catch (error) {
    console.error('Fehler beim Hochzählen:', error);
  }
}
