import React, { useReducer, useState } from 'react';
import { AppleForm } from '../components/AppleForm'

const AppleFormPage = () => {

const [river, setRiver] = useState('nile');
const [show, toggle] = useReducer(state => !state, true);

    return(
        <section>
            <div><button onClick={toggle}>Toggle Details</button></div>
            <button onClick={() => setRiver('nile')}>Nile</button>
            <button onClick={() => setRiver('amazon')}>Amazon</button>
            <button onClick={() => setRiver('yangtze')}>Yangtze</button>
            <button onClick={() => setRiver('mississippi')}>Mississippi</button>
            {show && <AppleForm name={river} />}
        </section>
    )
}

export default AppleFormPage;

