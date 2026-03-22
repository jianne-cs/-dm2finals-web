# Ave Mujica - Logic Grimoire

A web-based interactive application that teaches formal logic through the narrative of Ave Mujica (a fictional band). Learn 16 fundamental logical operations through character-driven quests, truth table puzzles, and unlock songs as rewards.

## Features

- **Responsive Design** - Works on desktop and mobile
- **4 Sections**: Intro, Truth Cathedral, Character Encounters, 16 Gates
- **5 Character Quests**: Each character represents a logical operation with 3 stages
- **16 Gates of Truth**: Interactive truth table puzzles
- **Progressive Music System**: Unlock songs as you complete quests and gates
- **Progress Saving**: Uses localStorage to save your progress
- **Secret Ending**: Hidden ending after completing all content

## Getting Started

### Opening the Application

Simply open `index.html` in your web browser. The application works on both desktop and mobile devices.

```bash
# Using Python's built-in server
cd dm2finals-web
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

Or just double-click `index.html` to open directly.

### The Main Screen

The interface has four main sections accessible via the navigation bar at the top:

| Section | Description |
|---------|-------------|
| 🏰 Intro | Welcome page with project overview and symbol reference |
| ⛪ Cathedral | Learn about all 16 logical operations and their truth tables |
| 👥 Characters | Access character quests to unlock songs and story content |
| 🔮 16 Gates | Quiz yourself on truth tables to master logic |

## Navigation

### Mouse/Touch
Click the navigation buttons at the top of the screen

### Keyboard
- Press **1** for Intro
- Press **2** for Cathedral
- Press **3** for Characters
- Press **4** for 16 Gates
- Use **←** and **→** arrow keys to move between sections

## Sections Explained

### 🏰 Intro Section

The welcome screen featuring:

- The project title and banner image
- Brief introduction to the Logic Grimoire
- A quick reference guide to logical symbols

#### Symbol Reference

| Symbol | Meaning |
|--------|---------|
| ∧ | AND - Both must be true |
| ∨ | OR - At least one is true |
| ¬ | NOT - Inverts the value |
| ⊕ | XOR - Exactly one is true |
| ↑ | NAND - Not both |
| ↓ | NOR - Neither |
| → | Implication - If P then Q |
| ↔ | XNOR - Both same |

### ⛪ Truth Cathedral

This section displays all 16 logical operations in a grid layout.

For each operation, you can see:

- The symbol (e.g., ∧, ∨)
- The operation name (e.g., AND, OR)
- A description explaining what it does
- The complete truth table showing all possible input/output combinations

Example:

```
AND (∧)
Description: Both must be true

Truth Table:
F,F → F
F,T → F
T,F → F
T,T → T
```

### 👥 Character Encounters

This is where the heart of the story unfolds. You'll meet five characters, each representing a logical operation:

| Character | Role | Operation | Song Reward |
|-----------|------|-----------|-------------|
| Sakiko Togawa | Oblivionis | Implication (→) | Masquerade Rhapsody Request |
| Uika Misumi | Doloris | XOR (⊕) | Angles |
| Mutsumi Wakaba | Mortis | Negation (¬) | Choir 'S' Choir |
| Umiri Yahata | Timoris | NOR (↓) | 'S/' The Way |
| Nyamu Yūtenji | Amoris | NAND (↑) | Blue Eyes |

#### How to Complete a Character Quest

1. Click on a character card to begin their quest
2. Read the story dialogue - Each character shares their personal struggle with logic and identity
3. Complete the truth table puzzle - Fill in the correct T (True) or F (False) values:
   - Click a cell to cycle through: empty → T → F → empty
   - Click Submit Answer when done
4. Progress through 3 stages - Each quest has multiple story segments
5. Unlock rewards - Completing all 3 stages unlocks:
   - The character's song
   - The full truth about their operation
6. Progress is automatically saved

#### Quest Status Indicators

| Status | Meaning |
|--------|---------|
| 🔓 Available | Quest not started yet |
| ⚜ In Progress | Quest partially completed |
| ✓ Completed | Quest finished, song unlocked |

### 🔮 16 Gates of Truth

This section tests your knowledge of all logical operations through interactive puzzles.

#### How the Gates Work

1. Click on any unlocked gate (numbered 1-16)
2. Study the operation - Each gate represents a different logical operation
3. Fill in the truth table - Just like in character quests:
   - Click cells to toggle between T and F
   - Click Unlock Gate when ready
4. Track your progress - The progress bar shows how many gates you've completed (0/16 to 16/16)

#### Gate Rewards

Completing each gate adds a song to your unlocked collection. Complete all 16 gates to master logic!

## Music Player

The music player at the bottom of the screen lets you enjoy unlocked songs.

### Controls

| Button | Action |
|--------|--------|
| ▶ (Play) | Start playing music |
| ⏸ (Pause) | Pause the current track |
| ⏮ (Previous) | Play previous song in playlist |
| ⏭ (Next) | Play next song in playlist |
| Volume Slider | Adjust the volume |

### How Songs Unlock

| Source | Songs Unlocked |
|--------|----------------|
| Main Page | Always plays background music |
| Complete Character Quest | Character's specific song |
| Complete 16 Gates | Gate-specific songs |
| Complete Everything | Secret Ending (Kamisama Baka) |

### Unlock Indicator

The icon on the right shows how many songs you've unlocked:

- 🔒 0 = No songs unlocked yet
- 🔓 3 = Three songs unlocked
- ✨ = Secret ending unlocked

## Progress Saving

Your progress is automatically saved to your browser's local storage. This means:

- ✅ Your quest progress is saved
- ✅ Your completed gates are saved
- ✅ Your unlocked songs are saved
- ✅ Progress persists between sessions

### Reset Progress

Click the 🔄 Reset button in the navigation bar to start over.

## Tips and Tricks

### For Beginners

1. Start with the Intro - Familiarize yourself with the symbols
2. Visit the Cathedral - Learn about each logical operation
3. Do Character Quests first - They teach concepts gradually with stories
4. Use Gates to practice - Reinforce your knowledge

### Puzzle Solving

#### Truth Table Tips

- Start with the obvious rows (all F or all T)
- Remember: AND needs both true, OR needs at least one true
- XOR is true only when inputs are different
- NAND/NOR are opposites of AND/OR

### Getting the Most Out of the Story

Each character's quest reveals:

- Their personal struggle
- How their logical operation relates to their identity
- A deeper meaning behind the operation

Pay attention to the dialogue - it connects logic to real human emotions.

## Secret Ending

To unlock the True Secret Ending:

1. ✅ Complete all 5 character quests
2. ✅ Complete all 16 gates
3. ✅ Watch for the special notification

The secret ending reveals the ultimate message of Ave Mujica and plays the song Kamisama Baka.

### 🔮 HOW TO SEE THE ENDING

**Step 1: Complete All 5 Character Quests**

Complete these quests in any order:

- Sakiko Togawa (Implication)
- Uika Misumi (XOR)
- Mutsumi Wakaba (Negation)
- Umiri Yahata (NOR)
- Nyamu Yūtenji (NAND)

**Step 2: The Final Quest Unlocks Automatically**

After completing the 5th quest, a notification will appear:

> 🔮 The Final Masquerade 🔮
> 
> You have completed all character quests!
> 
> The final truth of Ave Mujica awaits...
> 
> Would you like to experience it now?

**Step 3: Click "Yes"**

The Final Quest window opens showing:

- All 5 characters revealing their truths
- The full list of unlocked songs
- The final message: "We are Ave Mujica. And our truth is whatever we make it."

### 🌟 TRUE SECRET ENDING

After completing the Final Quest AND unlocking ALL 16 gates, you'll experience the TRUE SECRET ENDING:

> ✨✨✨ SECRET ACHIEVEMENT UNLOCKED ✨✨✨
> 
> **"Truth Seeker"** - Discover the ending beyond the masquerade

## Summary

Ave Mujica - Logic Grimoire offers a unique blend of:

- 📚 Education - Learn 16 logical operations through puzzles
- 📖 Storytelling - Character-driven narratives
- 🎵 Music - Unlock songs as rewards
- 🎮 Interactivity - Hands-on truth table puzzles

Whether you're learning formal logic for the first time or revisiting it with fresh eyes, the Logic Grimoire makes the journey engaging through its gothic aesthetic and compelling character stories.

Enjoy your journey through the Truth Cathedral!

---

## Project Structure

```
dm2finals-web/
├── index.html           # Main HTML file
├── styles.css           # Gothic Victorian styling
├── app.js               # Application logic
├── data.js              # Game data (characters, quests, operations)
├── README.md            # This file
└── assets/
    ├── images/
    │   ├── intro_banner.png
    │   ├── sakiko.png
    │   ├── uika.png
    │   ├── mutsumi.png
    │   ├── umiri.png
    │   └── nyamu.png
    └── music/
        ├── main webpage/
        │   └── [Lofi] KiLLKiSS – Ave Mujica.mp3
        ├── character quests songs/
        │   ├── Ave Mujica - Masquerade Rhapsody Request.mp3
        │   ├── Ave Mujica - Angles.mp3
        │   ├── Ave Mujica - Choir 'S' Choir.mp3
        │   ├── Ave Mujica- 'S' The Way.mp3
        │   ├── Ave Mujica - Blue Eyes.mp3
        │   └── secret ending/
        │       └── Kamisama Baka.mp3
        └── 16 gates unlocked songs/
            └── [16 gate song files]
```

## Browser Compatibility

Works best in:

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

For educational purposes.
