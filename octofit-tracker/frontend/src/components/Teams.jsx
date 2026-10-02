import { useEffect, useState } from 'react';
import { apiBase, readCollection } from '../api.js';
import CollectionView from './CollectionView.jsx';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'sport', label: 'Focus' },
  { key: 'captain', label: 'Captain' },
  { key: 'members', label: 'Members' },
  { key: 'weeklyGoal', label: 'Weekly goal' },
];

export default function Teams() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/api/teams/`, { signal: controller.signal })
      .then(readCollection)
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('Teams could not be loaded. Check the API connection and try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return <CollectionView title="Teams" description="Training groups working toward shared goals." columns={columns} records={records} loading={loading} error={error} />;
}
