# simple-discord-bot-database
A Discord bot built using **Node.js** and **discord.js** that provides item lookup functionality from a JSON database.  
Users can type commands starting with `*` to get item information displayed in structured embeds.

---

## ✨ Features

- **Command System** using a `*` prefix  
- Built-in commands:
  - `*help` — Shows help information  
  - `*ping` — Basic test response  
- **Item Lookup:**  
  Users can search for items by ID **or** name
- **Embed-Based Item Display**  
  Automatically formats:
  - Name & Gallery ID  
  - Description  
  - Rarity  
  - Damage (body/head)  
  - Fire rate  
  - Capacity  
  - Mobility  
  - Attributes  
  - Delay  
- **JSON Data Storage**  
  All items are loaded from `items.json` on bot startup
  
---

## Setup

- Enter your Discord token in .env
