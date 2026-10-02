import { useEffect, useState } from 'react';
import { apiBase, readCollection } from '../api.js';
import CollectionView from './CollectionView.jsx';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'fitnessLevel', label: 'Level' },
  { key: 'weeklyGoalMinutes', label: 'Weekly goal (min)' },
  { key: 'team', label: 'Team' },
];

export default function Users() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/api/users/`, { signal: controller.signal })
      .then(readCollection)
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('Users could not be loaded. Check the API connection and try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return <CollectionView title="Users" description="Athlete profiles and personal training goals." columns={columns} records={records} loading={loading} error={error} />;
}
