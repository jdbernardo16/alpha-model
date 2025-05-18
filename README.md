# Alpha Model - Vue 3 Project

This is a Vue 3 project built with Vite, designed to showcase a modern and responsive user interface for a talent and modeling management. The project includes a dynamic header, a hero section, a featured models slider, and sections for showcasing values and promo events.

## Features

- **Responsive Design**: The layout is designed to work seamlessly across various screen sizes.
- **Dynamic Components**: Reusable components like `FeaturedModelSlider` and `Button` are used to maintain consistency.
- **Hero Section**: A visually appealing hero section with a background image and call-to-action buttons.
- **Featured Models Slider**: A slider to showcase featured models with their details.
- **Values Section**: Highlights the key values of the management.
- **Promo Events Section**: Displays promotional events with images and descriptions.

## Technologies Used

- **Vue 3**: The core framework for building the user interface.
- **Vite**: A fast build tool for modern web development.
- **TypeScript**: Adds type safety and improves developer experience.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Heroicons**: A set of free MIT-licensed high-quality SVG icons.

## Project Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/jdbernardo16/alpha-model.git
    cd alpha-model
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Development

To start the development server with hot-reloading:

```bash
npm run dev
```

### Build for Production

To build the project for production:

```bash
npm run build
```

### Linting

To lint the code using ESLint:

```bash
npm run lint
```

### Type Checking

To check TypeScript types:

```bash
npm run type-check
```

## Project Structure

```
alpha-model/
├── public/               # Static assets (e.g., images)
├── src/                  # Source code
│   ├── assets/           # Additional assets (e.g., icons, fonts)
│   ├── components/       # Reusable Vue components
│   ├── App.vue           # Root Vue component
│   ├── main.ts           # Entry point for the application
│   └── vite-env.d.ts     # TypeScript declarations for Vite
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Files and directories to ignore in Git
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur for Vue 3 support).

## Customizing Configuration

See the [Vite Configuration Reference](https://vite.dev/config/) for more details on customizing the build process.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your branch.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Happy Coding!** 🚀
