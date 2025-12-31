# AI Chat Interface

A modern, responsive AI chat application built with React, Vite, and TailwindCSS. This application provides an elegant interface for interacting with AI-powered responses, featuring a clean design with support for rich text formatting, citations, and document attachments.

![AI Chat Interface](https://img.shields.io/badge/React-19.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.2.2-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-cyan)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, responsive design with smooth animations
- 💬 **Interactive Chat Interface** - Real-time chat experience with AI responses
- 📄 **Document Support** - View and download document attachments
- 🔗 **Citation Links** - Clickable source citations for referenced information
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode Ready** - Beautiful interface optimized for extended use
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Installation

1. **Clone the repository** (or download the project)

   ```bash
   cd ai-chat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be generated in the `dist` folder.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 📖 Usage

### How to Use the Chat Interface

1. **Type your question** in the input field at the bottom of the screen
2. **Press Enter** or click the send button to submit your prompt
3. **View the AI response** with formatted text, citations, and documents
4. **Click on citations** to visit the source websites
5. **Download documents** by clicking on document links in responses

### Example Prompts to Try

Here are some sample prompts you can use to test the application:

#### 1. **Learn About React**

```
What is react js. give me some detailed overview on it
```

_This prompt will provide a comprehensive overview of ReactJS, including its key features like component-based architecture, Virtual DOM, JSX, and more._

#### 2. **Compare Vue.js with React**

```
What is Vue.js and how does it compare to React?
```

_Get a detailed comparison between Vue.js and React, covering learning curves, community support, performance, and use cases._

#### 3. **Explore Angular Framework**

```
What is Angular and how does it compare to React and Vue?
```

_Discover Angular's features and see how it stacks up against React and Vue.js for enterprise applications._

#### 4. **General Web Development Questions**

```
Explain the concept of Virtual DOM and why it's important
```

```
What are the benefits of component-based architecture?
```

```
How does JSX work in React applications?
```

```
What is the difference between one-way and two-way data binding?
```

#### 5. **Framework Comparisons**

```
Which JavaScript framework should I choose for my project?
```

```
What are the pros and cons of using TypeScript with React?
```

```
Compare the performance of React, Vue, and Angular
```

### Understanding the Response Format

AI responses include:

- **Introduction** - A brief overview of the topic
- **Sections** - Organized content with headings and bullet points
- **Citations** - Clickable links to source materials
- **Conclusion** - Summary of key points
- **Documents** - Downloadable files with additional information

## 🛠️ Technology Stack

- **React 19.2.0** - UI library for building user interfaces
- **Vite 7.2.2** - Next-generation frontend build tool
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **React Router DOM 7.9.6** - Routing library for React
- **Lucide React** - Beautiful icon library
- **React Icons** - Popular icon library

## 📁 Project Structure

```
ai-chat/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── layout/      # Layout components (Navbar, Layout)
│   │   ├── ui/          # UI components (DocumentModal, etc.)
│   │   └── Home.jsx     # Main chat interface
│   ├── data/
│   │   └── mockData.js  # Sample chat data
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🎨 Customization

### Adding New Mock Data

To add more example conversations, edit `src/data/mockData.js`:

```javascript
export const CHAT_DATA = [
  {
    id: 4,
    prompt: 'Your question here',
    response: {
      intro: 'Introduction text...',
      sections: [
        {
          title: 'Section Title',
          items: [
            {
              bold: 'Key Point:',
              text: 'Explanation...',
              citation: {
                source: 'example.com',
                url: 'https://example.com'
              }
            }
          ]
        }
      ],
      conclusion: 'Conclusion text...',
      document: '/documents/filename.docx'
    }
  }
];
```

### Styling

The application uses TailwindCSS for styling. You can customize:

- Colors and themes in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles in individual component files

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check your terminal for the correct URL.

### Dependencies Installation Issues

Try clearing the npm cache and reinstalling:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Ensure you're using the correct Node.js version:

```bash
node --version  # Should be v18.0.0 or higher
```

## 📧 Support

For questions or issues, please open an issue in the project repository.

---

**Built with ❤️ using React and Vite**
