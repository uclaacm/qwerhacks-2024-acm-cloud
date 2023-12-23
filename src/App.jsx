import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import db from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import './App.css'

function App() {
  const [count, setCount] = useState()

  useEffect(() => {
    getCount();
  }, []);

	async function getCount() {
		const docRef = doc(db, 'shared_content', 'home_page');
		const snapshot = await getDoc(docRef);
		if (snapshot.empty) {
		  console.log('No matching documents.');
		  return null;
		}  

    const data = snapshot.data();
    setCount(data.clicks);   
	}

  function incrementCount() {
    const cnt = {'clicks': count + 1}
    const docRef = doc(db, 'shared_content', 'home_page');
    setDoc(docRef, cnt);
    setCount(count + 1);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={incrementCount}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
