import { useState, useRef } from 'react'
import useFetch from './fetch'
import {
  NavLink,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import {Helmet} from "react-helmet-async"

import myImage from './oyinkansola.jfif'
import { ErrorBoundary } from 'react-error-boundary'


function ErrorFallback({ resetErrorBoundary }) {
  return (
    <div role="alert" style={{ lineHeight: "40px" }}>
      <p style={{ fontSize: "40px", marginTop: "20px" }}>⚠️</p>
      <p>Looks like there was a problem</p>
      <div className="btn">
        <p>
          <NavLink to="/">
            <button className="nav_btn">Go to Admin Page</button>
          </NavLink>
        </p>
        <button className="nav_btn2" onClick={resetErrorBoundary} >Try Again</button>
      </div>
    </div>
  )
}

function Navigation() {
  return (
    <div className="fixed-nav">
    <section className="navigation">
      <NavLink style={({ isActive }) => isActive ? { color: "white" } : { color: "black" }} className="navy" to="/"> Admin </NavLink>

      <NavLink style={({ isActive }) => isActive ? { color: "white" } : { color: "black" }} className="navy" to="/data">Data </NavLink>

      <NavLink style={({ isActive }) => isActive ? { color: "white" } : { color: "black" }} className="navy" to="/testerror"> Test Error </NavLink>

      <NavLink style={({ isActive }) => isActive ? { color: "white" } : { color: "black" }} className="navy" to="/error"> 404 Page </NavLink>
    </section>
      </div>
  );
}

export const Testerror = () => {
  const [username, setUsername] = useState('')
  const usernameRef = useRef(null)

  function Testerror({ username }) {
    if (username === 'incorrect') {
      throw new Error('')
    }
    return ``
  }

  return (
    <div>
      <Helmet>
        <title>Test Error</title>
        <meta
      name="test error"
      content="this page is used for testing error"
    />
        <link rel="canonical" href="/testerror" />
      </Helmet>
    <label>
      <p style={{ marginTop: "20px", fontSize: "20px" }}>Wrong password is <b>'incorrect'</b></p>
      <input placeholder={`enter the wrong password provided above`} value={username} onChange={e => setUsername(e.target.value)} ref={usernameRef} />
    </label>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setUsername('')
        usernameRef.current.focus()
      }}
      resetKeys={[username]}
    >
      <Testerror username={username} />
    </ErrorBoundary>
    <Navigation />
  </div>)
}


export function Home() {

  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta
      name="admin"
      content="this admin page has a google login auth"
    />
        <link rel="canonical" href="/" />
      </Helmet>
    <div>
      <h1 style={{ marginTop: "25px" }}>Dashboard</h1>
      <p style={{ color: "#3498db", marginTop: "5px" }}>Admin Dashboard</p>
      <img style={{ margin: "35px" }} src={myImage} width="180px" height="180px" />
      <p style={{ margin: "8px" }}> <b>Oyinkansola Shoroye </b><br /> Frontend Engineer</p>
      <Navigation />
    </div>

    </>
  );
}

export function Data() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useFetch(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`);

  console.log({ loading, error, data });

  const pages = 20;

  if (loading) {
    return <>Loading...</>;
  }
 
  return (
    <div className="App">
      <Helmet>
        <title>User's Data</title>
        <meta
      name="user's data"
      content="A list of user's data"
    />
        <link rel="canonical" href="/data" />
      </Helmet>
      <h1 className="title" style={{ color: "#3498db", marginTop: "15px", marginBottom: "20px" }}>User's Data</h1>
<div className='info' style={{ background: "#97CAED", color: "white" }}>
  
  <p>First name</p> 
  <p>Last name</p> 
  <p>Age</p> 
  <p>Gender</p> 
  <p>Username</p> 
  <p>Password</p>
</div>
      {data?.results

        .map((each, index) => {
          const name = `${each.name.first} ${each.name.last}`;
          return (
            
            <div className='info' key={name.toLowerCase().replaceAll(' ', '')}>

               <p>{each.name.first}</p>
               <p>{each.name.last}</p>
              <p>{each.dob.age}</p>
              <p>{each.gender}</p>
              <p>{each.login.username}</p>
              <p>{each.login.password}</p>
            </div>
          );
        })}

      <p className="pagination" style={{ marginTop: "30px" }}>
        Pages: {page} of {pages}
      </p>
      {
        <button role="button"
          className="next_btn"
          aria-pressed="false"
          tabindex="0"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          style={{ background: "#3498db", color: "black" }}
        >
          prev
        </button>
      }

      {Array.from({ length: pages }, (value, index) => index + 1).map(
        (each) => (
          <button role="button"
            aria-pressed="false"
            tabindex="0" className="user_btn" onClick={() => setPage(each)}>{each}</button>
        )
      )}
      {
        <button className="next_btn"
          disabled={page >= pages}
          aria-disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}
          style={{ backgroundColor: "#3498db", color: "black" }}
        >
          next
        </button>
      }

      <div style={{ margin: "15px" }}><Navigation /></div>
      <Outlet />
    </div>
  );
}

function Myout() {
  const navigate = useNavigate();
  return (
    <div>
      <p>i am an outlet</p>
      <button onClick={() => navigate("/about")}>navigate to home</button>
    </div>
  );
}

function Another() {
  return (
    <div>
      <p>i am another</p>
    </div>
  );
}

const Errorpage = () => {
  return (
    <div>
      <Helmet>
        <title>404 Error</title>
        <meta
      name="404 Error"
      content="an error occurred"
    />
        <link rel="canonical" href="/error" />
      </Helmet>
      <p style={{ color: "grey", fontSize: "100px", textAlign: "center" }}> Oops!
      </p>
      <p style={{ color: "black", fontSize: "23px", textAlign: "center", marginBottom: "20px" }}> We can't seem to find the <br /> page you're looking for.
      </p>
      <p style={{ color: "black", fontSize: "16px" }}>
        Error code: 404
      </p>
      <p className='errors'>Here are some helpful links instead:</p>

      <NavLink style={({ isActive }) => isActive ? { color: "white" } : { color: "black" }} className="navy" to="/"> Admin </NavLink>

      <NavLink style={({ isActive }) => isActive ? { color: "white" } : { color: "black" }} className="navy" to="/data"> Data </NavLink>

      <NavLink style={({ isActive }) => isActive ? { color: "white" } : { color: "black" }} className="navy" to="/testerror"> Test Error </NavLink>

      <NavLink style={({ isActive }) => isActive ? { color: "white" } : { color: "black" }} className="navy" to="/error"> 404 Page </NavLink>
    </div>
  );
};


function Path() {
  return (
    <div className='nav'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testerror" element={<Testerror />} />
        <Route path="/data" element={<Data />}>
          <Route path="out" element={<Myout />} />
          <Route path=":another" element={<Another />} />
        </Route>
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}
export default Path;




