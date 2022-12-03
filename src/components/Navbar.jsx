import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = ({searchValue, setSearchValue}) => {
    const[darkNav, setDarkNav] = useState(false);
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY> 50){
                setDarkNav(true);
            }else setDarkNav(false);
        });
        return () => {
            window.removeEventListener('scroll',()=>{console.log('done')});
        }
    },[])
    return (
        <nav className={`navbar navbar-expand-md navbar-dark ${!darkNav && "bg-transparent"} ${darkNav && "dark_navbar shadow"}`}>
            <div className="container ">
                <a href='/' className="navbar-brand fs-3 fw-bolder">WATCH<span className='text-danger'>LIST</span></a>
                <label
                    type='button'
                    className='navbar-toggler'
                    data-bs-toggle='collapse'
                    data-bs-target='#mobileMenu'
                    aria-controls='mobileMenu'
                    aria-expanded='false'
                    aria-label='navigation bar'
                >
                    <FontAwesomeIcon className='text-white' icon='search'/>
                </label>
                <div className="collapse navbar-collapse" id="mobileMenu">
                    <ul className="navbar-nav ms-auto text-center">
                        <input 
                            type="text"
                            className='form-control'
                            placeholder='search...'
                            value={searchValue}
                            onChange={(event)=>setSearchValue(event.target.value)}
                            />
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;