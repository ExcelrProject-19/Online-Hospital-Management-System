import { useEffect, useState } from "react";
import { getAllUsers, AssignAsADoctor } from "../../../api"; // Ensure AssignAsADoctor is correctly set up
import 'bootstrap/dist/css/bootstrap.min.css'; // Assuming you're using Bootstrap for styling

const AllPatients = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user
  const [doctorData, setDoctorData] = useState({
    degree: "",
    qualification: "",
    status: "ACTIVE", // Default status
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);

  const handleAssignDoctor = (user) => {
    setSelectedUser(user); // Set the selected user for doctor registration
    setModalVisible(true); // Show the modal
  };

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUser) {
      try {
        // Call the API to assign the doctor role and save doctor details
        await AssignAsADoctor(selectedUser.uid, doctorData);

        // Alert with user ID after successful registration
        alert(`${selectedUser.uid} is added as a Doctor now`);

        // Close the modal and reset the form
        setModalVisible(false);
        setDoctorData({
          degree: "",
          qualification: "",
          status: "ACTIVE",
        });
      } catch (error) {
        console.error("Error assigning doctor", error);
        alert("Error assigning doctor");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Users</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>UID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Aadhar Number</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>State</th>
            <th>Address</th>
            <th>Actions</th> {/* Add actions column for assigning doctor */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.aadharNumber}</td>
              <td>{user.gender}</td>
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.address}</td>
              <td>
                {/* Add button to assign doctor */}
                <button
                  className="btn btn-primary"
                  onClick={() => handleAssignDoctor(user)}
                >
                  Register as Doctor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for doctor registration */}
      {modalVisible && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Register Doctor</h5>
                <button type="button" className="close" onClick={() => setModalVisible(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="degree">Degree</label>
                    <input
                      type="text"
                      className="form-control"
                      id="degree"
                      name="degree"
                      value={doctorData.degree}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="qualification">Qualification</label>
                    <input
                      type="text"
                      className="form-control"
                      id="qualification"
                      name="qualification"
                      value={doctorData.qualification}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      className="form-control"
                      id="status"
                      name="status"
                      value={doctorData.status}
                      onChange={handleChange}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPatients;
