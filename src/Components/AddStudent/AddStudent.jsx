import React, { useState } from 'react';
import axios from '../../axiosConfig.js';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import './AddStudent.css'

const AddStudent = () => {
  const [internID, setInternID] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [batchnumber, setBatchNumber] = useState('');
  const [email, setEmail] = useState('');
  const [internDuration, setInternDuration] = useState('');
  const [internStartDate, setInternStartDate] = useState('');
  const [internEndDate, setInternEndDate] = useState('');
  const [domain, setDomain] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Generate a random ID (or use some logic to generate it)
    // const uniqueID = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
  
    let INT_ID = `${domain}${batchnumber}${internID}`;
    console.log(INT_ID);
  
    const userData = {
      internID: INT_ID.toUpperCase(),
      name,
      password,
      batchnumber,
      email,
      internDuration,
      internStartDate,
      internEndDate
    };
  
    const result = await Swal.fire({
      title: 'Please confirm the details',
      html: `<pre>${JSON.stringify(userData, null, 2)}</pre>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.post('/api/admin/signupUser', userData);
  
        if (response.data.success) {
          Swal.fire('Success!', response.data.message, 'success');
          setInternID('');
          setName('');
          setPassword('');
          setBatchNumber('');
          setEmail('');
          setInternDuration('');
          setInternStartDate('');
          setInternEndDate('');
        } else {
          Swal.fire('Error!', response.data.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
        console.error('Error:', error.message);
      }
    }
  };
  

  return (
    <>
      <br />
      <form onSubmit={handleSubmit} className="add-user-form">
        <h3 className='add_user_heading'>Add New Student</h3>
        <div>
          <label>Intern ID:</label>
          <input
            type="text"
            value={internID || ''}
            onChange={(e) => setInternID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Batch Number:</label>
          <input
            type="number"
            value={batchnumber || ''}
            onChange={(e) => setBatchNumber(e.target.value)}
            min="1"
            max="100"
            required
          />
        </div>
        <div>
          <label>Email ID:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="sem-group">
            <label className="sem-label">Domain:</label>
            <select
              className="sem-input"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            >
              <option value="">Select Domain</option>
              <option value="SWPAFE">Frontend Developer</option>
              <option value="SWPAAM">AI / ML</option>
              <option value="SWPACS">Cybersecurity</option>
              <option value="SWPAUI">UI/UX Design</option>
              <option value="SWPAGA">Gen-AI</option>
            </select>
          </div>

        <div>
          <label>Intern Duration (months):</label>
          <input
            type="number"
            value={internDuration}
            onChange={(e) => setInternDuration(e.target.value)}
            min="1"
            required
          />
        </div>
        <div>
          <label>Intern Start Date:</label>
          <input
            type="date"
            value={internStartDate}
            onChange={(e) => setInternStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Intern End Date:</label>
          <input
            type="date"
            value={internEndDate}
            onChange={(e) => setInternEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </>
  );
}

export default AddStudent;