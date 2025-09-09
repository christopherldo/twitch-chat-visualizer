# Twitch Chat Visualizer

![GitHub repo size](https://img.shields.io/github/repo-size/christopherldo/twitch-chat-visualizer?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/christopherldo/twitch-chat-visualizer?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/christopherldo/twitch-chat-visualizer?style=for-the-badge)

> A highly customizable, real-time Twitch chat overlay for streamers. Designed for easy integration with OBS and other broadcasting software.

This project provides a clean, browser-based chat visualizer that connects directly to the Twitch API, offering extensive styling options and support for popular third-party emotes.

---

### Preview

![twitch-chat-visualizer-screenshot](https://github.com/christopherldo/twitch-chat-visualizer/blob/assets/Screenshot.png?raw=true)

### Key Features

* 🎨 **Full Customization:** Choose your favorite colors for usernames, messages, and backgrounds.
* 👻 **Transparency Mode:** A dedicated mode that generates a transparent background link perfect for OBS browser sources.
* 🚀 **Real-Time Emotes:** Full support for native Twitch emotes (including animated ones), BetterTTV (BTTV), and FrankerFaceZ (FFZ).
* 🛡️ **Moderation Events:** Displays message deletions by moderators in real-time.

---

### 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **API:** Twitch API (TMI.js)

---

### 📺 Usage for Streamers

1.  **Access the tool:** Go to [twitch.chrisldo.com](https://twitch.chrisldo.com/)
2.  **Connect:** Input your Twitch channel name and press OK.
3.  **Customize:** Click the gear icon (⚙️) to set up your preferred chat style.
4.  **Get Link:** Check the "Transparent" box. A modal will appear.
5.  **Copy Link:** Click "Click here to copy" to get the overlay URL.
6.  **Add to OBS:** Create a new "Browser" source in OBS, paste the URL, and adjust the size (400px width is recommended).

---

### 👨‍💻 Getting Started for Developers

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/christopherldo/twitch-chat-visualizer.git
    cd twitch-chat-visualizer
    ```
2.  **Install dependencies:**
    ```sh
    # Using yarn is recommended
    yarn install
    ```
3.  **Setup environment variables:**
    * Copy the example file: `cp .env.example .env`
    * Edit the `.env` file and add your Twitch App `client_id` and `client_secret`. [Learn how to get them here](https://dev.twitch.tv/docs/authentication/register-app/).
4.  **Run the application:**
    ```sh
    yarn start
    ```
5.  **Access:** Open your browser and navigate to `http://localhost:3000`.

---

### ❤️ Support

If you enjoy this tool, please consider supporting the project:

* ⭐ Star this repository on GitHub.
* 💸 Donate via [Paypal](https://streamelements.com/christopherldo/tip).
