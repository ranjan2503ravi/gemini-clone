import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
import { ProviderContext } from './Context/Context';

const App = () => {
  return (
    <ProviderContext>
      <div className='flex'>
        <Sidebar />
        <Main />
      </div>
      </ProviderContext>
  );
};

export default App;


