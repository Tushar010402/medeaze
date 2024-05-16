// React imports
import React, { useState, useEffect } from 'react';

// Component definition
const EntriesList = () => {
  // State variables
  const [entries, setEntries] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch data effect
  useEffect(() => {
    fetchData();
  }, [pageNumber, statusFilter]);

  // Fetch data function
  const fetchData = async () => {
    try {
      const username = 'TusharAgrawal098';
      const password = 'TusharAgrawal@1234567890';
      const credentials = `${username}:${password}`;
      const encodedCredentials = btoa(credentials);

      const response = await fetch(`/api/entries?page=${pageNumber}&action_text=${statusFilter}`, {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      
      const data = await response.json();
      setEntries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching entries:', error);
      setLoading(false);
    }
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Table row component
  const TableRow = ({ entry, index }) => (
    <tr key={entry.id}>
      <td>{index + 1}</td>
      <td>{entry.name}</td>
      <td>{entry.email}</td>
      <td>{entry.contact}</td>
      <td>{entry.comment}</td>
      <td>{new Date(entry.created_at).toLocaleString()}</td>
    </tr>
  );

  // Return JSX
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">List of Entries</h2>
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Status:</label>
        <select id="statusFilter" value={statusFilter} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Reject">Reject</option>
        </select>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Comment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            entries.map((entry, index) => (
              <TableRow key={entry.id} entry={entry} index={index} />
            ))
          )}
        </tbody>
      </table>
      <div className="mt-4">
        <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">
          Previous Page
        </button>
        <button onClick={() => setPageNumber(pageNumber + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
          Next Page
        </button>
      </div>
    </div>
  );
};

// Export the component
export default EntriesList;
