import './App.css'
import SignInCard from './Components/SignInCard'
import SignupCard from './Components/SignupCard'
import HomePage from './Components/HomePage'
// import LoginPage from './LoginPage'

function App() {

  return (
    <>
<SignInCard />
<SignupCard />
<HomePage />

      {/* <div>
        LOGIN
      </div> */}
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
