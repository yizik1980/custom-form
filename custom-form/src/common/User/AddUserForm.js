import { useState } from 'react';
import { addUserApi } from '../../services/api.user.js';
import Toast from '../../shared/Toast/Toast';
function AddUserForm(props) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
      if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      return newErrors;
    };

    const handleChange = (e) => {
      Toast.error(e.target.name + " changed");
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setLoading(true);
      try {
        const response = addUserApi(formData); // Assume addUserApi is an imported function
        if (response.ok) {
          setFormData({ name: '', email: '', password: '' });
          // Handle success
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  return (
    <div>
       <form onSubmit={handleSubmit} onChange={handleChange}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  )
}



export default Add.user

