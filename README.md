# Healthcare API

A modern healthcare API for managing patients, doctors, and their relationships.

## Features

- 🔐 Authentication & Authorization
- 👨‍⚕️ Doctor Management
- 🏥 Patient Management
- 🔗 Patient-Doctor Mapping
- 📝 Documentation

## Prerequisites

- Node.js (v14+)
- MongoDB (v4+)
- npm/yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/healthcare-api.git
cd healthcare-api
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env`

5. Start the server:
```bash
npm start
```

## API Documentation

### Environment variables
![Screenshot 2025-02-15 213935](https://github.com/user-attachments/assets/ef4d673b-b4a8-41f2-b775-d73269d7ff59)


### Authentication

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "Password@123",
    "role": "admin"
}
```
![Screenshot 2025-02-15 215802](https://github.com/user-attachments/assets/09c8be07-1479-4f21-888e-9007a6f2a70b)



#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "admin@example.com",
    "password": "Password@123"
}
```
![Screenshot 2025-02-15 213615](https://github.com/user-attachments/assets/d6c812b5-dc34-4f78-9735-629e19b70405)

### Doctors

#### Create Doctor
```http
POST /api/v1/doctors
Authorization: Bearer <token>
Content-Type: application/json

{
    "name": "Dr. Smith",
    "email": "dr.smith@example.com",
    "phone": "9876543210",
    "specialization": "Cardiology",
    "experience": 10,
    "address": "456 Medical Center"
}
```
![Screenshot 2025-02-15 213957](https://github.com/user-attachments/assets/283f33b0-d098-4594-87cc-f37f4f578940)

#### Get Doctor
![Screenshot 2025-02-15 214056](https://github.com/user-attachments/assets/fb00be6a-c071-4282-b638-fb42ee65045f)

#### Update Doctor
![Screenshot 2025-02-15 214449](https://github.com/user-attachments/assets/8dc975f4-1c84-457c-bda9-cbbcb7e8291b)

#### Delete Doctor
![Screenshot 2025-02-15 214518](https://github.com/user-attachments/assets/35587b04-cc37-4376-9b22-c90b9600953a)

### Patients

#### Create Patient
```http
POST /api/v1/patients
Authorization: Bearer <token>
Content-Type: application/json

{
    "name": "John Doe",
    "age": 30,
    "gender": "Male",
    "phone": "1234567890",
    "address": "123 Main St",
    "bloodGroup": "O+"
}
```
![Screenshot 2025-02-15 214124](https://github.com/user-attachments/assets/88d811ac-1500-427b-bcca-a27daba2bf2b)

### Mappings

#### Create Mapping
```http
POST /api/v1/mappings
Authorization: Bearer <token>
Content-Type: application/json

{
    "patientId": "patient_id_here",
    "doctorId": "doctor_id_here",
    "notes": "Regular checkup"
}
```
![Screenshot 2025-02-15 214249](https://github.com/user-attachments/assets/2a746362-7d22-47b0-848b-317fa6502dad)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Last Updated

2025-02-15 15:21:20
