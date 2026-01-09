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

### Option 1: GitHub Pages (Recommended - Auto-deployed)

The app is automatically deployed to GitHub Pages when you push to the main branch!

1. **Get your GitHub Models API token**:
   - Visit [github.com/marketplace/models](https://github.com/marketplace/models)
   - Sign up for access and create a token

2. **Add token to repository secrets**:
   - Go to your repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GITHUB_MODELS_TOKEN`
   - Value: Your GitHub Models token
   - Click "Add secret"

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - Save

4. **Push to main/master branch**:
   ```bash
   git push origin main
   ```

5. **Access your app**:
   - Your app will be live at: `https://YOUR-USERNAME.github.io/ChordGenerator/`
   - The API token is securely injected during deployment
   - No configuration needed - it just works! ✨

### Option 2: Local Development

1. **Clone this repository**:
   ```bash
   git clone <repository-url>
   cd ChordGenerator
   ```

2. **Set up your API token**:
   ```bash
   cp config.template.js config.js
   ```
   Edit `config.js` and replace `YOUR_GITHUB_MODELS_TOKEN_HERE` with your actual token

3. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit: http://localhost:8000
     ```

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A GitHub Models API token from [github.com/marketplace/models](https://github.com/marketplace/models)

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
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment workflow
├── index.html              # Main HTML structure
├── styles.css              # All styling and animations
├── app.js                  # JavaScript logic and API integration
├── config.template.js      # Template for local development config
├── config.js              # Generated config (gitignored)
├── package.json           # Project metadata
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
└── SETUP.md              # Deployment setup guide
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

### Token Management

**GitHub Pages Deployment (Secure)**:
- API token is stored in GitHub repository secrets (never exposed in code)
- Token is injected during build time via GitHub Actions
- Users never need to enter or see the token
- The token is NOT visible in the repository or client-side source code

**Local Development**:
- Copy `config.template.js` to `config.js` (gitignored)
- Add your token to `config.js` - this file is never committed
- Alternatively, token can be stored in browser localStorage

### General Privacy

- No server-side storage or user tracking
- All processing happens client-side
- API calls go directly to GitHub Models (no intermediary servers)
- No cookies, no analytics, no data collection

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
