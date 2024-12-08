# Intelligent IoT-Based Mushroom Cultivation System

This project contains the implementation of an **IoT and AI-powered system** designed to automate mushroom cultivation. The system integrates IoT devices for real-time monitoring and control, AI models for disease detection and maturity classification, and a mobile application for remote management, providing a modern, scalable solution for mushroom farming.

## Overview

Traditional mushroom cultivation methods are labor-intensive and prone to errors, often resulting in suboptimal growth and lower yields. This project addresses these challenges by combining **IoT** for environmental monitoring and control, **AI** for disease and maturity analysis, and a **mobile application** for seamless user interaction.

### Key Objectives
1. Automate the monitoring and control of critical environmental parameters (temperature, humidity, pH, etc.).
2. Provide AI-powered insights for disease detection and maturity classification.
3. Enable real-time monitoring, control, and notifications through a user-friendly mobile app.

## Features

### 1. Environmental Monitoring
- **Sensors** track key parameters like temperature, humidity, light, pH, and air quality.
- **Real-time Adjustments**: Automated control of fans, humidifiers, and lights ensures optimal growing conditions.

### 2. SVR Model for Prediction
- Predicts temperature and humidity trends for the next 5 minutes using Support Vector Regression (SVR).

### 3. Mushroom Disease Detection
- AI-based image classification identifies diseases by analyzing mushroom shape and color.

### 4. Maturity Detection
- Detects mushroom maturity through AI-powered image analysis of shape and size.

### 5. Mobile Application
- Built using Flutter, providing real-time monitoring, control, and predictive alerts.
- Offers an intuitive interface for farmers to adjust environmental settings and receive actionable recommendations.

## Architectural Overview

The system's architecture includes three core components:
- **IoT Devices**: Sensors and actuators connected to an ESP32 microcontroller for real-time data collection and control.
- **AI Models**: Machine learning models for disease detection, maturity analysis, and predictive environmental insights.
- **Mobile Application**: A Flutter-based app for monitoring, notifications, and remote control.

### Architectural Diagram:
                     +-------------------------+
                     |       Cloud Storage     |
                     +----------+--------------+
                                |
              +-----------------+------------------+
              |                                    |
+-------------v-----------+            +----------v-----------+
|       IoT Devices       |            |       Mobile App      |
| - Sensors               |            | - Real-time Monitoring|
| - Actuators             |            | - Alerts & Control    |
| - ESP32 Microcontroller |            | - Predictive Insights |
+-------------+-----------+            +----------+------------+
              |                                    |
              +----------------+    +-------------+
                               |    |
                               v    v
                          +----+----+----+
                          |   AI Models   |
                          | - Disease     |
                          | - Maturity    |
                          | - SVR Forecast|
                          +---------------+


# Dependencies
  IoT Components
    -Microcontroller: ESP32
  Sensors:
    -DHT22 (temperature and humidity)
    -MQ135 (air quality)
    -pH sensor (pH levels)
  Actuators: 
    -Fans, humidifiers, lights
  AI Frameworks
    Python Libraries:
        -TensorFlow/Keras (image classification)
        -Scikit-learn (SVR model)
        -OpenCV (image preprocessing)
Mobile Development
  Framework: Flutter
  Plugins:
    http (API integration)
    firebase (cloud database)
    provider (state management)
