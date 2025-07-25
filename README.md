# 🖥️ Code-Orbit
> A cloud-based code compiler and execution platform

- #### A Full-stack web app that compiles and runs Python and JavaScript code, deployed on AWS EC2.

- #### This guide walks you through setting up AWS IAM users, launching EC2 instances, configuring the environment, and running the frontend and backend smoothly.

### 📖 Usage Overview

- Enables users to write, compile, and execute multi-line Python and JavaScript code online without local IDE or compiler installation.

- Provides syntax-aware editing and submits code to a secure backend that runs it in isolated temporary files, returning real-time output or errors.

- Displays execution results in a scrollable frontend panel for easy viewing of extensive outputs.

- Hosted on an AWS EC2 instance, facilitating remote access to the web-based code execution environment from anywhere.

## 🚀 Getting Started

### 🉑 Clone the Repository

```bash

git clone https://github.com/janvisiddhpura/code-orbit.git
cd code-orbit

```

### ☁️ AWS Setup Guide                  

#### 🔐 Why IAM Is Needed

- **IAM (Identity and Access Management)** is used to securely manage access to your AWS resources.

- In this project, you create an IAM user so you can:

  - Safely log in to the AWS Console without using your root account.
 
  - Manage EC2 instances, security groups, and other AWS services needed for deployment.
 
  - Follow AWS best practices for security and auditing.

#### 1️⃣ Create IAM User with Admin Access

1. Log in to AWS Console → IAM → Users → Add user

2. Enter username (e.g., your-username)

3. Select AWS Management Console access

4. Set a custom password and uncheck "User must reset password."

5. Attach the AdministratorAccess policy directly

6. Create a user and save the sign-in URL, username, and password

7. Sign-out from current account and sign-in with saved credentials of created user.

> [!IMPORTANT]
> EC2 instance configuration going forward should be carried out using the user account that has been granted Administrator access.

#### 2️⃣ Launch an EC2 Ubuntu Server Instance

1. Go to EC2 Dashboard → Launch Instance

2. Configure:

  - **Name:** your-ec2-instance

  - **AMI:** Ubuntu Server (latest LTS)

  - **Instance type:** t2.micro (free tier eligible)

  - **Key pair:** Select your existing compiler-key-pair or create a new one

  - **Network:** Allow SSH (port 22) from anywhere (0.0.0.0/0)

3. Launch the instance

#### 3️⃣ Configure EC2 Security Group for App Ports

1. Select your EC2 instance → Security tab → Security group link

2. Edit Inbound rules and add:

    - **Port 3000 (React frontend)** → Source: Anywhere (0.0.0.0/0)

    - **Port 5000 (Node backend)** → Source: Anywhere (0.0.0.0/0)

### ⚙️ Setup and Run Application on EC2

1. Connect to EC2 via SSH

    ```bash
  
    ssh -i /path/to/compiler-key-pair.pem ubuntu@<EC2_PUBLIC_IP>
   
    ```

2. Update Packages and Install Dependencies

    ```bash
  
    sudo apt update
    sudo apt install -y nodejs npm python3 python3-pip git
  
    ```

3. Clone Project and Install Node Modules

    ```bash
  
    git clone https://github.com/janvisiddhpura/code-orbit.git
    cd code-orbit
    cd orbit-backend
    npm install
    cd ../orbit-frontend
    npm install
    ```

4. Configure Environment Variables

- Create .env files in frontend and backend folders with appropriate settings.

- Frontend .env (orbit-frontend/.env):

  ```bash
  
  REACT_APP_API_URL=http://<EC2_PUBLIC_IP>:5000
  
  ```

- Backend .env (orbit-backend/.env):

  ```bash
  
  PORT=5000
  PYTHON_CMD=python3
  
  ```

5. Start Backend and Frontend Servers

- Open two terminal sessions or use a terminal multiplexer:

  - Backend Terminal:

    ```bash
    
    cd orbit-backend
    node server.js
    
    ```

  - Frontend Terminal:

    ```bash
    
    cd orbit-frontend
    npm start
    
    ```

🧪 Testing the Application

- Open your browser at:

  ```bash

  http://<EC2_PUBLIC_IP>:3000

  ```

- Write code, select language, and click Run

- View output in the output panel

🙌 Contributions & Support

- Issues and pull requests are welcome!

## Happy coding! 🎉

### 📄 License

- **MIT © janvisiddhpura**
