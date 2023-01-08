import { NavLink } from 'react-router-dom';

export const HomePanel = () => {
    return (
        <div>
            <h2>Pin Collection</h2>
            <p>Click on a pin to see its details.</p>
            <hr/>
            <nav>
                <NavLink to='/create'>Create Pin</NavLink>
            </nav>
        </div>
    )
};