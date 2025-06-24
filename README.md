# 🎬 Movie DB

Movie DB is a web application built with Next.js that allows users to browse and search for movies using data from [The Movie Database (TMDB) API](https://www.themoviedb.org/). Users can view trending films, search by title, and explore detailed information about each movie.

## 🚀 Features

- 🔍 Search movies by title
- 📈 Browse trending and popular movies
- 📄 View detailed movie info including poster, overview, release date, and rating
- 🎨 Responsive and modern UI
- ⚡ Fast load times with server-side rendering (Next.js)

## 🛠 Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion](https://motion.dev/)

**APIs:**
- [TMDB API](https://developer.themoviedb.org/docs)

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/amngo/moviedb.git
cd moviedb
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

Create a `.env.local` file in the root and add your TMDB API key:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

This app is ready to deploy on platforms like **Vercel**, **Netlify**, or **Render**.

```bash
npm run build
npm start
```

Or one-click deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=your-vercel-template)

## 🧪 Tests

This project currently doesn't include automated tests, but you can add:

- Jest or React Testing Library for unit tests
- Playwright or Cypress for E2E

## 🤝 Contributing

Pull requests are welcome! If you have suggestions for improvements or new features, open an issue or submit a PR.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

- [TMDB API](https://developer.themoviedb.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [tmdb-ts](https://www.npmjs.com/package/tmdb-ts)
