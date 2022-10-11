import './App.css';
import Header from './components/Header';
import CommentListPage from './pages/CommentListPage';
import Image from './pages/Image';
import {
  BrowserRouter as Router,
  Route
}from "react-router-dom"
import CommentPage from './pages/CommentPage';
import PhotoList from './components/PhotoList';

function App() {
  return (
    <Router>
    <div className="dark">
      <div>
        <Header/>
        <Route path='/' exact component={CommentListPage}/>
        <Route path='/comment/:id' component={CommentPage}/>
        {/* <Route path='/photos' component={Photos}/> */}
        <Route path='/image' component={Image}/>
        <Route path='/photos/:id' component={PhotoList}/>
     </div>
   </div>
   </Router>
  );
}

export default App;
