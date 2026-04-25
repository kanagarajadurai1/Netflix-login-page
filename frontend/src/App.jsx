import { useState } from 'react'
import './App.css'

// ── Movie Data with free TMDB poster URLs ──
const MOVIES = {
  trending: [
    { id:1, title:'Inception', year:2010, rating:'8.8', genre:'Sci-Fi', poster:'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', backdrop:'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg', desc:'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
    { id:2, title:'The Dark Knight', year:2008, rating:'9.0', genre:'Action', poster:'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdrop:'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg', desc:'Batman raises the stakes in his war on crime with the help of Lt. Gordon and DA Harvey Dent.' },
    { id:3, title:'Interstellar', year:2014, rating:'8.6', genre:'Sci-Fi', poster:'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIe.jpg', backdrop:'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg', desc:'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
    { id:4, title:'Parasite', year:2019, rating:'8.5', genre:'Thriller', poster:'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', backdrop:'https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg', desc:'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.' },
    { id:5, title:'Dune', year:2021, rating:'8.0', genre:'Sci-Fi', poster:'https://image.tmdb.org/t/p/w500/d5NXSklpcKIKtYgd4KT3vHCWVMK.jpg', backdrop:'https://image.tmdb.org/t/p/original/eeIGsKe2H9T8rUfOTKOiGVWjAFF.jpg', desc:'Paul Atreides, a brilliant and gifted young man, must travel to the most dangerous planet in the universe to ensure the future of his family.' },
    { id:6, title:'The Godfather', year:1972, rating:'9.2', genre:'Crime', poster:'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLlegkAQQboa.jpg', backdrop:'https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg', desc:'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.' },
  ],
  action: [
    { id:7, title:'Mad Max: Fury Road', year:2015, rating:'8.1', genre:'Action', poster:'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg', backdrop:'https://image.tmdb.org/t/p/original/phszHPFPVDsMCOaGKJXFsK4sLBR.jpg', desc:'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.' },
    { id:8, title:'John Wick', year:2014, rating:'7.4', genre:'Action', poster:'https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg', backdrop:'https://image.tmdb.org/t/p/original/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg', desc:'An ex-hitman comes out of retirement to track down the gangsters who took everything from him.' },
    { id:9, title:'Top Gun: Maverick', year:2022, rating:'8.3', genre:'Action', poster:'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', backdrop:'https://image.tmdb.org/t/p/original/AkB0yBmHkCmEnBjTFTq71o48QLm.jpg', desc:'After more than thirty years of service, Pete Mitchell is still pushing the envelope as a top naval aviator.' },
    { id:10, title:'Avatar', year:2009, rating:'7.8', genre:'Action', poster:'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', backdrop:'https://image.tmdb.org/t/p/original/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg', desc:'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.' },
    { id:11, title:'Black Panther', year:2018, rating:'7.3', genre:'Action', poster:'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', backdrop:'https://image.tmdb.org/t/p/original/6ELCZlTA5lGUops70hKdB83WJxH.jpg', desc:'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future.' },
    { id:12, title:'Spider-Man: No Way Home', year:2021, rating:'8.2', genre:'Action', poster:'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', backdrop:'https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg', desc:'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help.' },
  ],
  drama: [
    { id:13, title:'The Shawshank Redemption', year:1994, rating:'9.3', genre:'Drama', poster:'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg', backdrop:'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg', desc:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.' },
    { id:14, title:'Forrest Gump', year:1994, rating:'8.8', genre:'Drama', poster:'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', backdrop:'https://image.tmdb.org/t/p/original/qdIMHd4sEooDLEbtMqCBrRLxnPF.jpg', desc:'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.' },
    { id:15, title:'Oppenheimer', year:2023, rating:'8.3', genre:'Drama', poster:'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', backdrop:'https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg', desc:'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.' },
    { id:16, title:'Joker', year:2019, rating:'8.4', genre:'Drama', poster:'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', backdrop:'https://image.tmdb.org/t/p/original/f5F4cRhQdUbyVbB5lTNCwXMFDrm.jpg', desc:'A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain.' },
    { id:17, title:'1917', year:2019, rating:'8.2', genre:'Drama', poster:'https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg', backdrop:'https://image.tmdb.org/t/p/original/6mFQhLpOSiXPX5XOnWLtXZ3lVe5.jpg', desc:'April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time.' },
    { id:18, title:'Nomadland', year:2020, rating:'7.3', genre:'Drama', poster:'https://image.tmdb.org/t/p/w500/66A9MqQOqZAY1QOS7EGolqHFGPJ.jpg', backdrop:'https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', desc:'A woman in her sixties, after losing everything in the Great Recession, embarks on a journey through the American West.' },
  ],
  comedy: [
    { id:19, title:'The Grand Budapest Hotel', year:2014, rating:'8.1', genre:'Comedy', poster:'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg', backdrop:'https://image.tmdb.org/t/p/original/pLHkBTHRbSmRNNQn5XwxFqhUkRh.jpg', desc:'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.' },
    { id:20, title:'Knives Out', year:2019, rating:'7.9', genre:'Comedy', poster:'https://image.tmdb.org/t/p/w500/pThyQovXQrws2Q07WVjYA77YLNR.jpg', backdrop:'https://image.tmdb.org/t/p/original/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg', desc:'A detective investigates the death of a patriarch of an eccentric, combative family.' },
    { id:21, title:'Superbad', year:2007, rating:'7.6', genre:'Comedy', poster:'https://image.tmdb.org/t/p/w500/uo4pouWMhMIbMcNFq4HlBmIXaFo.jpg', backdrop:'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', desc:'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.' },
    { id:22, title:'The Hangover', year:2009, rating:'7.7', genre:'Comedy', poster:'https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63boQTcycle9Jg.jpg', backdrop:'https://image.tmdb.org/t/p/original/6oVi0SrLJhkFfXkBGeNZlbBPdNo.jpg', desc:'Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing.' },
    { id:23, title:'Everything Everywhere All at Once', year:2022, rating:'7.8', genre:'Comedy', poster:'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', backdrop:'https://image.tmdb.org/t/p/original/absHaqgEuWp57lJbFYjBb5MPVBX.jpg', desc:'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes.' },
    { id:24, title:'The Princess Bride', year:1987, rating:'8.0', genre:'Comedy', poster:'https://image.tmdb.org/t/p/w500/gpRt4glo54buD7LEoFHFSwJPm4Z.jpg', backdrop:'https://image.tmdb.org/t/p/original/xDiXDfZOPbHGFtCi5JZhJSJSSnv.jpg', desc:'While home sick in bed, a young boy\'s grandfather reads him the story of a farmboy-turned-pirate.' },
  ],
}

const ALL_MOVIES = Object.values(MOVIES).flat()
const HERO = MOVIES.trending[1]

// ── Valid Users (no backend needed) ──
const VALID_USERS = [
  { email: 'user@netflix.com', password: 'password123' },
  { email: 'kanagaraj@netflix.com', password: 'knx123' },
]

// ── Login Page Background Poster Grid ──
function PosterGrid() {
  const posters = ALL_MOVIES.map(m => m.poster)
  return (
    <div className="poster-grid">
      {[...posters, ...posters].map((src, i) => (
        <div key={i} className="poster-cell">
          <img src={src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

// ── Movie Card ──
function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={movie.poster} alt={movie.title} loading="lazy" />
      <div className="card-hover">
        <div className="card-info">
          <span className="card-rating">★ {movie.rating}</span>
          <span className="card-genre">{movie.genre}</span>
        </div>
        <div className="card-title">{movie.title}</div>
        <div className="card-year">{movie.year}</div>
      </div>
    </div>
  )
}

// ── Movie Row ──
function MovieRow({ title, movies, onSelect }) {
  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-scroll">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} onClick={onSelect} />
        ))}
      </div>
    </div>
  )
}

// ── Modal ──
function Modal({ movie, onClose }) {
  if (!movie) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-backdrop" style={{ backgroundImage: `url(${movie.backdrop})` }}>
          <div className="modal-backdrop-overlay" />
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-hero-info">
            <div className="modal-badge">{movie.genre}</div>
            <h2>{movie.title}</h2>
            <div className="modal-meta">
              <span>★ {movie.rating}</span>
              <span>{movie.year}</span>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <p>{movie.desc}</p>
          <div className="modal-actions">
            <button className="btn-play">▶  Play</button>
            <button className="btn-list">+ My List</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard ──
function Dashboard({ onSignOut }) {
  const [selected, setSelected] = useState(null)
  const [search, setSearch]     = useState('')

  const filtered = search.trim()
    ? ALL_MOVIES.filter(m =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.genre.toLowerCase().includes(search.toLowerCase())
      )
    : null

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <span className="netflix-logo">NETFLIX</span>
        <div className="nav-links">
          <span>Home</span><span>TV Shows</span><span>Movies</span><span>New & Popular</span>
        </div>
        <div className="nav-right">
          <input
            className="search-input"
            placeholder="🔍 Search titles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="signout-btn" onClick={onSignOut}>Sign Out</button>
        </div>
      </nav>

      {filtered ? (
        <div className="search-results">
          <h2 className="row-title">Results for "{search}"</h2>
          <div className="search-grid">
            {filtered.length ? filtered.map(m => (
              <MovieCard key={m.id} movie={m} onClick={setSelected} />
            )) : <p className="no-results">No movies found.</p>}
          </div>
        </div>
      ) : (
        <>
          <div className="hero-banner" style={{ backgroundImage: `url(${HERO.backdrop})` }}>
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="hero-badge">#1 in India Today</div>
              <h1 className="hero-title">{HERO.title}</h1>
              <p className="hero-desc">{HERO.desc}</p>
              <div className="hero-btns">
                <button className="btn-play" onClick={() => setSelected(HERO)}>▶  Play</button>
                <button className="btn-info" onClick={() => setSelected(HERO)}>ℹ  More Info</button>
              </div>
            </div>
          </div>

          <div className="rows-container">
            <MovieRow title="🔥 Trending Now"         movies={MOVIES.trending} onSelect={setSelected} />
            <MovieRow title="💥 Action & Adventure"   movies={MOVIES.action}   onSelect={setSelected} />
            <MovieRow title="🎭 Award-Winning Dramas" movies={MOVIES.drama}    onSelect={setSelected} />
            <MovieRow title="😂 Comedies"             movies={MOVIES.comedy}   onSelect={setSelected} />
          </div>
        </>
      )}

      <Modal movie={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

// ── Login Page ──
function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  // ✅ No backend needed — works 100% on Vercel
  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const user = VALID_USERS.find(
        u => u.email === email && u.password === password
      )

      if (user) {
        onLogin()
      } else {
        setError('Incorrect email or password.')
      }

      setLoading(false)
    }, 800)
  }

  return (
    <div className="login-page">
      <PosterGrid />
      <div className="login-overlay" />

      <header className="login-header">
        <span className="netflix-logo">NETFLIX</span>
      </header>

      <div className="login-center">
        <div className="login-box">
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <div className={`input-group ${email ? 'has-val' : ''}`}>
              <input
                type="email"
                id="em"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
              <label htmlFor="em">Email or phone number</label>
            </div>
            <div className={`input-group ${password ? 'has-val' : ''}`}>
              <input
                type="password"
                id="pw"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <label htmlFor="pw">Password</label>
            </div>
            {error && (
              <div className="error-box">
                <span className="error-icon">!</span>{error}
              </div>
            )}
            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="extras">
            <label className="remember"><input type="checkbox" /> Remember me</label>
            <a href="#" className="help-link">Need help?</a>
          </div>
          <div className="signup-prompt">
            New to Netflix? <a href="#" className="signup-link">Sign up now.</a>
          </div>
          <p className="hint">Test: kanagaraj@netflix / knx123</p>
        </div>
      </div>
    </div>
  )
}

// ── App Root ──
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return loggedIn
    ? <Dashboard onSignOut={() => setLoggedIn(false)} />
    : <LoginPage  onLogin={()  => setLoggedIn(true)}  />
}