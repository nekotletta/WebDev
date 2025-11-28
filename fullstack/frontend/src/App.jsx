import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import BlogPost from './pages/Blogpost.jsx';
import Contact from './pages/Contact.jsx';
import Experience from './pages/Experience.jsx';
import './App.css';
import TodoList from './pages/Task';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Blog from './components/Blog.jsx';
import Piracy from './components/Links.jsx';
import LoginPage from './components/Login.jsx';
function App() {
  return (
    <div>
      <title>Reactive profile</title>
    <Navbar/>
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/experience' element={<Experience />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/blogpost/:id' element={<BlogPost/>}/>
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/todolist' element={<TodoList />} />
      <Route path='/piracy/:id' element={<Piracy />} />
    </Routes>
    <Footer/>
    </div>
  );
};

export default App;