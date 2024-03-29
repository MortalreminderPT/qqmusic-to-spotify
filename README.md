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

## How to get cookie and token?

### QQ Music

1. **Open Developer Tools**: Open the [qq music website](https://y.qq.com/) in your browser, then press the F12 key or right-click on the page and select "Inspect" to open the developer tools.

2. **Switch to the "Network" Tab**: In the developer tools, select the "Network" tab, which will display all the network requests that occur during the page loading process.

3. **Click on Any Request**: In the "Network" tab, click on any request to view the details of that request.

4. **Find the Cookie**: In the request details, there is usually a section called "Headers" or "Header". In this section, you should be able to find the part containing the Cookie information. Typically, the Cookie is located in the "Cookie" field of the request headers.

5. **Copy the Cookie**: Find the desired Cookie information in the "Cookie" field and copy its content.

### Spotify

1. **Open Developer Tools**: Open the [spotify website](https://open.spotify.com/) in your browser, then press the F12 key or right-click on the page and select "Inspect" to open the developer tools.

2. **Switch to the "Network" Tab**: In the developer tools, select the "Network" tab, which will display all the network requests that occur during the page loading process.

3. **Click on Any Request**: In the "Network" tab, click on any request to view the details of that request.

4. **Find the token**: In the request details, there is usually a section called "Headers" or "Header". In this section, you should be able to find the part containing the token information. Typically, the token is located in the "Authorization" field of the request headers and start with `Bearer`.

5. **Copy the Cookie**: Find the desired token information in the "Authorization" field and copy its content.

6. **Notice**: You don't need to copy the word `Bearer`.

**Enjoy your music in Spotify!**