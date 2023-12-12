# Water Treatment Cloud Project

## 📖 Project Overview
![image](https://github.com/RestartDK/water-treatment-cloud/assets/58006998/9720b1cc-1743-4cc5-a8df-d74436676129)

The Valve Management System is designed to efficiently monitor and control valve operations remotely. This project aims to provide a seamless interface for managing valve states, scheduling valve operations, and monitoring real-time statuses, enhancing operational efficiency and reliability in fluid control systems.


## ⭐ Features

- **Real-time Valve State Monitoring**: Utilize Azure Functions and Device Twins to track the current state of valves in real-time, offering immediate insights into system performance.

- **Remote Valve Control**: Leverage cloud-based control mechanisms to turn valves on or off from anywhere with Azure IOT Hub, ensuring flexibility and remote manageability.

- **Scheduling with Precision**: Implement scheduling of valve operations through Azure Queue Storage for automated workflows.

- **Cloud-Enabled Scalability**: The system is designed to scale thanks to its cloud-based architecture, which allows for dynamic resource allocation and management.

## 🛠️ Technologies Used

- **Frontend**:
  - React.js
  - Vite
  - React Query
  - Tailwind CSS

- **Backend**:
  - Azure Functions
  - Node.js
  - Docker

- **Database**:
  - Azure Queue Storage

## ✏️ Installation and Setup

1. **Clone the Repository**
   ```
   git clone https://github.com/RestartDK/water-treatment-cloud
   cd water-treatment-cloud
   ```

2. **Set up Webapp**
   ```
   bun install
   ```
   Start the development server:
   ```
   bun run dev
   ```

3. **Set up Virtualised Raspberry Pi**
    ```
    docker pull dkumlin/raspberry-pi:1.1
    ```
    Run the container with primary device connection string
    ```
    docker run -e CONNECTION_STRING="<YOUR_CONNECTION_STRING>" -p 4000:80 dkumlin/raspberry-pi:1.1
    ```

4. **Start Azure function locally**
    ```
    git clone https://github.com/RestartDK/valve-connector
    cd valve-connector
    ```

    Install all relevant dependencies
    ```
    bun install
    ```

    Run the azure functions locally
    ```
    bun run start
    ```

5. **Environment Variables**
   Set up the necessary environment variables in a `local.setting.json` file for the azure function.

   For more information, visit the [Valve Connector GitHub Repository](https://github.com/RestartDK/valve-connector).


## ⚙️ Running the Application

- To run the frontend, execute `bun start` in the frontend directory.

## 🔗 Additional Links
- [Valve Connector GitHub Repository](https://github.com/RestartDK/valve-connector)
- [Docker Image for Raspberry Pi](https://hub.docker.com/repository/docker/dkumlin/raspberry-pi/general)
