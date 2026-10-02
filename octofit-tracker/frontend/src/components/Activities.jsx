import { useEffect, useState } from 'react';
import { apiBase, readCollection } from '../api.js';
import CollectionView from './CollectionView.jsx';

const columns = [
  { key: 'user', label: 'Athlete' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'caloriesBurned', label: 'Calories' },
  { key: 'date', label: 'Date' },
];

export default function Activities() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/api/activities/`, { signal: controller.signal })
      .then(readCollection)
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('Activities could not be loaded. Check the API connection and try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return <CollectionView title="Activities" description="Recent movement logged by your community." columns={columns} records={records} loading={loading} error={error} />;
}
