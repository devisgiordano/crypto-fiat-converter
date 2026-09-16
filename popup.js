// --- DIZIONARIO MULTILINGUA ---
const TRANSLATIONS = {
  "it": {
    title: "Convertitore Universale",
    refresh: "Aggiorna Tassi",
    copy: "Copia",
    done: "Fatto!",
    checking: "Controllo...",
    downloading: "Download in corso...",
    cached: "Usati tassi in memoria (Limite API)",
    error: "Errore Connessione / API"
  },
  "en": {
    title: "Universal Converter",
    refresh: "Refresh Rates",
    copy: "Copy",
    done: "Done!",
    checking: "Checking...",
    downloading: "Downloading...",
    cached: "Cached rates used (API Limit)",
    error: "Connection / API Error"
  },
  "es": {
    title: "Convertidor Universal",
    refresh: "Actualizar Tasas",
    copy: "Copiar",
    done: "¡Hecho!",
    checking: "Comprobando...",
    downloading: "Descargando...",
    cached: "Tasas en caché (Límite API)",
    error: "Error de conexión / API"
  }
};

// Rileva la lingua del browser (es. "it-IT" diventa "it") e usa l'inglese come fallback
const browserLang = navigator.language.split('-')[0];
const lang = TRANSLATIONS[browserLang] ? browserLang : "en";
const t = (key) => TRANSLATIONS[lang][key];

// --- LISTA VALUTE ---
const CURRENCIES = [
  { 
    id: "bitcoin", symbol: "BTC", 
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#F7931A"/><g transform="translate(-3.2, -3.2) scale(1.2)"><path fill="#FFF" d="M23.3 15.1c.3-1.9-1.1-2.9-3.1-3.6l.6-2.6-1.5-.4-.6 2.6c-.4-.1-.8-.2-1.2-.3l.6-2.6-1.5-.4-.6 2.6c-.3-.1-.7-.2-1.1-.3l-2.1-.5-.4 1.6s1.1.3 1.1.3c.6.2.7.6.6 1l-1.2 4.9c0 .1.1.1.2.2l-.3 0-1 4.2c-.1.3-.3.5-.7.4 0 0-1.1-.3-1.1-.3l-.8 1.5 2 .5c.4.1.8.2 1.2.3l-.6 2.6 1.5.4.6-2.6c.4.1.8.2 1.2.3l-.6 2.6 1.5.4.6-2.6c2.1.4 3.7.2 4.2-1.7.4-1.4-.1-2.2-1-2.8.7-.2 1.3-.8 1.4-2.5zm-3.9 5.3c-.4 1.7-3.1.8-4 .6l.7-2.8c1 0 3.7.3 3.3 2.2zm.4-4.2c-.4 1.5-2.7.7-3.4.5l.6-2.6c.7.2 3.2.6 2.8 2.1z"/></g></svg>`
  },
  { 
    id: "ethereum", symbol: "ETH", 
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#627EEA"/><path fill="#FFF" d="M15.9 3.2L8.4 15.5l7.5 4.4 7.5-4.4-7.5-12.3zm0 18l-7.5-4.4L15.9 27l7.5-10.2-7.5 4.4z"/></svg>`
  },
  { 
    id: "tether", symbol: "USDT", 
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#26A17B"/><path fill="#FFF" d="M16 17.5c-4.4 0-7.8-1.2-7.8-2.6 0-1.4 3.4-2.6 7.8-2.6 4.4 0 7.8 1.2 7.8 2.6 0 1.4-3.4 2.6-7.8 2.6zm0-4.1c-3.1 0-5.8.7-6.5 1.5.7.9 3.4 1.5 6.5 1.5 3.1 0 5.8-.6 6.5-1.5-.7-.8-3.4-1.5-6.5-1.5z"/><path fill="#FFF" d="M17.1 17.3v7.2h-2.3v-7.2c-2.4-.2-4.5-1-5.1-2h2.2c.6.5 2.1 1 4 1 1.9 0 3.4-.5 4-1h2.2c-.6 1-2.7 1.8-5.1 2z"/><path fill="#FFF" d="M12.4 8.2h7.2v2.5h-7.2z"/><path fill="#FFF" d="M14.8 10.7h2.3v3h-2.3z"/></svg>`
  },
  { 
    id: "monero", symbol: "XMR", 
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#FF6600"/><path fill="#FFFFFF" d="M16 24l-7.5-7.5V10l7.5 7.5L23.5 10v6.5L16 24zm9-14v9l-9 9-9-9v-9h3v7.5l6 6 6-6V10h3z"/></svg>`
  },
  { 
    id: "usd", symbol: "USD", 
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#2E7D32"/><text x="16" y="17" font-size="18" fill="white" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="central">$</text></svg>`
  },
  { 
    id: "eur", symbol: "EUR", 
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#003399"/><text x="16" y="17" font-size="18" fill="white" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="central">€</text></svg>`
  }
];

// --- LOGICA ESTENSIONE ---
let rates = {}; 
let lastEdited = { symbol: null, amount: 0 }; 
const listContainer = document.getElementById('currency-list');
const refreshBtn = document.getElementById('refresh-btn');
const inputs = {}; 

async function init() {
  // Traduci i testi fissi dell'interfaccia all'avvio
  document.getElementById('app-title').innerText = t('title');
  refreshBtn.innerText = t('refresh');

  const data = await chrome.storage.local.get('currencyOrder');
  const savedOrder = data.currencyOrder;

  let orderedCurrencies = [...CURRENCIES];
  if (savedOrder) {
    orderedCurrencies.sort((a, b) => {
      let indexA = savedOrder.indexOf(a.symbol);
      let indexB = savedOrder.indexOf(b.symbol);
      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;
      return indexA - indexB;
    });
  }

  orderedCurrencies.forEach(currency => {
    const row = document.createElement('div');
    row.className = 'currency-row';
    row.draggable = true;
    row.dataset.symbol = currency.symbol;

    row.innerHTML = `
      <div class="drag-handle">⋮⋮</div>
      <div class="logo">${currency.logo}</div>
      <div class="symbol">${currency.symbol}</div>
      <input type="number" step="any" placeholder="0.00" id="input-${currency.symbol}">
      <button class="copy-btn" data-target="input-${currency.symbol}">${t('copy')}</button>
    `;

    listContainer.appendChild(row);

    const input = row.querySelector(`#input-${currency.symbol}`);
    inputs[currency.symbol] = input;

    input.addEventListener('input', (e) => {
      const amount = parseFloat(e.target.value) || 0;
      lastEdited = { symbol: currency.symbol, amount: amount };
      
      handleConversion(currency.symbol, amount);
      chrome.storage.session.set({ lastInput: lastEdited });
    });

    row.querySelector('.copy-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(input.value);
      const btn = row.querySelector('.copy-btn');
      btn.innerText = t('done');
      setTimeout(() => btn.innerText = t('copy'), 1500);
    });

    setupDragAndDrop(row);
  });

  const sessionData = await chrome.storage.session.get('lastInput');
  if (sessionData.lastInput) {
    lastEdited = sessionData.lastInput;
    if (lastEdited.symbol && inputs[lastEdited.symbol] && lastEdited.amount > 0) {
      inputs[lastEdited.symbol].value = lastEdited.amount;
    }
  }

  await fetchRates(false); 

  refreshBtn.addEventListener('click', () => fetchRates(true));
}

async function fetchRates(forceRefresh = false) {
  refreshBtn.innerText = t('checking');
  refreshBtn.disabled = true;

  try {
    const storageData = await chrome.storage.local.get(['cachedRates', 'lastFetchTime']);
    const now = Date.now();
    
    if (!forceRefresh && storageData.cachedRates && storageData.lastFetchTime && (now - storageData.lastFetchTime < 60000)) {
      rates = storageData.cachedRates;
      refreshBtn.innerText = t('refresh');
      
      if (lastEdited.symbol && lastEdited.amount > 0) {
        handleConversion(lastEdited.symbol, lastEdited.amount);
      }
      refreshBtn.disabled = false;
      return; 
    }

    refreshBtn.innerText = t('downloading');
    
    const cryptoIds = CURRENCIES.filter(c => c.id !== "usd" && c.id !== "eur").map(c => c.id).join(',');
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd,eur`);
    
    if (!response.ok) {
      throw new Error("Troppe richieste");
    }

    const data = await response.json();
    rates["USD"] = 1.0;
    
    CURRENCIES.forEach(currency => {
      if (currency.id !== "usd" && currency.id !== "eur") {
        if (data[currency.id] && data[currency.id]["usd"]) {
          rates[currency.symbol] = data[currency.id]["usd"];
        }
      }
    });

    const firstCrypto = CURRENCIES.find(c => c.id !== "usd" && c.id !== "eur");
    if (firstCrypto && data[firstCrypto.id]) {
      rates["EUR"] = data[firstCrypto.id]["usd"] / data[firstCrypto.id]["eur"];
    }

    chrome.storage.local.set({ 
      cachedRates: rates, 
      lastFetchTime: now 
    });

    refreshBtn.innerText = t('refresh');

    if (lastEdited.symbol && lastEdited.amount > 0) {
      handleConversion(lastEdited.symbol, lastEdited.amount);
    }

  } catch (error) {
    console.error("Errore nel recupero dei tassi:", error);
    
    const storageData = await chrome.storage.local.get('cachedRates');
    if (storageData.cachedRates) {
      rates = storageData.cachedRates;
      refreshBtn.innerText = t('cached');
      
      if (lastEdited.symbol && lastEdited.amount > 0) {
        handleConversion(lastEdited.symbol, lastEdited.amount);
      }
    } else {
      refreshBtn.innerText = t('error');
    }
  } finally {
    setTimeout(() => { refreshBtn.disabled = false; }, 2000);
  }
}

function handleConversion(sourceSymbol, sourceAmount) {
  if (Object.keys(rates).length === 0) return;

  const valueInUsd = sourceAmount * rates[sourceSymbol];

  for (const symbol in inputs) {
    if (symbol !== sourceSymbol) {
      const convertedValue = valueInUsd / rates[symbol];
      inputs[symbol].value = sourceAmount === 0 ? "" : parseFloat(convertedValue.toFixed(8));
    }
  }
}

function setupDragAndDrop(row) {
  row.addEventListener('dragstart', () => row.classList.add('dragging'));
  
  row.addEventListener('dragend', () => {
    row.classList.remove('dragging');
    saveOrder(); 
  });
}

function saveOrder() {
  const currentOrder = [...listContainer.querySelectorAll('.currency-row')].map(row => row.dataset.symbol);
  chrome.storage.local.set({ currencyOrder: currentOrder });
}

listContainer.addEventListener('dragover', e => {
  e.preventDefault();
  const draggingRow = document.querySelector('.dragging');
  const siblings = [...listContainer.querySelectorAll('.currency-row:not(.dragging)')];
  
  let nextSibling = siblings.find(sibling => {
    return e.clientY <= sibling.getBoundingClientRect().top + sibling.getBoundingClientRect().height / 2;
  });
  
  listContainer.insertBefore(draggingRow, nextSibling);
});

init();
