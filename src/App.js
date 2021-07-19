import React from 'react';
import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Sidebar from './components/layouts/Sidebar';
import TableApp from './components/layouts/TableApp';

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
