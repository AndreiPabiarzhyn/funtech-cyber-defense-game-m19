# 🛡️ FunTech Cyber Defense Game (M19)

Interactive browser game where kids learn cybersecurity basics through gameplay.

Built as part of **FunTech Explorers – Module 19: "Cyber Detectives & Digital Safety"**.

---

## 🚀 About the Project

This is a small arcade-style space shooter game where the player defends against cyber threats.

Instead of just reading theory, students:
- play
- react
- make decisions
- and learn along the way

Game mechanics are combined with educational meaning (viruses, phishing, threats, protection).

---

## 🎮 Gameplay

- You control a player (defender)
- Enemies = cyber threats (viruses, phishing, etc.)
- You shoot, dodge, survive
- Boss fights included 💀
- Score system tracks progress

---

## 🧠 Learning Goals

While playing, students implicitly learn:

- what cyber threats look like
- reaction to danger situations
- basic idea of “defense vs attack” in digital world
- attention and decision-making

---

## 🛠️ Tech Stack

Simple and clean:

- HTML5 (Canvas)
- CSS
- Vanilla JavaScript

No frameworks — everything built from scratch.

---

## 📂 Project Structure

```bash
project/
│
├── index.html          # entry point
├── style.css           # main styles
├── game.js             # core game logic
│
├── js/
│   ├── main.js         # game loop
│   ├── player.js       # player logic
│   ├── enemies.js      # enemies behavior
│   ├── boss.js         # boss logic
│   ├── bullets.js      # shooting system
│   ├── collision.js    # collisions
│   ├── effects.js      # visual effects
│   ├── score.js        # scoring
│   ├── state.js        # game state
│   ├── input.js        # controls
│   ├── sound.js        # sounds
│   └── space.js        # background / space logic
│
├── assets/             # images (player, enemies, icons)
└── old_style.css       # legacy styles
