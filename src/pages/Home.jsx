import React from 'react';
import AdminDocs from '../components/AdminDocs';
import GeneralTools from '../components/GeneralTools';
import PedagogicalLinks from '../components/PedagogicalLinks';
import banner from '../assets/banner.jpg';

function App() {
    return (
        <>
            <div className="flex justify-center bg-white">
                <div className="relative h-[300px] w-full md:h-[500px] md:w-[80%] overflow-hidden">
                    <img
                        src={banner}
                        alt="Bannière"
                        className='absolute top-0 left-0 w-full h-full object-cover'
                    />
                </div>
            </div>
            
            <AdminDocs />
            <GeneralTools />
            <PedagogicalLinks />
        </>
    );
}

export default App;
