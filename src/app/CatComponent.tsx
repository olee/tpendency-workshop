import React from 'react';
import * as Tokens from 'src/tokens';
import { useService } from './AppContext';
import { PromiseType } from './App';

const CatComponent = () => {
    const apiService = useService(Tokens.ApiServiceToken);

    const [image, setImage] = React.useState<HTMLImageElement>();
    const [data, setData] = React.useState<PromiseType<ReturnType<typeof apiService['getRandomCat']>>>();

    const fetchCat = React.useCallback(() => {
        setData(undefined);
        apiService.getRandomCat()
            .then(d => {
                const image = new Image();
                image.onload = () => {
                    setData(d);
                    setImage(image);
                };
                image.src = d.url;
            });
    }, [apiService]);

    React.useEffect(fetchCat, [fetchCat]);

    return (
        <div style={{
            position: 'relative',
            minHeight: 400,
        }}>
            {image && (
                <img
                    src={image.src}
                    alt='cat!'
                    onClick={fetchCat}
                    style={{
                        maxHeight: '50vh',
                    }} />
            )}
            <p>{!data ? 'loading cat...' : data.url}</p>
            <button disabled={!data} onClick={fetchCat}>Next cat!</button>
        </div>
    );
};
export default CatComponent;
