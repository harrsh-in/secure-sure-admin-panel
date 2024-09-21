import { CircularProgress } from '@mui/material';
import './style.scss';

const Loader = () => {
    return (
        <div className="loader">
            <CircularProgress />
        </div>
    );
};

export default Loader;
