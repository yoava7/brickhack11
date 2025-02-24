# Digifit

## Overview
Digifit is a work-in-progress web application that organizes users' outfits. The project uses AI to analyze clothing items, interpret styles, and generate outfit suggestions.

## Features
- AI-powered outfit organization
- User-friendly carousel to browse outfit options
- View your wardrobe digitally

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Next.js
- **Database:** MySQL
- **AI Integration:** ViT-Base AI

# Setup
## General Requirements
- Download and install [Node.js](https://nodejs.org/en/download)
- Download and install [MySQL Version 8.0.41](https://dev.mysql.com/downloads/installer/)
  - It is recommended you choose a full installation in order to view a database through MySQL Workbench
  - It is currently needed to create and run your own local MySQL server for development, to do so, follow these steps in the MySQL Workbench or CLI:
    - Run `CREATE DATABASE clothing_db;` as an SQL script
    - Run `USE clothing_db;` as an SQL script
    - Run `CREATE TABLE clothes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    color VARCHAR(50),
    type VARCHAR(50),
    material VARCHAR(50),
    pattern VARCHAR(50),
    image_url VARCHAR(255)
    );` as an SQL script
## Installing AI Dependencies
- Ensure you have Python installed
- If using a computer with an Nvidia GPU, do the following:
  - Run `pip install transformers` in a terminal
  - Run `pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126` in a terminal
- If using a computer ***without*** an Nvidia GPU, do the following:
  - Run `pip install 'transformers[torch]'` in a terminal
## Completing setup
- Clone the repository to your computer if not done so already
- Move to the `fits` directory by running `cd fits` through your IDE's terminal, or through any other method
- Run `npm install` to download and install all project dependencies
