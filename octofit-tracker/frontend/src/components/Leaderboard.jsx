import { useEffect, useState } from 'react';
import { apiBase, readCollection } from '../api.js';
import CollectionView from './CollectionView.jsx';

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'Athlete' },
  { key: 'score', label: 'Score' },
  { key: 'streakDays', label: 'Streak (days)' },
  { key: 'totalDistanceKm', label: 'Distance (km)' },
];

export default function Leaderboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/api/leaderboard/`, { signal: controller.signal })
      .then(readCollection)
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('The leaderboard could not be loaded. Check the API connection and try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return <CollectionView title="Leaderboard" description="A snapshot of the community standings." columns={columns} records={records} loading={loading} error={error} />;
}
