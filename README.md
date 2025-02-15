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

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "admin@example.com",
    "password": "Password@123"
}
```

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

TeAcHaCk

## Last Updated

2025-02-15 15:21:20
