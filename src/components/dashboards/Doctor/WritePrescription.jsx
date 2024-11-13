import { useState, useEffect } from 'react';
import { getAppointmentsForDoctor } from '../../../api';

const WritePrescription = () => {
    const [appointments, setAppointments] = useState([]);
    const [medicines, setMedicines] = useState([{ name: '', type: '', instructions: '' }]);
    const [diagnoses, setDiagnoses] = useState([{ diagnosis: '', instructions: '' }]);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointmentsForDoctor();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching doctor appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleAddMedicine = () => {
        setMedicines([...medicines, { name: '', type: '', instructions: '' }]);
    };

    const handleAddDiagnosis = () => {
        setDiagnoses([...diagnoses, { diagnosis: '', instructions: '' }]);
    };

    const handleSubmitPrescription = () => {
        // Handle submission logic (API call, etc.)
        alert("Prescription Submitted!");
    };

    return (
        <div>
            {/* Appointment & Patient Details */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Patient & Appointment Details</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Appointment Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment.appointmentId}>
                                    <td>{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</td>
                                    <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                                    <td>{appointment.description}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No appointments found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Medicines Section */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Medicines</h4>
                    <button 
                        type="button" 
                        style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }} 
                        onClick={handleAddMedicine}>
                        + {/* Plus icon */}
                    </button>
                </div>
                {medicines.map((medicine, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Medicine Name"
                            value={medicine.name}
                            onChange={(e) => {
                                const updatedMedicines = [...medicines];
                                updatedMedicines[index].name = e.target.value;
                                setMedicines(updatedMedicines);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Medicine Type"
                            value={medicine.type}
                            onChange={(e) => {
                                const updatedMedicines = [...medicines];
                                updatedMedicines[index].type = e.target.value;
                                setMedicines(updatedMedicines);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Instructions"
                            value={medicine.instructions}
                            onChange={(e) => {
                                const updatedMedicines = [...medicines];
                                updatedMedicines[index].instructions = e.target.value;
                                setMedicines(updatedMedicines);
                            }}
                        />
                    </div>
                ))}
            </section>

            {/* Diagnosis Section */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Diagnosis</h4>
                    <button 
                        type="button" 
                        style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }} 
                        onClick={handleAddDiagnosis}>
                        + {/* Plus icon */}
                    </button>
                </div>
                {diagnoses.map((diagnosis, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Diagnosis"
                            value={diagnosis.diagnosis}
                            onChange={(e) => {
                                const updatedDiagnoses = [...diagnoses];
                                updatedDiagnoses[index].diagnosis = e.target.value;
                                setDiagnoses(updatedDiagnoses);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Instructions"
                            value={diagnosis.instructions}
                            onChange={(e) => {
                                const updatedDiagnoses = [...diagnoses];
                                updatedDiagnoses[index].instructions = e.target.value;
                                setDiagnoses(updatedDiagnoses);
                            }}
                        />
                    </div>
                ))}
            </section>

            {/* Notes Section */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Notes & Advice</h4>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write any notes or advice here"
                    style={{ width: '100%', height: '100px' }}
                ></textarea>
            </section>

            {/* Submit Button */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleSubmitPrescription}>Submit Prescription</button>
            </div>
        </div>
    );
};

export default WritePrescription;
