# 💱 Crypto & FIAT Universal Converter

A lightweight, elegant, and fast browser extension to convert between cryptocurrencies (BTC, ETH, USDT, XMR) and FIAT currencies (USD, EUR) in real-time. Built with Manifest V3.

![Extension Preview](https://via.placeholder.com/400x300?text=Screenshot+of+your+extension+here) *(Note: replace this link with a real screenshot of your extension!)*

## ✨ Features

- **Real-Time Rates:** Fetches live cryptocurrency prices using the free [CoinGecko API](https://www.coingecko.com/).
- **Drag & Drop UI:** Easily reorder the currency list by dragging the `⋮⋮` handle. Your custom order is permanently saved in the browser's local storage.
- **Session Memory:** The extension remembers your last input. If you close the popup and reopen it, your calculations are still there!
- **Smart Caching:** To prevent API rate limits, exchange rates are cached for 60 seconds. A manual "Refresh Rates" button is available.
- **Auto-Localization:** Automatically detects your browser's language. Currently supports English (`en`), Italian (`it`), and Spanish (`es`).
- **Zero Image Dependencies:** Uses high-quality, inline SVG vectors for currency logos to ensure instant loading and crystal-clear rendering at any zoom level.

## 🚀 Supported Browsers

This extension is compatible with all Chromium-based browsers:
- Google Chrome
- Brave
- Opera
- Microsoft Edge

## 🛠️ Installation (Developer Mode)

Since this extension is not yet published on the Web Store, you can install it manually in a few seconds:

1. **Download or Clone** this repository to your local machine.
2. Open your browser and go to the extensions page:
   - Chrome / Brave: `chrome://extensions/`
   - Opera: `opera://extensions/`
   - Edge: `edge://extensions/`
3. Turn on **Developer mode** (usually a toggle in the top right corner).
4. Click on the **Load unpacked** button.
5. Select the folder containing the extension files (`manifest.json`, `popup.html`, etc.).
6. Pin the extension to your browser toolbar for quick access!

## ➕ How to add new cryptocurrencies

This extension is built dynamically. To add a new coin (e.g., Solana), you don't need to change the conversion logic. You just need to add its data to the `CURRENCIES` array at the top of `popup.js`.

1. Find the correct API ID on CoinGecko (e.g., for Solana it's `solana`).
2. Get an SVG logo for the coin.
3. Add a new object to the array:

```javascript
{ 
  id: "solana", 
  symbol: "SOL", 
  logo: `<svg>...your svg code here...</svg>`
}
```
The script will automatically fetch its price and add it to the UI!

## 📂 File Structure

- `manifest.json` - Extension configuration and permissions.
- `popup.html` - The HTML structure of the popup interface.
- `popup.css` - Styling, layout, and drag-and-drop visual feedback.
- `popup.js` - The core logic (API fetching, caching, drag-and-drop, conversions, i18n).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). 
Data provided by [CoinGecko](https://www.coingecko.com/).
