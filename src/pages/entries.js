import React, { useState, useEffect } from 'react';

const EntriesList = () => {
  const [entries, setEntries] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    fetchData();
  }, [pageNumber, statusFilter]);

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
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateTimeChange = (e) => {
    setSelectedDateTime(e.target.value);
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };

  const handleSubmit = async (entryId, status, scheduledDateTime, remark) => {
    try {
      const username = 'TusharAgrawal098';
      const password = 'TusharAgrawal@1234567890';
      const credentials = `${username}:${password}`;
      const encodedCredentials = btoa(credentials);

      const response = await fetch(`/api/entries/${entryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify({
          status: status,
          scheduledDateTime: scheduledDateTime,
          remark: remark,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update entry');
      }

      setPageNumber(1); // Refresh entries after update
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const TableRow = ({ entry, serialNumber }) => {
    const [selectedStatus, setSelectedStatus] = useState(entry.action_text);
    const [selectedDateTime, setSelectedDateTime] = useState(entry.scheduledDateTime);
    const [remark, setRemark] = useState(entry.remark_text);
  
    const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
    };
  
    const handleRemarkChange = (e) => {
      setRemark(e.target.value);
    };
  
    const handleAction = () => {
      handleSubmit(entry.id, selectedStatus, selectedDateTime, remark);
    };
  
    // Function to convert UTC date to local IST date
    const convertToIST = (utcDateStr) => {
      const utcDate = new Date(utcDateStr);
      return utcDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    };
  
    return (
      <tr>
        <td>{serialNumber}</td>
        <td>{entry.name}</td>
        <td>{entry.email}</td>
        <td>{entry.contact}</td>
        <td>{entry.comment}</td>
        <td>{convertToIST(entry.created_at)}</td> {/* Display created_at in IST */}
        <td>
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value=" ">Select State</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Reject">Reject</option>
          </select>
        </td>
        <td>
          <input type="text" value={remark} onChange={handleRemarkChange} placeholder="Remark" className="mb-1" />
        </td>
        <td>
          <button onClick={handleAction} className="text-blue-500 hover:underline">Update</button>
        </td>
      </tr>
    );
  };
  
  
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
            <th>Actions</th>
            <th>Remark</th>
            <th>Update</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry, index) => (
            <TableRow key={entry.id} entry={entry} serialNumber={index + 1} />
          ))}
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

export default EntriesList;
