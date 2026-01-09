# 🎵 Chord Progression Generator

An AI-powered chord progression generator designed for music creators seeking inspiration. Built with vanilla JavaScript and powered by GitHub Models API.

## ✨ Features

- **AI-Powered Generation**: Uses GitHub Models (GPT-4o) to create intelligent, musically coherent chord progressions
- **Adjustable Complexity**: From simple pop/classical chords to complex jazz alterations
- **Key Selection**: Generate progressions in any of the 12 musical keys
- **Advanced Settings**: Customize mode, tempo, style, and chord types
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Sleek Animations**: Smooth transitions and engaging visual feedback
- **Flip Card Interface**: Simple controls by default, advanced settings when you need them
- **Fallback Mode**: Local generation if API is unavailable

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A GitHub Models API token (get one at [github.com/marketplace/models](https://github.com/marketplace/models))

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd ChordGenerator
   ```

2. Open `index.html` in your web browser, or serve it locally:
   ```bash
   npm start
   ```

3. On first use, you'll be prompted to enter your GitHub Models API token. This will be saved in your browser's local storage.

## 🎮 How to Use

### Simple Mode (Default)

1. **Adjust Complexity**: Move the slider from "Simple" (basic triads) to "Jazz" (altered chords)
2. **Select Key**: Choose from any of the 12 musical keys
3. **Generate**: Click the generate button to create your progression

### Advanced Mode

1. Click "Advanced Settings" to flip the card
2. Customize additional parameters:
   - **Mode**: Major, Minor, Dorian, Mixolydian, or Any
   - **Tempo**: Slow, Medium, Fast, or Any
   - **Style**: Pop, Jazz, Classical, Blues, Rock, R&B, or Any
   - **Chord Types**: Toggle diminished and augmented chords
3. Click "Back to Simple" to return to basic controls

### Understanding Complexity Levels

- **Level 1**: Basic triads (C, Dm, Em, F, G, Am, Bdim)
- **Level 2**: Triads + suspended chords (Csus2, Dsus4)
- **Level 3**: 7th chords added (Cmaj7, Dm7, G7)
- **Level 4**: Extended chords (C9, Dm9, Gmaj9, C6)
- **Level 5**: Complex jazz chords (Cmaj7#11, G7#9, Dm7b5)

## 🎨 Features in Detail

### AI-Powered Generation

The app uses the GitHub Models API with GPT-4o to:
- Create musically coherent progressions
- Respect music theory rules
- Match the selected style and complexity
- Generate unique, inspiring results

### Responsive Design

- **Desktop**: Full grid layout with 4 columns
- **Tablet**: 2-3 columns for optimal viewing
- **Mobile**: 2 columns with touch-friendly controls

### Animations

- Smooth card flip for settings transition
- Generate button ripple effect
- Staggered chord card entrance
- Loading spinner with rotation
- Hover effects on all interactive elements

## 🛠️ Technical Details

### Built With

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, grid, animations
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **GitHub Models API**: GPT-4o for AI-powered generation

### File Structure

```
ChordGenerator/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js             # JavaScript logic and API integration
├── package.json       # Project metadata
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

### API Integration

The app integrates with GitHub Models API:
- Endpoint: `https://models.inference.ai.azure.com/chat/completions`
- Model: `gpt-4o`
- Temperature: 0.9 (for creative variety)
- Fallback: Local generation if API unavailable

## 🎯 Use Cases

- **Songwriters**: Break through writer's block with fresh chord ideas
- **Producers**: Quick reference for building tracks
- **Music Students**: Learn different chord progressions and styles
- **Live Musicians**: Generate ideas for improvisation
- **Content Creators**: Find background music chord patterns

## 🔐 Privacy & Security

- API tokens are stored locally in browser localStorage
- No server-side storage or tracking
- All processing happens client-side
- API calls go directly to GitHub Models

## 🤝 Contributing

Feel free to fork this project and submit pull requests for:
- New features
- Bug fixes
- UI/UX improvements
- Documentation updates

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎼 Music Theory Notes

The generator follows standard music theory:
- Chord progressions respect diatonic harmony
- Jazz progressions include common substitutions
- Modal progressions follow appropriate scale degrees
- Complexity levels map to real-world use cases

## 🐛 Troubleshooting

### "API token required" error
- Make sure you have a valid GitHub Models API token
- Get one from [github.com/marketplace/models](https://github.com/marketplace/models)
- Click "Reset API Token" to enter a new one

### Chords not generating
- Check your internet connection
- Verify API token is valid
- The app will fall back to local generation automatically

### Display issues
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Try clearing browser cache
- Check browser console for errors

## 🌟 Future Enhancements

Potential features for future versions:
- Audio playback of generated progressions
- Save/export progressions
- Share progressions via URL
- MIDI export
- More advanced voicings
- Chord diagrams for guitar/piano
- Progression analysis and suggestions

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ♪ for music creators everywhere
