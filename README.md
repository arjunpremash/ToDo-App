# ToDo-App
A ToDo App Developed using ASP.NET and Angular

---

## Prerequisites

Before you begin, make sure you have met the following requirements:

### 1. **Node.js and npm**  
   - Install [Node.js](https://nodejs.org/) (which includes npm) for managing dependencies.
   - Verify installation by running the following commands in your terminal:
     ```bash
     node -v
     npm -v
     ```

### 2. **Angular CLI**  
   - Install Angular CLI globally using npm:
     ```bash
     npm install -g @angular/cli
     ```

### 3. **.NET SDK** (If you're running the .NET backend)
   - Ensure you have the [.NET SDK](https://dotnet.microsoft.com/download) installed (specific version required by the project).
   - Verify installation:
     ```bash
     dotnet --version
     ```

### 4. **SQL Database**
   - Import the provided SQL file into your MS SQL Server to create the required tables and schema.

## Setup and Installation

Follow the steps below to get this project running locally:

### 1. Clone the Repository

   Clone the project to your local machine:
   ```bash
   git clone https://github.com/arjunpremash/ToDo-App.git
   ```
### 2. Install Frontend Dependencies

   After cloning the repository, navigate to the frontend directory and install the required dependencies using npm:
   ```bash
   cd .\ToDo.Frontend
   npm install
  ```

### 3. Set Up the Backend 

  Navigate to the backend directory and restore the dependencies:
  ```bash
  cd .\ToDo.Backend
  dotnet restore
  ```

### 4. Configure Database Connection String (If applicable)

  Ensure that the database connection string is correctly configured in your backend's appsettings file.
  ```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=your_database;User Id=your_user;Password=your_password;"
}
  ```
### 5. Run the Application
### 5.1 Frontend (Angular) 
  ```bash
  cd .\ToDo.Frontend
  ng serve
  ```
### 5.2 Backend (.NET)
```bash
 cd .\ToDo.Frontend
dotnet run
```
  
##View Application at http://localhost:4200/login
  

