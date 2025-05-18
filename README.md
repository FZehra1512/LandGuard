# 🌱 Landguard - Smart Urban Greenery Monitoring System

**Landguard** is a university capstone project designed to monitor urban greenery in Karachi and promote plantation efforts using satellite technology and interactive maps. The platform visualizes vegetation density using NDVI data and enables citizens, communities, and administrators to take actionable steps toward urban reforestation.

> 🧭 This repository only contains the **frontend code** for the Landguard platform, built with React.js.

> 🔗 **Video Explanation:** [Drive Link](https://drive.google.com/file/d/1PjABPE79m8jAi2XgkuRoHvQHOqFlv73g/view?usp=sharing)

> 🔗 **Live Demo:** [https://landguard.vercel.app](https://landguard.vercel.app)

---

## 🚀 Project Overview

Karachi faces critical challenges in urban greenery. Landguard tackles this by providing:
- An **interactive NDVI-based map** to track greenery levels in different places in Karachi
- A system to **identify low-NDVI areas** e.g., public parks, schools, play grounds etc for potential plantation
- Tools to **engage communities**, enabling them to contribute in plantation activities.
- An **admin dashboard** for managing plantation sites, verifying plantation activity, and updating NDVI datasets
- A **user dashboard** for managing user created posts and plantation drives

---

## 🧩 Core Features

- 📍 **Interactive Greenery Map Dashboard**: View NDVI levels of different places on a map using React Leaflet & Google Maps API
- 🏫 **Location Layering**: Display parks, schools, and colleges with low vegetation indexes as suggested plantation sites on map
- 📈 **Historical NDVI Checker**: Track vegetation changes over time for specific locations over a defined time period
- 🔐 **User Auth**: Sign up/login with email-password or Google OAuth
- 🛠️ **Admin Dashboard**: Add and Manage plantation sites, and plantation activity using data tables & charts
- 🌿 **User Created Sites**: Users can suggest plantation sites and post them on the platform for other users to conduct plantation activity
- 👥 **Team Drives**: Coordinate volunteer teams for plantation activities
- 🗺️ **Frontend-Backend Sync**: Real-time UI updates via API integration

---

## 🛠️ Tech Stack

**Frontend**:
- React.js
- React Leaflet
- Google Maps API
- Shadcn UI (Tailwind-based component library)
- Context API

**Backend & Tools**:
- MongoDB
- Django and Django REST framework
- Sentinal Hub for NDVI satellite data

---

## 👨‍💻 My Contributions

As the **frontend developer**, I was responsible for:
- Designing and building the **interactive map dashboard**
- Implementing **user authentication** (including Google OAuth)
- Creating the **admin panel** with **data visualizations** and responsive UI
- Contributing to the **landing page UI**
- Integrating frontend with backend APIs for data fetch and updates

---
## ☁️ Deployment

The frontend is deployed using **Vercel**, enabling fast, serverless delivery with CI/CD integration for GitHub commits [https://landguard.vercel.app](https://landguard.vercel.app).

## 📷 Screenshots
![Home Page](https://github.com/user-attachments/assets/864ab085-3d3f-4eba-b7a0-0eac78324d03)

![Map Dashboard](https://github.com/user-attachments/assets/ad59c17b-5034-4986-bf10-81326a28ea87)

![User Created Drives](https://github.com/user-attachments/assets/ddab7b49-4396-4e36-8d13-c29a5e55143f)

![Admin Panel](https://github.com/user-attachments/assets/5030fe55-0952-42a6-a95e-ebf029538d2b)

---
## 👥 Contributors

<table>
  <tr>
    <td>
      Name
    </td>
    <td align="center">
      <a href="https://github.com/FZehra1512">
        <img src="https://avatars.githubusercontent.com/FZehra1512" width="100px;" alt="Fatima Zehra"/>
        <br />
        <sub><b>Fatima Zehra</b></sub>
      </a>
      <br />
    </td>
    <td align="center">
      <a href="https://github.com/Sana-Maryam90">
        <img src="https://avatars.githubusercontent.com/Sana-Maryam90" width="100px;" alt="Sana Maryam"/>
        <br />
        <sub><b>Sana Maryam</b></sub>
      </a>
      <br />
    </td>
  </tr>
  <tr>
    <td>
      Contribution
    </td>
    <td>Contributed to the development of Map Dashboard, Authentication, and Admin Panel</td>
    <td>Contributed in Research and development of Social Module, and User Panel</td>
  </tr>
</table>


## 📄 License

This project was developed as part of a university academic course and is intended for **educational and demonstration purposes only**. Commercial use is not permitted without explicit permission.

---

