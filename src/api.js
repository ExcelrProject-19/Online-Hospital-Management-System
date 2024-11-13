// api.js

import axios from 'axios';

const API_URL = 'http://localhost:9090/api';

export const getAuthenticatedDoctor = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.get(`${API_URL}/doctors/me`, {
            headers: {
                 'Authorization': `Bearer ${user.token}`
            },
        });
        return response.data; // This will return the doctor details
    } catch (error) {
        console.error('Error fetching authenticated doctor:', error);
        throw error; // Propagate the error for further handling
    }
};


//ADMIN/me
export const getAuthenticatedAdmin = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.get(`${API_URL}/admin/me`, {
            headers: {
                 'Authorization': `Bearer ${user.token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching authenticated Admin:', error);
        throw error; // Propagate the error for further handling
    }
};

//USER/ME
export const getAuthenticatedPatient = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.get(`${API_URL}/patient/me`, {
            headers: {
                 'Authorization': `Bearer ${user.token}`
            },
        });
        return response.data; // This will return the doctor details
    } catch (error) {
        console.error('Error fetching authenticated patient:', error);
        throw error; // Propagate the error for further handling
    }
};

    //Get All Doctors 
    export const getAllDoctors = async()=>{
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user || !user.token){
            throw new Error('no valid user session found');
        }

        try {
            const response = await axios.get(`${API_URL}/doctors`, {
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            }
               
            );
            console.log(response.data)
            return response.data;
            
        } catch (error) {
            console.error('Error fetching all doctors:', error)
            throw error;
        }
    };


    //Assign As a Doctor (Admin Authority)

    export const AssignAsADoctor = async(userId, doctorDTO)=>{
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user || !user.token){
            throw new Error('no valid user session found');
        }

        try {

            const response = await axios.post(`${API_URL}/doctors/assign/${userId}`, doctorDTO,{
                headers : {
                    'Authorization' : `Bearer ${user.token}`

                }
            });
            return response.data; 
            
        } catch (error) {
            console.error('Error assigning doctor role to patient:', error);
        throw error;
        }
    }


// Delete doctor by ID (new code)
export const deleteDoctor = async (doctorId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        await axios.delete(`${API_URL}/doctors/delete/${doctorId}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        throw error;
    }
};

// Add a new doctor (new code)
export const addDoctor = async (doctorData) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.post(`${API_URL}/doctors/add`, doctorData, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json', // Ensure the content type is JSON
            },
        });

        return response.data; // Return the added doctor data
    } catch (error) {
        console.error('Error adding doctor:', error);
        throw error; // Propagate error
    }
};

//All Users
export const getAllUsers = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
        throw new Error('No valid user session found');
        }
        try {
            const response = await axios.get(`${API_URL}/patients`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    },
                });
                    return response.data;
                    } catch (error) {
                        console.error('Error fetching all users:', error);
                        throw error;
                    }
                };






//Book Appointment
export const bookAppointment = async (appointmentDTO) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.post(`${API_URL}/appointments/book`, appointmentDTO, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data; // This will return the custom appointment response
    } catch (error) {
        console.error('Error booking appointment:', error);
        throw error;
    }
};





//doctors can see this appointments: 
export const getAppointmentsForDoctor = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.get(`${API_URL}/appointments/doctor`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        return response.data; // This will return the list of appointments for the doctor
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        throw error;
    }
};





//Patients can see their appointments
export const getAppointmentsForPatient = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.get(`${API_URL}/appointments/patient`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json', // Ensure the content type is JSON
            },
        });

        return response.data; // This will return the list of appointments for the patient
    } catch (error) {
        console.error('Error fetching patient appointments:', error);
        throw error;
    }
};



//Patients Can Reschedule
export const rescheduleAppointment = async (appointmentDTO) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.put(`${API_URL}/appointments/reschedule`, appointmentDTO, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data; // This will return the custom appointment response with updated details
    } catch (error) {
        console.error('Error rescheduling appointment:', error);
        throw error;
    }
};


//Patients Can Cancel:
export const cancelAppointment = async (appointmentDTO) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.delete(`${API_URL}/appointments/cancel`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            data: appointmentDTO, // Send the appointment details in the body
        });

        return response.data; // This will return the cancellation response
    } catch (error) {
        console.error('Error canceling appointment:', error);
        throw error;
    }
};

