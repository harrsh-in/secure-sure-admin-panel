import Loader from '.';
import './style.scss';

const FallbackLoader = () => {
    return (
        <div className="fallback-loader">
            <Loader />
        </div>
    );
};

export default FallbackLoader;
