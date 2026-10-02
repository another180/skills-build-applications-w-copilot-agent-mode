import { useEffect, useState } from 'react';
import { apiBase, readCollection } from '../api.js';
import CollectionView from './CollectionView.jsx';

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'difficulty', label: 'Level' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'focusAreas', label: 'Focus' },
];

export default function Workouts() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/api/workouts/`, { signal: controller.signal })
      .then(readCollection)
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('Workouts could not be loaded. Check the API connection and try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return <CollectionView title="Workouts" description="Suggested sessions for your next training day." columns={columns} records={records} loading={loading} error={error} />;
}
