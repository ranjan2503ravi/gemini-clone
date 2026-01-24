import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
import MyContext from './Context/MyContext';

const App = () => {
  return (
    <div className='flex'>
      <MyContext>
        <Sidebar />
        <Main />
      </MyContext>
    </div>
  );
};

export default App;


