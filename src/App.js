import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import TableApp from './components/TableApp';

function App() {




  return (
    <div className='App'>
       <Header />
       <div className='sidebar-table'>
         <Sidebar />
         <TableApp />
       </div>
       <Footer />
    </div>
  
  );
}

export default App;
