# qqmusic-to-spotify
## Introduction
qqmusic-to-spotify is a tiny Node.js tool to easily migrate qq music songs to spotify.

## Getting Started
Before using qqmusic-to-spotify, ensure that you have the following prerequisites:
- **Node.js**: Make sure you have Node.js installed on your system. You can download and install Node.js from the official website: [Node.js](https://nodejs.org/)
- **Spotify token**: You need to copy the Spotify token from the [Spotify](https://open.spotify.com/) and paste it into the corresponding location in `config/default.json`
- **QQ Music cookie**: Similarly, You need to copy the QQ Music cookie from the [QQ Music](https://y.qq.com/) and paste it into the corresponding location in `config/default.json`

1. **Clone the Repository**: Clone the qqmusic-to-spotify repository from GitHub to your local machine using the following command:
```bash
git clone https://github.com/MortalreminderPT/qqmusic-to-spotify.git
```
2. **Install Dependencies**: Navigate to the directory where the repository is cloned and install the necessary dependencies by running:
```bash
npm install
```
3. **Configure Authentication**: Open the `config/default.json` file and replace the placeholders for the Spotify token and QQ Music cookie with your own tokens obtained in the previous steps.
4. **Run the Tool**: Execute the qqmusic-to-spotify script by following command:
```bash
node qqmusic_to_spotify.js
```

**Enjoy your music in Spotify!**